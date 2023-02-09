import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../../utils/config';
import { useAuth } from '../../Context/authContext';
import axios from 'axios';

import '../styles/header.scss';

function Header(props) {
  const { user, setIsLoggedIn, onLogout, onLogin } = useAuth();

  const logoutHandler = async () => {
    console.log('登出清掉cookie');
    try {
      let response = await axios.get(`${API_URL}/logout`, {
        withCredentials: true,
      });
      // setUser(response.data);
      setIsLoggedIn(false);
    } catch (err) {
      console.log('err', err);
    }
  };
  if (user == null) {
    <Navigate to="/login" />;
  }
  if (user !== null) {
    return (
      <div>
        <div
          className="header_section container-fluid d-flex justify-content-between pt-3 "
          id="change_color"
        >
          <a href="/" className="logo"></a>
          <ul className="mt-2 d-flex header_link">
            <li className="pe-3">
              <a href="/sign">簽署文件</a>
            </li>
            <li>
              <a href="/chat">聊天室</a>
            </li>
          </ul>
          <ul className="d-flex justify-content-end me-3 ">
            <li className="mt-2 me-3">
              <span className="title">Hi ,{user.name}!</span>
            </li>
            <li className="px-4">
              <a
                onClick={logoutHandler}
                className="btn btn_header_login "
                href="/login"
              >
                <h3>登出</h3>
              </a>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    );
  }
  {
    return (
      <div>
        <div
          className="header_section container-fluid d-flex justify-content-between pt-3 "
          id="change_color"
        >
          <a href="/" className="logo"></a>
          <ul className="mt-2"></ul>
          <ul className="d-flex justify-content-end me-3 ">
            <li className="px-4">
              <a className="btn btn_header_login " href="/login">
                <h3>登入</h3>
              </a>
            </li>
            <div className="decorate_border"></div>
            <li className="px-4">
              <a className="btn btn_header_signUp btn-light" href="/signUp">
                <h3>註冊</h3>
              </a>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    );
  }
}

export default Header;
