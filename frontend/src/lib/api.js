const API=import.meta.env.VITE_API_URL||'http://localhost:4000/api';
export async function api(path,options={}){const token=localStorage.getItem('moneymap_token');const res=await fetch(`${API}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{}) ,...(options.headers||{})}});if(!res.ok){let body={};try{body=await res.json()}catch{}throw new Error(body.error||'Request failed')}return res.status===204?null:res.json()}
export function setSession(data){localStorage.setItem('moneymap_token',data.token);localStorage.setItem('moneymap_user',JSON.stringify(data.user))}
export function getUser(){try{return JSON.parse(localStorage.getItem('moneymap_user'))}catch{return null}}
export function clearSession(){localStorage.removeItem('moneymap_token');localStorage.removeItem('moneymap_user')}
