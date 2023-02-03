import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = ({ API }) => {
  const [User, SetUser] = useState("Enter a UserName");
  const [Done, SetDone] = useState(false);
  const [Password, SetPassword] = useState("Enter A password");
  const handle_user = (e) => {
    SetUser(e.target.value);
  };
  const navigate = useNavigate();
  const handle_password = (e) => {
    SetPassword(e.target.value);
  };
  const check_res = (result)=>
  {
      if(typeof result === Object)
      {
        SetDone(true);
      }
      else if(result !== undefined)
      {
        result.status === "error" ? SetDone(false) : SetDone(true);
      }else{
        result !== undefined ?  SetDone(true) : SetDone(false);
      }
    console.log(result + " " + Done + " " + typeof result);
    if (Done === true) {
      navigate("/Login");
    }
    else if (Done === false) {
      Swal.fire({
        title: "Warning!",
        text: result.error,
        icon: "warning",
        confirmButtonText: "Try again",
      });
    }
  }
  const handle_click = async (username, password) => {
    if (username !== "Enter a UserName" &&  password !== 'Enter A password') {
      const result = await fetch(API + "/User/add", {
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
        setTimeout(check_res(result) , 1000);
    }
  };
  return (
    <div>
      <div className="SignIn">Register</div>
      <div className="SignBox">
        <input
          className="UserBox"
          placeholder={User}
          type={"text"}
          onChange={handle_user}
          required
        ></input>
        <input
          className="PasswordBox"
          placeholder={Password}
          type={"text"}
          onChange={handle_password}
          required
        ></input>
        <button
          type="submit"
          className="SubmitBox"
          onClick={() => {
            handle_click(User, Password);
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
