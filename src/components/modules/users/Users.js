import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectList,
    getUsers
} from '../../../features/users/usersSlice';
import styles from './Users.module.css';

function User({ user }) {
  return (
      <div>
        <b>{user.id} : {user.employee_name}</b> <span>{user.employee_salary}</span>  <span>{user.employee_age}</span>  <span>{user.profile_image}</span>
      </div>
  )
}

function Users() {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getUsers());
  }, [dispatch]); // todo 왜 dependency dispatch 를 넣어야 하는지 ???... lint에서 넣으라고함..

  console.log('list', list);
  return (
    <div className={styles.wrapper}>
      {list.map(user => (
          <User user={user} key={user.id}/>
      ))}
    </div>
  );
}

export default Users;
