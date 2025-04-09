const http = require('http');
const fs = require('fs').promises;
const PORT = 3001;

const server = http.createServer((req, res) => {
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, or set to specific domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

    // // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(200); // Respond with HTTP 200 for preflight requests
        return res.end();
    }

    // Your main route logic for POST requests
    if (req.url == "/registration" && req.method == "POST") {
        console.log("Inside /registration");
        
        let body = '';

        // Listen for data events// data is an eventThe req.on('data', ...) listens for each chunk of incoming data.
        req.on('data', chunk => {
            body += chunk;
        });
           
        // Once all data is received, process it
        req.on('end', async() => {
            console.log("Data received:", body);

            try {
               
               let users=[];
                // Parse the body as JSON
              const { name,email, password } = JSON.parse(body);
                console.log("Received email:", email, "password:", password+ ""+name);
                    try{
                const rd=await fs.readFile("clientData.json",{encoding:'utf-8'});  
                users=JSON.parse(rd);
                    }catch(err){ console.log("No data while reading")}
                
                     const userExists=users.find(user=>user.email===email);
                     if(userExists){
                        res.writeHead(400,{'Content-Type':'application/json'});
                        return res.end(JSON.stringify({msg:'user already exists'}));
                     }
                     users.push({name,email,password});
                    await fs.writeFile("clientData.json",JSON.stringify(users,null,2)) // null:no filter, complete data, 2-> 2 spaces from left indentation in records
                

                
                // Respond back with a success message
                res.writeHead(200, { 'Content-Type': 'application/json' });
              
                res.end(JSON.stringify({ msg: "Registration successfully!!" }));

            } catch (error) {
                console.error("Error parsing JSON:", error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
               
                res.end(JSON.stringify({ msg: "Error in registration" }));
            }
        });

       
    } 
    else if(req.url=='/login' && req.method=="POST"){
        let body=''  
        let arr=[]; 
        req.on('data',chunk=>{
               body+=chunk;
           })

           req.on('end',async()=>{
            console.log(body);
            const {email,password}=JSON.parse(body);
            console.log("Hiii"+email+"pass"+password);
          const data=  await fs.readFile('clientData.json',{encoding:'utf-8'});
                arr=JSON.parse(data);
                console.log(arr);
                const user=arr.find((ele)=>ele.email==email && ele.password==password);
                console.log(user)
                if(user){
                    res.end(JSON.stringify({message:'success'}))
                }else{
                    res.end(JSON.stringify({message:'email or password isincorrect'}));
                }

           
        
                //console.log(arr);
        })

    }
    
    else {
        // Handle non-POST requests
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: "Not Found" }));
    }
});

server.listen(PORT, () => {
    console.log("Server is running on:" + PORT);
});
