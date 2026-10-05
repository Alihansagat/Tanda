import http from 'node:http';
import {readFile} from 'node:fs/promises';
const files={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.mjs':'app.mjs','/model.mjs':'model.mjs'};
http.createServer(async(req,res)=>{const file=files[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);res.end('Not found');return;}try{const data=await readFile(new URL('./dist/'+file,import.meta.url));res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css':'text/javascript');res.end(data);}catch{res.writeHead(500);res.end('Unable to read file');}}).listen(5173,'127.0.0.1',()=>console.log('http://127.0.0.1:5173'));
