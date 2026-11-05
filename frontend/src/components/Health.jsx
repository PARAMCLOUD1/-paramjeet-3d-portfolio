import { useEffect, useState } from 'react'
export default function Health(){
 const [status,setStatus]=useState('Checking backend…')
 useEffect(()=>{const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),5000);fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/health`,{signal:controller.signal}).then(async r=>{if(!r.ok)throw Error();const data=await r.json();if(data.status!=='ok')throw Error();setStatus('Flask backend connected')}).catch(()=>setStatus('Backend unavailable — start Flask on port 5000')).finally(()=>clearTimeout(timeout));return()=>{controller.abort();clearTimeout(timeout)}},[])
 return <p className="health" role="status">{status}</p>
}
