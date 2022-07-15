import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { incrementView } from '../actions/forumAction';

function Card(props) {
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLoggedInReducer);
    const {user}= userLogin;
    const dispatch =useDispatch()



    const handleAnswer =()=>{
        if(user){
            dispatch(incrementView(elem._id))
            navigate(`/addAnswer/${elem._id}`)
        }else{
            navigate('/login')
        }
    }
    const {elem, index} =props;
  return (
    <div className="card bg-light mb-5">
        <div className="card-body">
            <h5 className="card-title text-start mb-5">{elem.question}</h5>
            <div className='d-flex flex-column flex-sm-row justify-content-between' style={{fontSize: '0.8rem', color:'blue '}}>
                <div className='d-flex flex-column flex-sm-row  text-start' >
                    <div>
                        Created by {elem.email}
                    </div> 
                    <div className='ms-sm-4'>
                        views: {elem.views}
                    </div>
                </div>
                <div className="text-start text-md-end text-muted">
                    {new Date(elem.date).toGMTString()}
                </div>
            </div>
        </div>
        <div className="card-footer text-muted">
            <button className="btn btn-primary" type="button" onClick={handleAnswer}>▼ Add Answer</button>
        </div>    
    </div>
  )
}

export default Card
