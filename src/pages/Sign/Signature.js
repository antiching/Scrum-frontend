import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../../utils/config';
import '../styles/signature.scss';

// 顯示pdf
import { pdfjs } from 'react-pdf/dist/esm/entry.webpack5';
import { fabric } from 'fabric';

//icon
import { HiOutlineUserAdd } from 'react-icons/hi';

// component
import Popup from '../../components/Popup';

import WebViewer from '@pdftron/pdfjs-express';
import { Autoplay } from 'swiper';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

function Signature(props) {
  const [file, setFile] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sign, setSign] = useState(false);
  const showImage = useRef(null);

  //show pdf
  // let pdfDoc = null;

  // let pageNumber = 1;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageTotal, setPageTotal] = useState(null);
  const [pageNumPending, setPageNumPending] = useState(null); // Cache waiting page number
  const [pageRendering, setPageRendering] = useState(false); // Check conflict
  const scale = 1.5;
  const fileRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvas = fileRef.current;
    setCanvas(canvas);
    console.log('canvas', canvas);
    if (canvas) setCtx(canvas.getContext('2d'));
    console.log(ctx);
  }, [fileRef]);

  async function renderPDF(data) {
    // pdf 環境設定
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
    const loadingTask = await pdfjsLib.getDocument(data).promise;
    const pdfPage = await loadingTask.getPage(pageNumber);
    console.log(loadingTask);
    console.log(pdfPage);
    const viewport = pdfPage.getViewport({ scale: 1 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    pdfPage.render({
      canvasContext: ctx,
      viewport: viewport,
    });
  }

  console.log('file name', IMAGE_URL + file.name);
  renderPDF(IMAGE_URL + file.name);

  //抓到簽名
  const savedSign = localStorage.getItem('newSign');

  const canvasSize = 500;

  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  //樣式設定
  // const style = {
  //   margin: 'auto',
  //   height: '100vh',
  // };

  const styleCanvas = {
    border: ' 1px solid #000',
  };

  useEffect(() => {
    //get file
    let getFile = async () => {
      let response = await axios.get(`${API_URL}/file`, {
        withCredentials: true,
      });
      setFile(response.data);
      console.log('response.data', response.data);
      // console.log('file', file);
      // console.log('file name', IMAGE_URL + file.name);
      return response;
    };
    getFile();
    console.log(file);
    console.log(typeof file);
    // let fileReader = new FileReader();
    // fileReader.readAsArrayBuffer(file);

    //儲存 localStorage 中的newSign
    const savedSign = localStorage.getItem('newSign');
    showImage.current.src = savedSign;
    // console.log('savedSign', savedSign);
    // console.log('sign', sign);
    // console.log(showImage.current);
  }, []);

  // 簽名板
  useEffect(() => {
    const savedSign = localStorage.getItem('newSign');
    if (savedSign !== null) {
      fabric.Image.fromURL(showImage.current.src, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 400;
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        fileRef.current.add(image).renderAll();
      });
    }
  }, []);

  //popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
    // console.log('isOpen', isOpen);
    // console.log('togglepopup');
  };

  return (
    <div>
      {isOpen && <Popup handleClose={togglePopup} />}

      <ul className="steps d-flex justify-content-around">
        <li className="step">
          <div className="active circle d-flex align-items-center">
            <img
              className="m-auto"
              src={require('../../Assets/Icon/check.png')}
              alt=""
            />
          </div>
          <p className="step_text">成功上傳檔案</p>
        </li>
        <li className=" d-flex align-items-center">
          <div className="line d-flex align-items-center"></div>
        </li>
        <li className=" step  ">
          <div className="circle active d-flex align-items-center">
            <span className="step_number_2 m-auto">1</span>
          </div>
          <p className="step_text">加入簽名檔</p>
        </li>
        <li className="d-flex align-items-center">
          <div className="line d-flex align-items-center"></div>
        </li>
        <li className="step">
          <div className="circle d-flex align-items-center">
            <span className="step_number_3 m-auto">2</span>
          </div>
          <p className="step_text">確認檔案</p>
        </li>
        <li className="d-flex align-items-center">
          <div className="line d-flex align-items-center"></div>
        </li>
        <li className="step">
          <div className="circle  d-flex align-items-center">
            <span className="step_number_3 m-auto">3</span>
          </div>
          <p className="step_text">下載檔案</p>
        </li>
      </ul>
      <div className="container file_main d-flex">
        <div className="file ">
          <button
            onClick={() => {
              setPageNumber(pageNumber - 1);
            }}
          >
            上一頁
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 1);
            }}
          >
            下一頁
          </button>
          <span>
            Page: <span>{pageNumber}</span> / <span>{pageTotal}</span>
          </span>
          <canvas className="pt-5" ref={fileRef} style={styleCanvas}></canvas>
        </div>

        {/* <img className="file" src={IMAGE_URL + file.name} /> */}
        <div className="file_settings">
          <div className="file_setting">
            <img ref={showImage} alt="" className="showImage" src="" />
            <button onClick={togglePopup} className="create_bg">
              修改簽名檔
            </button>
          </div>
          <div className="file_setting d-flex justify-content-between">
            <span className="title">邀請簽署人</span>
            <button className="create_sm">
              <HiOutlineUserAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signature;
