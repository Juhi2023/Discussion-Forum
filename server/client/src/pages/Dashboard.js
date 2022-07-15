import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getUserQuestions } from '../actions/forumAction';
import Card from '../componenets/Card';

function Dashboard() {
  const userLogin = useSelector((state) => state.userLoggedInReducer);
  const forum = useSelector((state) => state.forumReducer);
  const {user}= userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate()


  if(user && forum.type !== 'userQuestion'){
    dispatch(getUserQuestions())
  }
  
  useEffect(() => {
    if(!user){
      navigate('/')

    }
  }, [navigate, user, forum]);
  
  return (
    <div>
      <div className='text-center m-5'> 
        <h1 className='mb-5'>Your Forums</h1>
        
        {forum && forum.type=== 'userQuestion' && forum.data.data.map((elem, index)=>{
              console.log('hii')
              return (<Card elem={elem} index={index} key={index}/>)
            })}
      </div>
    </div>
  )
}

export default Dashboard
