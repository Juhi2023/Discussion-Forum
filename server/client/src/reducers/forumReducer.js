
export const forumReducer = (state = {}, action) => {
    switch (action.type) {
      case 'CREATE_QUESTION':
        return { type:'createQuestion' , data:action.payload };
      case 'GET_USER_QUESTION':
        return {type:'userQuestion' , data:action.payload};
      case 'GET_ALL_QUESTIONS':
        return {type:'allQuestion' , data:action.payload};
      default:
        return state;
    }
  };
  

export const questionReducer = (state={}, action)=>{
  switch (action.type) {
    case 'GET_QUESTION':
      return { data:action.payload };
    default:
      return state;
  }
}