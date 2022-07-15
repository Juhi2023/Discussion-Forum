import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../actions/forumAction'
import { loggedIn } from '../actions/userAction';

function CreateQuestion() {
  const userLogin = useSelector((state) => state.userLoggedInReducer);
  const {user}= userLogin;
  const [question, setQuestion] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit=()=>{
    dispatch(createQuestion(question))
  }

  const handleInput =(e)=>{
    setQuestion(e.target.value)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(loggedIn())
    }

    if(!user){
      navigate('/login')
    }
  },[])

  return (
    <div>
      <h1 className='m-5 text-center'>Ask a question</h1>
      <div class="m-5">
        <label for="exampleFormControlInput1" class="form-label"> <h4>Enter your question:</h4></label>
        <input type="text" name='question' value={question} class="form-control" id="exampleFormControlInput1" onChange={handleInput}/>
      </div>
      <button type="submit" className="mx-5 btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>

  )
}

export default CreateQuestion
