import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { login, loggedIn } from "../actions/userAction"

function Login() {
  const [details, setDetails] = useState({email:'', password:''})
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLoggedInReducer);
  const {user}= userLogin;

  const dispatch = useDispatch()

  const inputEvent=(e)=>{
    setDetails({...details, [e.target.name]:e.target.value})
  }

  const handleClick= async(e)=>{
    e.preventDefault()
    dispatch(login(details.email, details.password));
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(loggedIn())
    }

    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <section className='px-md-5 w-75 mx-auto'>
        <form className='px-md-5 mt-5'>
          <h2 className='mt-5'>Login</h2>
          <br />
          <div className="mb-3">
              <input type="email" className="form-control" name="email"  id="email" aria-describedby="emailHelp" placeholder='Email' onChange={inputEvent}/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
              <input type="password" className="form-control" name="password"  id="password" placeholder='Password' onChange={inputEvent}/>
          </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick} >Login</button>
        <br /><br /><br /><br />
        New User? &nbsp; &nbsp; &nbsp;
        <Link to="/signup" style={{ textDecoration: 'none' }}>Register Here</Link>
      </form>
    </section>
  )
}

export default Login
