import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db.js';
import { auth } from '../middleware/auth.js';

const router=Router(); router.use(auth);
const expenseSchema=z.object({amount:z.coerce.number().positive().max(100000000),category:z.string().min(1).max(40),merchant:z.string().trim().min(1).max(100),note:z.string().max(300).optional(),spentAt:z.coerce.date().optional()});

router.get('/',async(req,res)=>{const rows=await db.expense.findMany({where:{userId:req.user.id},orderBy:{spentAt:'desc'},take:100});res.json(rows);});
router.post('/',async(req,res)=>{const p=expenseSchema.safeParse(req.body);if(!p.success)return res.status(400).json({error:'Invalid expense data.'});const e=await db.expense.create({data:{...p.data,amount:p.data.amount,userId:req.user.id}});res.status(201).json(e);});
router.delete('/:id',async(req,res)=>{const e=await db.expense.findFirst({where:{id:req.params.id,userId:req.user.id}});if(!e)return res.status(404).json({error:'Expense not found.'});await db.expense.delete({where:{id:e.id}});res.status(204).end();});
export default router;
