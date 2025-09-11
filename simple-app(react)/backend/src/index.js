import http from 'http'
import app from './app.js';
import "dotenv/config"; 

let PORT=process.env.PORT || 3000;
let server=http.createServer(app);


server.listen(PORT,()=>{
    console.log(`Server is on ${PORT}...`);
})

