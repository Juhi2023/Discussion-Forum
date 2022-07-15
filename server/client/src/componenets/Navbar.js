import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/userAction"
import {Link, useNavigate} from 'react-router-dom'

function Navbar() {
  const userLogin = useSelector((state) => state.userLoggedInReducer);
  const {user}= userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAsk =()=>{
    if(user){
      navigate('/ask-a-question')
    }else{
      navigate('/login')
    }
  }

  const handleTrendingQues =()=>{
    navigate('/trending-questions')
  }

  useEffect(() => {  }, [user]);

  const handleLogout =(e)=>{
    dispatch(logout())
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid px-md-5">
      <a className="ms-3 navbar-brand" href="#">Disscussion Forum</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> 
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
      <>
      
        <div className="nav-item dropdown">
        <button type="submit" className="me-3 btn btn-success" onClick={handleAsk}>Ask a question</button>
        </div>
        <div className="nav-item dropdown">
          <button type="submit" className="me-3 btn btn-primary" onClick={handleTrendingQues}>Trending Questions</button>
        </div>
        {user &&
        <div className="nav-item dropdown pe-md-5 me-md-5">
          <a style={{color: 'white'}} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {console.log(user.name)}
          {user.name}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a style={{color: 'black'}} className="dropdown-item"  href='/dashboard'>Dashboard</a></li>
          <li><p style={{cursor: 'pointer'}} className="dropdown-item"  onClick={handleLogout}>Logout</p></li>
          </ul>
        </div>}
      </>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
