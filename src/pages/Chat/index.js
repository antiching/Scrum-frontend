import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/chat.scss';
import { useAuth } from '../../Context/authContext';
// icon
import { AiOutlineSearch } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
// for time
import moment from 'moment';
// connection  chatRoom
import webSocket from 'socket.io-client';

import ChatPopup from '../../components/ChatPopup';

function Chat(props) {
  // for popup
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [input, setInput] = useState('');

  const [message, setMessage] = useState('');

  const [msg, setMsg] = useState([]);

  const [reply, setReply] = useState('');

  const { user } = useAuth();

  let socket = webSocket('http://localhost:3002');
  socket.on('message', (msg) => {
    // console.log('msg', msg);
    setReply(msg);
    // console.log('reply', reply);
  });
  useEffect(() => {
    // message from server

    console.log(socket);
    socket.on('message', (msg) => {
      // console.log('msg', msg);
      setReply(msg);
      // console.log('reply', reply);
    });
  }, []);
  console.log('message', message);
  console.log('input', input);
  console.log('msg', msg);

  function handleSubmit(e) {
    // e.preventDefault();

    //  輸入框文字重置
    setInput('');

    //訊息送給後端
    socket.emit('chatMessage', message);
    setMessage('');
  }

  //TODO output message to virtual DOM (handleOutputMessage)

  //TODO 方法 create dom

  //addMessage 新增訊息
  function addMessage() {
    setMsg(function (prevData) {
      console.log(prevData);
      return [...prevData, input];
    });
  }
  console.log('msg', msg);
  console.log('現在時間', moment().format());

  //popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  //顯示訊息區塊
  const messages = msg.map((item) => {
    console.log(msg);
    return (
      <div className="d-flex">
        <li key={item.id} className="chat_user">
          {item}
        </li>
        <span className="chat_time">
          {moment().format('HH:mm')}
        </span>
      </div>
    );
  });

  return (
    <div className="bg_chatroom d-flex">
      {isOpen && <ChatPopup handleClose={togglePopup} />}

      {/* 左區塊 */}
      <section className="p-4 contact text-center ">
        <p className="intro_title ">CHAT ROOM</p>
        <button onClick={togglePopup}>加人</button>
        {/* search */}
        <div className="mt-3 border border-dark rounded-pill d-flex justify-content-center ">
          <div className="search_box"></div>
          <div className="search_bar d-flex align-items-center">
            <AiOutlineSearch size={30} className="me-3 " />
          </div>
        </div>
        <ul>
          <li className="d-flex chat_list py-3">
            <img
              src={require('../../Assets/Chat/dog.jpeg')}
              alt=""
              className="avatar "
            />
            <div className="p-2">
              <p className="text-start title ">Tom</p>
              <p className="pt-2">How are you?</p>
            </div>
          </li>
          <li className="d-flex chat_list py-3">
            <img
              src={require('../../Assets/Chat/dog.jpeg')}
              alt=""
              className="avatar "
            />
            <div className="p-2">
              <p className="text-start title ">Tom</p>
              <p className="pt-2">How are you?</p>
            </div>
          </li>
          <li className="d-flex chat_list py-3">
            <img
              src={require('../../Assets/Chat/dog.jpeg')}
              alt=""
              className="avatar "
            />
            <div className="p-2">
              <p className="text-start title ">Tom</p>
              <p className="pt-2">How are you?</p>
            </div>
          </li>
          <li className="d-flex chat_list py-3">
            <img
              src={require('../../Assets/Chat/dog.jpeg')}
              alt=""
              className="avatar "
            />
            <div className="p-2">
              <p className="text-start title ">Tom</p>
              <p className="pt-2">How are you?</p>
            </div>
          </li>
          <li className="d-flex chat_list py-3">
            <img
              src={require('../../Assets/Chat/dog.jpeg')}
              alt=""
              className="avatar "
            />
            <div className="p-2">
              <p className="text-start title ">Tom</p>
              <p className="py-2">How are you?</p>
            </div>
          </li>
        </ul>
      </section>

      {/* 右區塊 */}
      <section>
        <p className="chat_partner title h5 text-center py-2">Tom</p>
        <div className="chat_form_container pt-2" action="">
          {/* show message */}
          <ul className="chat_messages">{messages}</ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="chat_form d-flex justify-content-center align-items-center"
          >
            <input
              placeholder="請輸入文字"
              className="message ps-3"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="ms-3 send_button " onClick={addMessage}>
              <RiSendPlaneFill />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Chat;
