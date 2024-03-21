import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
  } from './action';
  
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_USER_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_USER_SUCCESS:
        return { ...state, loading: false, users: [...state.users, action.payload] };
      case CREATE_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  