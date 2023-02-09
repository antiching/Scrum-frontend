import React, { useState, useEffect, useContext, createContext } from 'react';
import { API_URL } from '../utils/config';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// sweat alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  console.log(user);

  //判斷是否有登入

  useEffect(() => {
    let getUser = async () => {
      try {
        let response = await axios.get(`${API_URL}/users`, {
          withCredentials: true,
        });
        setUser(response.data);
        // console.log('response.data', response.data);
      } catch (err) {
        console.log('err', err);
      }
    };
    getUser();
  }, []);



  return (
    <AuthContext.Provider
      // 記得提供 context 給 Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        // onLogout: logoutHandler,
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// 建立一個 HOOK 協助使用 context
export const useAuth = () => useContext(AuthContext);
