import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginRegisterModalContent from './LoginRegisterModalContent/LoginRegisterModalContent';
import MyButton from '../MyButton/MyButton';
import Modal from 'react-modal';
import './UserAuth.css';

Modal.setAppElement('#root')

const UserAuth = () => {
  const { user } = useAuth();
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      {!user
        ? <MyButton
          className='login-signup-button'
          onClick={() => setIsModalOpened(true)}
          label='Login or Register'
        />
        : <MyButton className='user-profile-button'
          label={user?.userName}
        />
      }
      <Modal
        className={'login-register-modal'}
        isOpen={isModalOpened}
        onRequestClose={() => setIsModalOpened(false)}
        contentLabel='Login and register Modal'
      >
        <LoginRegisterModalContent />
      </Modal>
    </>
  )
};

export default UserAuth;