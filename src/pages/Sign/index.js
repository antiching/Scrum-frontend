import React from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { useAuth } from '../../Context/authContext';
import { useEffect, useState, useRef } from 'react';
import '../styles/sign.scss';
import { fabric } from 'fabric';
import { AiOutlineArrowRight } from 'react-icons/ai';

//icon
import { HiOutlineUserAdd } from 'react-icons/hi';

// sweat alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//pdf
import { pdfjs } from 'react-pdf';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// component
import Popup from '../../components/Popup';

const MySwal = withReactContent(Swal);

function Sign(props) {
  const { user, setUser } = useAuth();
  const [file, setFile] = useState({ name: '尚未上傳' });
  const [isOpen, setIsOpen] = useState(false);
  const showImage = useRef(null);

  //pdf
  const [pageNumber, setPageNumber] = useState(1);
  const [pageTotal, setPageTotal] = useState(null);
  const [pageNumPending, setPageNumPending] = useState(null); // Cache waiting page number
  const [pageRendering, setPageRendering] = useState(false); // Check conflict
  const fileRef = useRef({});
  const stepRef = useRef({});
  const [ctx, setCtx] = useState(null);

  const [canvas, setCanvas] = useState({});

  const canvasOriginalHeight = 800;
  const canvasOriginalWidth = 800;

  //pdf

  // useEffect(() => {
  //   const canvas = fileRef.current;
  //   setCanvas(canvas);
  //   console.log('canvas', canvas);
  //   if (canvas) setCtx(canvas.getContext('2d'));
  //   console.log(ctx);
  // }, [fileRef]);

  /** 建立主要的 canvas */
  useEffect(() => {
    const c = new fabric.Canvas(fileRef.current);
    setCanvas(c);
  }, [fileRef]);

  function readBlob(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', reject);
      reader.readAsDataURL(blob);
    });
  }

  const Base64Prefix = 'data:application/pdf;base64,';

  async function printPDF(pdfData) {
    pdfData = await readBlob(pdfData);
    console.log(pdfData);
    const data = atob(pdfData.substring(Base64Prefix.length));

    // Using DocumentInitParameters object to load binary data.
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
    const pdfPage = await pdfDoc.getPage(pageNumber);

    const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // 控制顯示PDF的寬高
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport,
    };
    const renderTask = pdfPage.render(renderContext);

    // 回傳做好的canvas
    return renderTask.promise.then(() => canvas);
  }

  async function pdfToImage(pdfData) {
    const scale = 1 / window.devicePixelRatio;
    return new fabric.Image(pdfData, {
      scaleX: scale,
      scaleY: scale,
    });
  }

  // returns scaled dimensions object
  const getScaledDim = (img, maxWidth, maxHeight) => {
    var scaled = {
      ratio: img.width / img.height,
      width: img.width,
      height: img.height,
    };
    if (scaled.width > maxWidth) {
      scaled.width = maxWidth;
      scaled.height = scaled.width / scaled.ratio;
    }
    if (scaled.height > maxHeight) {
      scaled.height = maxHeight;
      scaled.width = scaled.height / scaled.ratio;
    }
    return scaled;
  };

  async function handleOnChange(e) {
    e.preventDefault();
    // if (file.type === 'application/pdf') {
    const result = e.target.files[0];
    setFile(result);

    // pdf
    setCtx(fileRef.current.getContext('2d'));
    console.log(file);
    if (result.type === 'application/pdf') {
      console.log('file', file);
      console.log('files', e.target.files[0]);
      console.log('files', e.target.files[0].name);
      console.log('files', e.target.files[0].type);
      console.log(file);
      console.log(file.type);
      canvas.requestRenderAll();
      const pdfData = await printPDF(e.target.files[0]);
      const pdfImage = await pdfToImage(pdfData);

      // 調整canvas大小
      canvas.setWidth(pdfImage.width / window.devicePixelRatio);
      canvas.setHeight(pdfImage.height / window.devicePixelRatio);
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
    }

    //
    const executeScroll = () => stepRef.current.scrollIntoView();
    executeScroll();
  }

  // console.log('user', user);
  // 方法ㄧ：json不能放圖片 （轉成）二進位資料base64
  // 方法二：FormData / Content-Type: multipart/form-data =>使用multer套件解析
  async function handleSubmit(e) {
    e.preventDefault();
    if (file.name.length >= 0) {
      try {
        // 產生fileReader物件
        let fileReader = new FileReader();

        // 將資料做處理
        fileReader.readAsArrayBuffer(file);

        // 綁入事件監聽
        fileReader.onload = function () {
          // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
          const typedarray = new Uint8Array(fileReader.result);
          console.log(typedarray);
          // renderPDF(typedarray);
        };

        // let formData = new FormData();
        // console.log(file);
        // formData.append('file', file);
        // let response = axios.post(`${API_URL}/sign`, formData, {
        //   withCredentials: true,
        // });
        // //pop up
        // MySwal.fire({
        //   title: <strong>上傳成功</strong>,
        //   html: <i>轉跳頁面中..</i>,
        //   icon: 'success',
        // });
        // window.location.replace('/signature');
      } catch (e) {
        console.error(' sign', e);
      }
    } else {
      {
        //pop up
        MySwal.fire({
          title: <strong>請上傳檔案</strong>,
          icon: 'error',
        });
      }
    }
  }

  useEffect(() => {
    //簽名檔
    //儲存 localStorage 中的newSign
    const savedSign = localStorage.getItem('newSign');
    showImage.current.src = savedSign;
  }, []);

  //popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const addSign = (e) => {
    if (!showImage.current) return;
    console.log(showImage.current.src);
    fabric.Image.fromURL(showImage.current.src, function (image) {
      image.scaleX = 0.5;
      image.scaleY = 0.5;
      canvas.add(image).renderAll();
    });
  };

  const style = {
    border: '1px solid #E6E9EF',
    borderRadius: '10px',
  };

  /** 下載 */
  const download = () => {
    const dataURL = canvas.toDataURL({ format: 'png' });

    const link = document.createElement('a');
    // link.download = file.name;
    link.download = 'my-file';
    link.href = dataURL;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div>
      <div className="sign_main_section ">
        <div className="sign_upload ">
          <img
            className="addFile"
            src={require('../../Assets/Sign/addFile.png')}
            alt=""
          />
          <p>將檔案拖曳至這裡，或</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fileUploader" className="btn_bg">
              選擇檔案
            </label>
            <input
              type="file"
              id="fileUploader"
              className="file-uploader"
              onChange={handleOnChange}
              accept="image/*,.pdf"
            />
            <p className="mb-2 upload_subtitle">
              選擇檔案： <span className="file-name">{file.name}</span>
            </p>
            <p className="upload_subtitle">
              檔案大小10MB以內，檔案格式為PDF、IMG
            </p>
          </form>
        </div>
      </div>
      <div className="sign_intro">
        <div className="sign_intro_section">
          <p className="sign_intro_subtitle">輕鬆幾步驟，完成您的簽署</p>
          <div className="sign_intro_steps">
            <img src={require('../../Assets/Sign/intro_1.png')} alt="" />
            <img src={require('../../Assets/Sign/intro_2.png')} alt="" />
            <img src={require('../../Assets/Sign/intro_3.png')} alt="" />
          </div>
        </div>
      </div>

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
            <div className="circle  d-flex align-items-center">
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
            <p className="step_text">下載檔案</p>
          </li>
          <li className="d-flex align-items-center">
            <div className="line d-flex align-items-center"></div>
          </li>
          <li className="step">
            <div className="circle  d-flex align-items-center">
              <span className="step_number_3 m-auto">3</span>
            </div>
            <p className="step_text">確認檔案</p>
          </li>
        </ul>
        <div className="container file_main d-flex">
          <div className="file mt-3 ">
            <ul ref={stepRef} className="d-flex justify-content-between">
              <li className="d-inline">
                <span className="me-3">step1</span>
                <button className="btn_bg d-inline" onClick={addSign}>
                  點擊加入簽名
                </button>
              </li>
              <li className="d-flex align-items-center ">
                <AiOutlineArrowRight size={30} />
              </li>

              <li className="d-inline">
                <span className="me-3">step2</span>
                <button className="btn_bg d-inline" onClick={download}>
                  下載檔案
                </button>
              </li>
              <li className="d-flex align-items-center ">
                <AiOutlineArrowRight size={30} />
              </li>
              <li className="d-inline">
                <span className="me-3">step3</span>
                <button className="btn_bg d-inline" onClick={addSign}>
                  確認檔案
                </button>
              </li>
            </ul>

            {/* pdf顯示區 */}
            <canvas ref={fileRef} style={style}></canvas>
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
    </div>
  );
}

export default Sign;
