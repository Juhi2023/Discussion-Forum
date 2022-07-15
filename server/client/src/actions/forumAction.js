export const createQuestion = (question) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
      const res = await fetch('/createQuestion',{
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body:  JSON.stringify({question})
      })
        const data = await res.json()
        window.alert(`${data.status}: ${data.message}`)
      dispatch({ type: 'CREATE_QUESTION', payload: data });
  
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

  export const getUserQuestions = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch('/getUserQuestions',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const data = await res.json()
  
      dispatch({ type: 'GET_USER_QUESTION', payload: data });
  
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

  export const getAllQuestions = () => async (dispatch) => {
    try {
        const res = await fetch('/getAllQuestions',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
            },
        })
        const data = await res.json()
  
      dispatch({ type: 'GET_ALL_QUESTIONS', payload: data });
  
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

  export const addAnswer = (forumID, answer) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch('/addAnswer',{
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:  JSON.stringify({forumID, answer})
        })
        const data = await res.json()
        window.alert(`${data.status}: ${data.message}`)
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
  export const getQuestion = (forumID) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/getQuestion/${forumID}`,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const data = await res.json()
        if(data.status==='FALIURE'){
          window.alert(`${data.status}: ${data.message}`)
        }else{
          dispatch({ type: 'GET_QUESTION', payload: data });
        }
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
 
  export const searchD = (searchData)=> async (dispatch) => {
    try {
  
      const res = await fetch('/search',{
          method: "POST",
          headers: {
              Accept: "application/json",
              "content-Type": "application/json",
          },
          body:  JSON.stringify({searchData})
      })
      const data = await res.json()
      dispatch({ type: 'GET_ALL_QUESTIONS', payload: data });
  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
  }

  export const incrementView = (forumID) => async (dispatch) => {
    try {
        const res = await fetch('/incrementView',{
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
            },
            body:  JSON.stringify({forumID})
        })
        const data = await res.json()
    
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };