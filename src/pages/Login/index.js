import React from 'react';
import '../styles/login.scss';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/authContext';
// import AuthContext from '../../Context/authContext';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
//icon
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';

// sweat alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Login(props) {
  const { user, setUser, isLoggedIn, onLogin, setIsLoggedIn } = useAuth();

  console.log('user', user);

  // -- label name
  const [title, setTitle] = useState({
    email: 'Email',
    password: 'Password',
  });

  // -- 隱藏密碼

  const [passwordType, setPasswordType] = useState('password');
  const [passwordInput, setPasswordInput] = useState('');
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  useEffect(() => {
    // * -- label 動畫
    let labels = document.querySelectorAll('.form_control label');
    let labelArr = [...labels];
    // console.log(labelArr);
    //   console.log(`labels`, labels);
    labelArr.forEach((label) => {
      //console.log(label.innerText);
      label.innerHTML = label.innerText
        .split('')
        .map(
          (letter, index) =>
            `<span style="transition-delay:${index * 30}ms">${letter}</span>`
        )
        .join('');
    });

    // *-- header 背景透明
    let changeColor = document.getElementById('change_color');
    changeColor.classList.remove('header_section');
    changeColor.classList.add('header_bg_transparent');
  }, []);

  function handleClick(e) {
    let changeTranslate = document.querySelectorAll('.form_control');

    if (e.target.value != null) {
      for (let i = 0; i < changeTranslate.length; i++) {
        changeTranslate[i].addEventListener('click', function () {
          // e.stopPropagation();
          e.preventDefault();
          // console.log('有抓到');
          // console.log('changeTranslate[i]', changeTranslate[i]);
          changeTranslate[i].classList.remove('changeTranslate');
          changeTranslate[i].classList.add('form_control_onBlur');
        });
      }
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  console.log('islogin', isLoggedIn);

  async function onSubmit(data, e) {
    e.preventDefault();
    setIsLoggedIn(true);
    console.log('data', data);

    // 確認資料無誤  傳給後端
    try {
      await axios.post(`${API_URL}/auth/login`, data, {
        //為了跨源存取cookie
        withCredentials: true,
      });
      let response = await axios.get(`${API_URL}/users`, {
        withCredentials: true,
      });
      setUser(response.data);
      //pop up
      MySwal.fire({
        title: <strong>登入成功</strong>,
        html: <i>轉跳頁面中..</i>,
        icon: 'success',
      });
      // 登入後導到首頁
      return <Navigate to="/" />;
    } catch (err) {
      console.log(err);
      MySwal.fire({
        title: <strong>登入失敗</strong>,
        html: <i>帳號或密碼錯誤..</i>,
        icon: 'error',
      });
    }
  }

  // console.log('user,', user);
  if (isLoggedIn == true) {
    return <Navigate to="/" />;
  } else
    return (
      <div>
        <div className="bg"></div>
        <div className="blur_login">
          <h1 className="text-center welcome">歡迎您！</h1>

          <h2 className="text-center p-4 border-bottom border-gray">登入</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="my-5 form_login"
          >
            <div className="form_control changeTranslate">
              <input
                name="email"
                type="email"
                className="login"
                tabIndex="-1"
                onClick={handleClick}
                {...register('email')}
              />
              <label className="login">{title.email}</label>
              <p className="mt-1 input_alert">{errors.email?.message}</p>
            </div>
            <div className="form_control changeTranslate">
              <input
                name="password"
                type={passwordType}
                className="login"
                onChange={handlePasswordChange}
                onClick={handleClick}
                {...register('password')}
              />
              <label className="login">{title.password}</label>
              <button className="show_eye" onClick={togglePassword}>
                {passwordType === 'password' ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </button>
              <p className="mt-1 input_alert">{errors.password?.message}</p>
            </div>
            <button className="btn_login" type="submit">
              確認
            </button>
            <p className="account mt-4 text-center">
              尚未有帳號？ <a href="/signup">註冊</a>
            </p>
          </form>
        </div>

        {/* 火箭 */}
        <div className="rocket">
          <div className="rocket_main">
            <div className="rocket_body"></div>
            <div className="fin fin_left"></div>
            <div className="fin fin_right"></div>
            <div className="window"></div>
          </div>

          <div className="exhaust_flame">
            <ul className="exhaust_fumes">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Login;
