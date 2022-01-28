import axios from "axios";
import React, { useState } from "react";
import swal from 'sweetalert';

//import env from "react-dotenv";

function Register() {

  //1.state/ variable
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //2. function
  let submitData = ()=>{
        
    //console.log(username);
    //console.log(email);
    //console.log(password);
    //console.log('Good Morning');

    var data = {
        "username":username,
        "email":email,
        "password":password
    }
    
    //console.log(data);
    
    // Request API.
    // Add your own code here to customize or restrict how the public can register new users.
    axios
        .post('https://fathomless-savannah-46209.herokuapp.com/api/auth/local/register', data)
        .then(response => {
            // Handle success.
            if(response.status === 200){
                swal("Good job!", "User Registration Successfully", "success");
            }
            
            //console.log('Well done!');
            console.log(response);
            //console.log(response.data.user.email);

            window.localStorage.setItem('userInfo', JSON.stringify(response.data) )

            // JSON OBject ---> Stringify  --->  JSON String
            //console.log('User profile', response.data.user);
            //console.log('User token', response.data.jwt);
        })
        .catch(error => {
        // Handle error.
            console.log(error.response);
            if(error.response.status === 400){
                swal("Bad job!", error.response.statusText, "error");
            }
        });

        /* axios.post(`http://localhost:1337/auth/local/register`,data)
        .then(function (response) {
            //Success
            console.log(response);
        })
        .catch(function (error) {
            //Error
            console.log(error);
        });
        //http://localhost:1337/auth/local/register */

        
    }

 

  //3. return statement
  return (
    <div className="row">
      <div className="col-6 offset-3 mt-5">
        <h1 className="text-center">Register Form (Axios)</h1>
        <form>
          <input className="form-control" placeholder="Enter Username" type="text" name="username" value={ username } onChange={(e)=>{setUsername(e.target.value)}}/><br/>
          <input className="form-control" placeholder="Enter Email" type="email" name="email" value={ email } onChange={(e)=>{setEmail(e.target.value)}}/><br/>
          <input className="form-control" placeholder="Enter Your Password" type="password" name="password" value={ password } onChange={(e)=>{setPassword(e.target.value)}}/><br/>
          <div className="d-grid gap-2">
              <button type="button" name="button" className="btn btn-success" onClick={ ()=>{ submitData() } }>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

