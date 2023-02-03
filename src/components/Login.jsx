import React from 'react';
import Swal from "sweetalert2";
import  { useState } from 'react';
const Login = ({API}) => {
      const [User , SetUser] = useState("");
      const [Sucess , SetSucess] = useState(false);
      const [Password , SetPassword] = useState("");
      const handle_user = (e)=>{
        SetUser(e.target.value);
      }
      const handle_password = (e)=>{
        SetPassword(e.target.value);
      }
      const handle_Login = async(username , password) =>{
        if(username === null || password === null)
        {
          Swal.fire({
            title: "Warning!",
            text: 'Invalid Username or password',
            icon: "error",
            confirmButtonText: "Try again",
          });
          return;
        }
        const result = await fetch(API + "/User/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err));
          console.log(result);
          if(result === false || result === undefined)
          {
            Swal.fire({
              title: "Warning!",
              text: 'Invalid Username or password',
              icon: "error",
              confirmButtonText: "Try again",
            });
          }
          if(result === true)
          {
            SetSucess(true);
          }else{
            SetSucess(false);
          }
      }
  return (
    <div>
      <div className='SignIn'>Login</div>
      <div className='SignBox'>
        <input className='UserBox' type={"text"} placeholder={'User'} onChange={handle_user} required></input>
        <input className='PasswordBox' type={"text"} placeholder={'Password'} onChange={handle_password} required></input>
        <button type='submit' className='SubmitBox' onClick={()=>{
         if(User !== "" && Password !== "")
         {
          handle_Login(User , Password);
         }else{
          Swal.fire({
            title: "Warning!",
            text: 'Invalid Username or password',
            icon: "error",
            confirmButtonText: "Try again",
          });
         }
        }}>LOGIN</button>
      </div>
      {
        Sucess === true ? (
          Swal.fire({
            title: "sucess!",
            text: 'Login sucessfull',
            icon: "success",
            confirmButtonText: "OK",
          })
        ):
        (
          null
        )
      }
    </div>
  )
}

export default Login