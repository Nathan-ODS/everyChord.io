import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginRegisterModalContent from './LoginRegisterModalContent/LoginRegisterModalContent';
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
              <MyButton className='user-profile-button' label={user?.userName}/>
              <MyButton className='logout-button' label='Log out' onClick={logout}/>
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