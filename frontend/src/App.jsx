import {useState} from 'react';import Auth from './components/Auth';import Dashboard from './components/Dashboard';import {getUser} from './lib/api';import './styles.css';
export default function App(){const [user,setUser]=useState(getUser());return user?<Dashboard user={user} onLogout={()=>setUser(null)}/>:<Auth onAuth={setUser}/>}
