import React from 'react';
import '../styles/signup.scss';
import { Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
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

function SignUp(props) {
  // -- label name
  const [title, setTitle] = useState({
    fullName: 'FullName',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'ConfirmPassword',
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

  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordInput(e.target.value);
  };

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    if (confirmPasswordType === 'password') {
      setConfirmPasswordType('text');
      return;
    }
    setConfirmPasswordType('password');
  };

  // -- 密碼驗證
  const validate = yup.object({
    fullName: yup.string().max(10, '長度不得超過10').required('欄位不得為空'),
    email: yup.string().email('電子郵件格式有誤').required('欄位不得為空'),
    password: yup
      .string()
      .min(4, '長度不得小於4')
      .max(12, '長度不得大於12')
      .required('欄位不得為空'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), , null], '密碼匹配不一致'),
  });

  useEffect(() => {
    let labels = document.querySelectorAll('.form_control label');
    let labelArr = [...labels];
    // console.log(labelArr);
    //   console.log(`labels`, labels);
    labelArr.forEach((label) => {
      // console.log(label.innerText);
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
  } = useForm({
    resolver: yupResolver(validate),
  });

  console.log('errors', errors);

  async function onSubmit(data, e) {
    e.preventDefault();
    console.log('data', data);
    //確認資料無誤  傳給後端
    try {
      // console.log('response', response);
      console.log('data', data);
      await axios.post(`${API_URL}/auth/register`, data);
      // pop up
      MySwal.fire({
        title: <strong>註冊成功</strong>,
        html: <i>轉跳頁面中..</i>,
        icon: 'success',
      });
      window.location.href = 'http://localhost:3000/login';
    } catch (err) {
      // pop up
      MySwal.fire({
        icon: 'error',
        title: <strong>請重新輸入</strong>,
        html: <i className="alert">{err.response.data.message} </i>,
      });
    }
  }

  return (
    <div>
      <div className="bg"></div>
      <div className="blur">
        <h1 className="text-center welcome">歡迎您！</h1>

        <h2 className="text-center p-4 border-bottom border-gray">註冊</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="my-5 form_login"
        >
          <div className="form_control changeTranslate">
            <input
              name="fullName"
              type="text"
              className="login"
              onClick={handleClick}
              {...register('fullName')}
            />
            <label className="login">{title.fullName}</label>
            <p className="mt-1 input_alert">{errors.fullName?.message}</p>
          </div>
          <div className="form_control changeTranslate">
            <input
              name="email"
              type="email"
              className="login"
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
          <div className="form_control changeTranslate">
            <input
              name="confirmPassword"
              type={confirmPasswordType}
              className="login"
              onChange={handleConfirmPasswordChange}
              onClick={handleClick}
              {...register('confirmPassword')}
            />
            <label className="login">{title.confirmPassword}</label>
            <button className="show_eye" onClick={toggleConfirmPassword}>
              {confirmPasswordType === 'password' ? (
                <AiFillEyeInvisible size={24} />
              ) : (
                <AiFillEye size={24} />
              )}
            </button>
            <p className="mt-1 input_alert">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <button className="btn_login" type="submit">
            確認
          </button>
          <p className="email my-4 text-center">
            已經有帳號了？
            <a href="/login">登入</a>
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

export default SignUp;
