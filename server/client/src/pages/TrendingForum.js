import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions, searchD } from '../actions/forumAction';
import Card from '../componenets/Card';

function TrendingForum() {
  const userLogin = useSelector((state) => state.userLoggedInReducer);
  const forum = useSelector((state) => state.forumReducer);
  const {user}= userLogin;
  const dispatch = useDispatch();
  const [search , setSearch] = useState('')

  if(forum.type !== 'allQuestion'){
    dispatch(getAllQuestions())
  }
  
  const handleInput=(e)=>{
    setSearch(e.target.value)
}
  const handleSubmitSearch=(e)=>{
    e.preventDefault()
    dispatch(searchD(search))
  }

  useEffect(() => {
  }, [forum]);
  
  return (
    <div>
      <div className='text-center m-5'> 
        <h1 className='mb-5'>All Forums</h1>
        <form className="d-flex mb-5 mx-auto" action='POST' style={{width: '20rem'}} onSubmit={handleSubmitSearch}>
          <input className="form-control me-2" type="search" name="searchData" value={search} placeholder="Search" aria-label="Search" onChange={handleInput}/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        
        {forum && forum.type=== 'allQuestion' && forum.data.data && forum.data.data.map((elem, index)=>{
              console.log('hii')
              return (<Card elem={elem} index={index} key={index}/>)
            })}
            {!forum && !forum.data &&  !forum.data.data &&
            <p>Nothing is here.</p>}
      </div>
    </div>
  )
}

export default TrendingForum
