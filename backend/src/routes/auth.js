import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../db.js';

const router=Router();
const credentials=z.object({name:z.string().trim().min(2).max(80).optional(),email:z.string().email().transform(v=>v.toLowerCase()),password:z.string().min(8).max(100)});
const sign=(user)=>jwt.sign({id:user.id,email:user.email,name:user.name},process.env.JWT_SECRET,{expiresIn:'7d'});

router.post('/register',async(req,res)=>{
  const parsed=credentials.safeParse(req.body);
  if(!parsed.success) return res.status(400).json({error:'Enter a valid name, email and password (8+ characters).'});
  const {name,email,password}=parsed.data;
  if(!name) return res.status(400).json({error:'Name is required.'});
  const existing=await db.user.findUnique({where:{email}});
  if(existing) return res.status(409).json({error:'An account with this email already exists.'});
  const passwordHash=await bcrypt.hash(password,12);
  const user=await db.user.create({data:{name,email,passwordHash}});
  res.status(201).json({token:sign(user),user:{id:user.id,name:user.name,email:user.email}});
});

router.post('/login',async(req,res)=>{
  const parsed=credentials.omit({name:true}).safeParse(req.body);
  if(!parsed.success) return res.status(400).json({error:'Enter a valid email and password.'});
  const {email,password}=parsed.data;
  const user=await db.user.findUnique({where:{email}});
  if(!user || !(await bcrypt.compare(password,user.passwordHash))) return res.status(401).json({error:'Incorrect email or password.'});
  res.json({token:sign(user),user:{id:user.id,name:user.name,email:user.email}});
});
export default router;
