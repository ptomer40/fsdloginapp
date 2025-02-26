const http=require('http');
const fs=require('fs').promises;
const server=http.createServer((req,res)=>{
res.setHeader('Access-Control-Allow-Origin','*');
if(req.method=="OPTIONS"){
    res.writeHead(200);
    return res.end();
}

if(req.method=="GET" && req.url=="/registration"){
    let body;
    req.on('data',chunk=>{
        body+=chunk;
    })

    req.on('end',async ()=>{
        try{
            let arr=[];
        const {name,email,password}=JSON.parse(body);
        
            const rd=await fs.readFile('data.json',{encoding:'utf-8'});
                  arr=JSON.parse(rd);
                  const result=arr.find((ele)=>ele.email==email);
             if(result){
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify({"msg":"User already register"}));
             } 
             arr.push({name,email,password});
             fs.writeFile('data.json',JSON.stringify({name,email,passowrd}));


                }catch(err){
            console.log("Error while reading data"+err);
        }

    })
}
})

server.listen(3001,()=>{
    console.log("Server is running on:"+3001);
})