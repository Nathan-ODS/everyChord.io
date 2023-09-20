import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MyButton from '../MyButton/MyButton';
import './UserAuth.css';

const UserAuth = () => {
  const { user, login, logout } = useAuth();

  return (
    !user
      ? <MyButton
        className='login-signup-button'
        onClick={login}
        label='Login / Signup'
      />
      : <MyButton className='user-profile-button'
        label={user?.userName}
      />
  )
};

export default UserAuth;