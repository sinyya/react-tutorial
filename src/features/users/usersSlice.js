import { createSlice } from '@reduxjs/toolkit';
import api from "../../api";

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
  },
  reducers: {
    loadUsers: (state, action) => {
      state.list = action.payload;
    }
  },
});

/**
 * select
 */
export const selectList = state => state.users.list;

/**
 * actions
 */
const { loadUsers } = usersSlice.actions;

/**
 * APIs
 */
export const getUsers = () => async dispatch => {
  const res = await api.request('http://dummy.restapiexample.com/api/v1/employees', {
    method: 'get',
    params: {}
  });
  console.log(res);
  if(res.status === 'success'){
    dispatch(loadUsers(res.data));
  }else {
    // todo 별도 에러 처리 하는 경우 여기에 작성
  }
};

export default usersSlice.reducer;
