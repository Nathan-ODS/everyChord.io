import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginRegisterModalContent from './LoginRegisterModalContent/LoginRegisterModalContent';
import {  FaSignOutAlt } from 'react-icons/fa'
import MyButton from '../MyButton/MyButton';
import Modal from 'react-modal';
import './UserAuth.css';

Modal.setAppElement('#root')

const UserAuth = () => {
  const { user, logout } = useAuth();
  const [isModalOpened, setIsModalOpened] = useState(false);

  function closeModal() {
    setIsModalOpened(false)
  }

  function openModal() {
    setIsModalOpened(true)
  }

  return (
    <>
      {
        !user
          ? <MyButton
            className='login-signup-button'
            onClick={openModal}
            label='Login or Register'
          />
          : (
            <div className='user-profile'>
              <span>Log out</span>
              <div className='logout-container' onClick={logout}>
                <FaSignOutAlt />
              </div>
            </div>
          )
      }
      <Modal
        className={'login-register-modal'}
        isOpen={isModalOpened}
        onRequestClose={closeModal}
        contentLabel='Login and register Modal'
      >
        <LoginRegisterModalContent closeModal={closeModal} />
      </Modal>
    </>
  )
};

export default UserAuth;