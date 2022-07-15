export const login = (email, password) => async (dispatch) => {
  try {
    const res = await fetch('/login',{
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body:  JSON.stringify({email, password})
    })
      const data = await res.json()

    dispatch({ type: 'GET_USER', payload: data });

    localStorage.setItem("token", data.user.token);

  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    const res = await fetch('/logout',{
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
  })
  dispatch({ type: 'USER_LOGOUT' });
  localStorage.removeItem("token");
};

export const signUp = (name, email, password, cpassword) => async (dispatch) => {
  try {
    const res = await fetch('/signup',{
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json"
        },
        body:  JSON.stringify({name, email, password, cpassword})
    })
    const data = await res.json()
    dispatch({ type: 'GET_USER' , payload: data });
    localStorage.setItem("token", data.user.token);

  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


export const loggedIn = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)
    const res = await fetch('/loggedIn',{
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
    })
    const data = await res.json()
    if(data.status==='SUCCESS'){
      dispatch({ type: 'GET_USER', payload: data });
    }else{
      dispatch({ type: 'ERROR', payload: data.message });
    }

  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};