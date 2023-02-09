import React, { useRef, useState, useEffect, useCallback } from 'react';
import './style/popup.scss';
import { API_URL } from '../utils/config';
import { useAuth } from '../Context/authContext';
import axios from 'axios';
// import Canvas from './Canvas';

function ChatPopup(props) {
  const { user, setUser, onLogin } = useAuth();

  return (
    <div className="popup_box">
      <div className="box">
        <button onClick={props.handleClose} className="btn_close">
          x
        </button>
        <p className="text-center mb-3 text-gray">加入聯絡人</p>
        <ul>
          <li className="d-flex chat_list py-3">
            <img
              //   src={require('../../Assets/Chat/dog.jpeg')}
              alt=""
              className="avatar "
            />
            <div className="p-2">
              <p className="text-start title ">Tom</p>
              <p className="pt-2">How are you?</p>
            </div>
          </li>
        </ul>
        <div className="text-center">
          <button className="canvas_button canvas_button_primary">儲存</button>
        </div>
      </div>
    </div>
  );
}
export default ChatPopup;
