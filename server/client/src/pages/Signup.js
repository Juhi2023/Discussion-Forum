import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signUp, loggedIn } from '../actions/userAction';



function Signup() {

    const [details, setDetails] = useState({name:'', email:'', password:'', cpassword:''})
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLoggedInReducer);
    const {user}= userLogin;
    const dispatch = useDispatch()

    const inputEvent=(e)=>{
        setDetails({...details, [e.target.name]:e.target.value})
      }

    const handleClick= async(e)=>{
        e.preventDefault();
        const {name, email, password, cpassword} = details;
        dispatch(signUp(name, email, password, cpassword))
        setTimeout(()=>{
          if (!user) {
            window.alert(userLogin.status + ': '+ userLogin.message)
          }
        }, 4000)
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
    <div>
      <div className='container px-md-5 w-75'>
    
    <br />
    <form className='px-md-5'>
      <h2> Sign Up to continue</h2>
      <br />
      <div className="mb-3">
          <input type="text" className="form-control" name="name" value={details.name} id="name" aria-describedby="emailHelp" placeholder='Name' onChange={inputEvent} required/>
      </div>

      <div className="mb-3">
          <input type="email" className="form-control" name="email" value={details.email} id="email" aria-describedby="emailHelp" placeholder='Email' onChange={inputEvent} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>

      <div className="mb-3">
          <input type="password" className="form-control" name="password" value={details.password} id="password" placeholder='Password' onChange={inputEvent} required/>
      </div>

      <div className="mb-3">
          <input type="password" className="form-control" name="cpassword" value={details.cpassword} id="cpassword" placeholder='Confirm Password' onChange={inputEvent} required/>
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleClick}>SignUp</button>

      <br /><br /><br /><br />
      Already Registered? &nbsp; &nbsp;
    <Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link>
    </form>
    
    </div>
  </div>
  )
}

export default Signup
