import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getQuestion } from '../actions/forumAction';
import QACard from '../componenets/QACard';

function Question() {
    let { id } = useParams();
    const dispatch =useDispatch()
    const questionData = useSelector((state) => state.questionReducer)
    const {data} =questionData;
    
    if(!data){
        dispatch(getQuestion(id))
    }

    useEffect(()=>{

    },[data])

  return (
    <div>{console.log(data)}
       {data && <QACard elem={data.data } id={id}/>}
    </div>
  )
}

export default Question
