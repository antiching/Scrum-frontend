import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../../utils/config';
import '../styles/files.scss';

function Files() {
  const [user, setUser] = useState(null);
  const [file, setFiles] = useState(null);
  useEffect(() => {
    let getUser = async () => {
      try {
        let response = await axios.get(`${API_URL}/users`, {
          withCredentials: true,
        });
        setUser(response.data);
        console.log('response.data', response.data);
      } catch (err) {
        console.log('err', err);
      }
    };
    getUser();

    let getFiles = async () => {
      try {
        let response = await axios.get(`${API_URL}/files`, {
          withCredentials: true,
        });
        setFiles(response.data);
        console.log('response.data', response.data);
      } catch (err) {
        console.log('err', err);
      }
    };
    getFiles();
  }, []);
  console.log('files', file);

  //簽名
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const clearBtn = document.querySelector('.clear');

  // 設定線條的相關數值
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  // 設置狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
  let isPainting = false;

  // 取得滑鼠 / 手指在畫布上的位置
  function getPaintPosition(e) {
    const canvasSize = canvas.getBoundingClientRect();

    if (e.type === 'mousemove') {
      return {
        x: e.clientX - canvasSize.left,
        y: e.clientY - canvasSize.top,
      };
    } else {
      return {
        x: e.touches[0].clientX - canvasSize.left,
        y: e.touches[0].clientY - canvasSize.top,
      };
    }
  }

  // 開始繪圖時，將狀態開啟
  function startPosition(e) {
    e.preventDefault();
    isPainting = true;
  }

  // 結束繪圖時，將狀態關閉，並產生新路徑
  function finishedPosition() {
    isPainting = false;
    ctx.beginPath();
  }

  // 繪圖過程
  function draw(e) {
    // 滑鼠移動過程中，若非繪圖狀態，則跳出
    if (!isPainting) return;

    // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
    const paintPosition = getPaintPosition(e);

    // 移動滑鼠位置並產生圖案
    ctx.lineTo(paintPosition.x, paintPosition.y);
    ctx.stroke();
  }

  // 重新設定畫布
  function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // event listener 電腦板
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mouseleave', finishedPosition);
  canvas.addEventListener('mousemove', draw);

  // event listener 手機板
  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', finishedPosition);
  canvas.addEventListener('touchcancel', finishedPosition);
  canvas.addEventListener('touchmove', draw);

  clearBtn.addEventListener('click', reset);

  return (
    <div>
      {user ? (
        <>
          <p>hi 黃顯晴</p>
          21321
          <canvas id="canvas" width="500" height="300"></canvas>
          <img className="show-img" width="250" height="150" />
          <div className="btn-group">
            <button className="clear">Clear</button>
            <button className="save">Save</button>
          </div>
        </>
      ) : (
        <p>請先登入</p>
      )}
    </div>
  );
}

export default Files;
