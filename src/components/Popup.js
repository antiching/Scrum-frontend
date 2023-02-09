import React, { useRef, useState, useEffect, useCallback } from 'react';
import './style/popup.scss';
import { API_URL } from '../utils/config';
import { useAuth } from '../Context/authContext';
import axios from 'axios';
// import Canvas from './Canvas';

function Popup(props) {
  const { user, setUser, onLogin } = useAuth();

  const canvasRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);
  const ctx = useRef(null);
  const colors = ['black', 'red', 'blue'];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [lastPosition, setPosition] = useState({ x: 0, y: 0 });
  const showImage = useRef(null);
  const saveRef = useRef(null);

  useEffect((e) => {
    console.log(user, 'user');
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext('2d');
    const bounding = canvasRef.current.getBoundingClientRect();
    // console.log(bounding.left);
    // console.log(canvas);
  }, []);

  function computeCanvas(clientX, clientY) {
    if (canvasRef.current) {
      const bounding = canvasRef.current.getBoundingClientRect();
      // console.log('bounding', bounding);
      return {
        x: clientX - bounding.left,
        y: clientY - bounding.top,
      };
    } else {
      return null;
    }
  }

  const draw = useCallback(
    (x, y) => {
      if (mouseDown) {
        ctx.current.beginPath(); //開啟繪圖
        ctx.current.strokeStyle = selectedColor; // select 's value
        ctx.current.lineWidth = 4;
        ctx.current.lineJoin = 'round';
        ctx.current.moveTo(x, y); // 起點（抓到上一次的定點位置）
        ctx.current.lineTo(lastPosition.x, lastPosition.y); //結束
        ctx.current.stroke(); // visible
        ctx.current.closePath(); //關閉
      }
      setPosition({
        x,
        y,
      });
    },
    [lastPosition, mouseDown, setPosition]
  );

  const starDraw = (e) => {
    if (canvasRef.current) {
      const bounding = canvasRef.current.getBoundingClientRect();
      // console.log(bounding.left);
      setMouseDown(true);
    }
    setPosition({
      // x: e.clientX,
      // y: e.clientY,
    });
  };

  const clear = () => {
    console.log('清除');
    ctx.current.clearRect(
      0,
      0,
      ctx.current.canvas.width,
      ctx.current.canvas.height
    );
  };

  const onMouseUp = (e) => {
    setMouseDown(false);
  };

  const onMouseMove = (e) => {
    const point = computeCanvas(e.clientX, e.clientY);
    // console.log(point, 'point');
    window.addEventListener('mousemove', draw(point.x, point.y));
  };

  // console.log('mouseDown,lastPosition', mouseDown, lastPosition);

  //儲存照片
  async function saveSign() {
    //TODO canvas to Blob
    canvasRef.current.toBlob(
      function (blob) {
        console.log(blob);
      },
      'image/jpeg',
      0.8
    );

    if (showImage.current) {
      // 確認有抓到img 才能進行下面的動作
      const newSign = canvasRef.current.toDataURL('img/png');
      showImage.current.src = newSign;
      // console.log(newSign);
      // console.log(showImage.current);
      //存入 localStorage
      localStorage.setItem('newSign', newSign);

      //存入後端
      const data = {
        user_id: user.id,
        sign: newSign,
      };
      try {
        await axios.post(`${API_URL}/newSign`, data);
      } catch (err) {
        console.log('error', err);
      }

      // 跳轉頁面

      window.location.replace('/sign');
      console.log(saveRef.current);
    }
  }

  //上傳簽名檔至後端
  async function handleSubmit(e) {
    e.preventDefault();

    // let formData = new FormData();
    // console.log(file);
    // formData.append('file', file);
    // let response = axios.post(`${API_URL}/sign`, formData, {
    //   withCredentials: true,
    // });
  }

  return (
    <div className="popup_box">
      <div className="box">
        <button onClick={props.handleClose} className="btn_close">
          x
        </button>
        <p className="text-center mb-3 text-gray">
          我了解這是具法律效益的本人簽名
        </p>
        <div className="text-center text-gray">
          <span className="me-3">筆跡顏色</span>
          <select
            value={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value);
            }}
            className="canvas_sel ect"
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <canvas
          ref={canvasRef}
          width={450}
          height={300}
          style={{
            border: '1px solid #E6E9EF',
            borderRadius: '10px',
            margin: '24px auto',
          }}
          onMouseMove={onMouseMove}
          onMouseDown={starDraw}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        />
        <div className="text-center">
          <button
            className="canvas_button canvas_button_white me-5 mb-5"
            onClick={() => {
              clear();
            }}
          >
            清除簽名
          </button>
          <button
            className="canvas_button canvas_button_primary"
            onClick={saveSign}
            ref={saveRef}
          >
            儲存
          </button>
        </div>

        {/* 確定 1. 可顯示img 2.將 base64 的值放入 img 的 src */}
        <img ref={showImage} className="show_img d-none" src="" alt="" />
      </div>
    </div>
  );
}
export default Popup;
