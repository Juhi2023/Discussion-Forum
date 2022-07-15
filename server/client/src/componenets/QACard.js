import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addAnswer, getQuestion } from '../actions/forumAction';

function QACard(props) {
    const [input , setInput] = useState('')
    const dispatch =useDispatch()
    const handleSubmit =()=>{
        dispatch(addAnswer(id, input))
        dispatch(getQuestion(id))
    }

    const handleInput=(e)=>{
        setInput(e.target.value)
    }

    const {elem, id} =props;
  return (
    <>
        <div className="m-5">
            <div className="card bg-light mb-5">
                <div className="card-body">
                    <h5 className="card-title text-start mb-5">{elem.question}</h5>
                    <div className='d-flex flex-column flex-sm-row justify-content-between' style={{fontSize: '0.8rem'}}>
                        <div className='d-flex flex-column flex-sm-row  text-start'>
                            <div>
                                Created by {elem.email}
                            </div> 
                            <div className='ms-sm-4'>
                                views: {elem.views}
                            </div>
                        </div>
                        <div className="text-start text-sm-end text-muted">
                            {new Date(elem.date).toGMTString()}
                        </div>
                    </div>
                </div>

                {elem.comments.map((element, index)=>{
                    return <div className="card-footer text-muted" key={index}>
                    <p style={{fontSize: '0.9rem', color:'black'}}>{element.comment}</p>
                    <div className='d-flex flex-column flex-sm-row justify-content-between' style={{fontSize: '0.8rem', color:'blue !important'}}>
                        <div style={{float: 'left', display:'flex'}}>
                            <div>
                                By {element.email}
                            </div> 
                        </div>
                        <div className="text-start text-sm-end text-muted">
                            {new Date(element.date).toGMTString()}
                        </div>
                    </div>
                </div>  
                })}

                <div className='p-5 card-footer text-muted'>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="answer" value={input} onChange={handleInput}></textarea>
                    <button className="btn btn-primary mt-3" type="button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default QACard
