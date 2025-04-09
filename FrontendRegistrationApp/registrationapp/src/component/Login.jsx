import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const navigate=useNavigate();
    
 const sendData=async(e)=>{
      e.preventDefault();
     const email= e.target.email.value;
     const password=e.target.password.value;
     console.log("Email:"+email+ " "+password);

         const response=await fetch("http://localhost:3001/login",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
         })
        const data=await response.json();
        console.log(data);
       
        if(data.message=='success'){
        //navigate('/dashboard');
          alert("Login Success");
          navigate('/dashboard');
        }else{
          alert(data.message);
          return false;
        }
 }
      
 return (
        <Form onSubmit={sendData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='email' placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    
    
    
};

export default Login;
