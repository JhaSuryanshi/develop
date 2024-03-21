import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

// Action types
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

// Async action creator to create a user
export const createUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
      const formData = new FormData();
      formData.append('image', userData.image);
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('mobilenumber', userData.mobilenumber);
      formData.append('message', userData.message);

      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        body: formData,
        //body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create contactuspage");
      }

      const result = await response.json();
      dispatch({ type: CREATE_USER_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
    }
  };
};



const initialState = {
  users: [],
  loading: false,
  error: null,
};


const userDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

// Create store with thunk middleware
const store = createStore(userDetailReducer, applyMiddleware(thunk));

export default store;
