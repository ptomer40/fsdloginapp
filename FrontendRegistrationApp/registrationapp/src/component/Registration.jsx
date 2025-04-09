import React from 'react'
import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
function Registration() {
    const sendData=async(e)=>{
        e.preventDefault();
         const name=e.target.name.value;
        const email= e.target.email.value;
       const password=e.target.password.value;

       console.log("Email:"+email+ " "+password);
  
           const response=await fetch("https://fsdloginapp.onrender.com/registration",{
              method:"POST",
              body:JSON.stringify({name,email,password}),
              headers:{
                  'Content-Type':'application/json'
              }
           })
          const data=await response.json();
          console.log(data);
          alert(data.msg);
   }
        
   return (
           <div>
          <Form onSubmit={sendData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name='name' placeholder="Enter name" />
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' placeholder="Enter email" />
              
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Registration
            </Button>
          </Form>
          </div>
        );
      
      
}

export default Registration