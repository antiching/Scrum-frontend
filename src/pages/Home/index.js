import React from 'react';
import '../styles/home.scss';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { useAuth } from '../../Context/authContext';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { MdKeyboardArrowDown } from 'react-icons/md';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

function Home(props) {
  const { user, setUser, onLogin } = useAuth();

  useEffect(() => {
    gsap.to('.bg_loop', {
      xPercent: '-50', //每次往左50%
      ease: 'none', //速度均等
      duration: 12,
      repeat: -1,
    });

    // -- home section2 card animation
    const tl1 = gsap.timeline();
    tl1
      .to('.card_1', {
        position: 'absolute', // position: 'absolute'，絕對位置才能使用left, right...等
        top: '44%',
        opacity: 1,
        duration: 1, // 動畫持續時間之比例
      })
      .to('.card_2', {
        // position: 'absolute', // position: 'absolute'，絕對位置才能使用left, right...等
        top: '58%',
        opacity: 1,
        duration: 1, // 動畫持續時間之比例
      })
      .to('.card_3', {
        // position: 'absolute', // position: 'absolute'，絕對位置才能使用left, right...等
        top: '30%',
        opacity: 1,
        duration: 1, // 動畫持續時間之比例
      });

    // home section 3

    MotionPathPlugin.convertToPath('#circlePath');

    let tl = gsap.timeline({
      defaults: { duration: 0.1, ease: 'elastic(2.5, 1)' },
    });

    let action = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.home_section3',
          // markers: true,
          start: 'top bottom',
          // pin: true,
          scrub: 0.1,
        },
      })
      // .to('#letter', { duration: 0.01, autoAlpha: 1 })
      .from('#circlePath', { drawSVG: 0 }, 0)
      .to(
        '#letter',
        {
          motionPath: {
            path: '#circlePath',
            align: '#circlePath',
            alignOrigin: [0.5, 0.5],
            start: 0.4,
            // end: 0.5,
            duration: 1,
          },
        },
        0
      )
      .to(
        '#letter1',
        {
          motionPath: {
            path: '#circlePath',
            align: '#circlePath',
            alignOrigin: [0.5, 0.5],
            start: 0.8,
            // end: 0.8,
            duration: 1,
          },
        },
        0
      )
      .to(
        '#letter2',
        {
          motionPath: {
            path: '#circlePath',
            align: '#circlePath',
            alignOrigin: [0.5, 0.5],
            start: 1.2,
            // end: 1,
            duration: 1,
          },
        },
        0
      )
      .add(tl, 0);
  }, []);

  console.log('user', user);

  return (
    <div className="home_section">
      {/* -- home section1 */}
      <section className=" home_section1 ">
        {/* bg */}
        <div className="home-bg">
          <img
            className="bg_rectangle1"
            src={require('../../Assets/Home/Rectangle1.png')}
            alt=""
          />
          <img
            className="bg_rectangle2"
            src={require('../../Assets/Home/Rectangle2.png')}
            alt=""
          />
          <img
            className="bg_star1"
            src={require('../../Assets/Home/Star1.png')}
            alt=""
          />
          <img
            className="bg_star2"
            src={require('../../Assets/Home/Star2.png')}
            alt=""
          />
          <div className="font1 font_georama_800"> Sprint </div>
          <div className="font2 font_georama_800">Project </div>
          <div className="scroll_down">
            <span>SCROLL DOWN</span>
            <div className="arrow">
              <MdKeyboardArrowDown size={30} />
            </div>
          </div>
        </div>

        {/* hover_section1 */}
        <div className="hover_section1">
          <img
            className="bg_face"
            src={require('../../Assets/Home/face.png')}
            alt=""
          />
        </div>

        {/* hover_section2 */}
        <div className="hover_section2 text-center">
          <div className="font_rounded font_rounded1">SCRUM</div>
          <div className="font_rounded font_rounded2">SCRUM</div>
          <img
            className="bg_circle1"
            src={require('../../Assets/Home/Circle1.png')}
            alt=""
          />
          <img
            className="bg_circle2"
            src={require('../../Assets/Home/Circle2.png')}
            alt=""
          />
        </div>

        {/* hover_section3 */}
        <div className="hover_section3">
          <img
            className="bg_butterfly"
            src={require('../../Assets/Home/butterfly.png')}
            alt=""
          />
        </div>

        {/* loop */}
        <section className="section_loop">
          <ul className="bg_loop">
            <li>
              <span className="font_rounded font_rounded3">
                SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM
                SCRUM SCRUM
              </span>
              <span className="font_rounded font_rounded3">
                &nbsp;SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM SCRUM
                SCRUM SCRUM SCRUM
              </span>
            </li>
          </ul>
        </section>
      </section>
      {/* -- home section2 */}
      <section className=" home_section2 ">
        <div className="section2_bg1"></div>
        <div className="section2_bg2"></div>
        <div>
          <ul className="d-flex slider justify-content-center">
            <li className="dot dot_1"></li>
            <li className="dot dot_2"></li>
            <li className="dot dot_3"></li>
          </ul>
          <div className="cards">
            <div className="card card_1">
              <span>永遠彈性調整，並優先做最重要的事情</span>
            </div>
            <div className="card card_2">
              <span>團隊所有人都要能隨時掌握情況，幫助彼此解決問題</span>
            </div>
            <div className="card card_3">
              <span>專注在如何於固定時間內，產生更多價值</span>
            </div>
          </div>
        </div>
      </section>
      {/* section3 */}
      <section className=" home_section3">
        <div className="container pt-4 ">
          <span className="intro_title ">SCRUM介紹</span>
          <div className="mt-5 p-2 intro_scrum text-center">
            Scrum起源與應用
          </div>
          <div className="mb-5 p-4 intro_detail">
            Scrum源自於英式橄欖球，與隊友環繞在一起的形式去對陣爭球；進而表示以「橄欖球式」的方法，團隊作為一個整體前進，在團隊的內部傳球並保持陣形。
            Scrum是敏捷開發底下的一種框架模式，適用於需要即時因應市場變化的開發方式，注重團隊的相互合作，而團隊每個人也都是為了完成目標(Sprint
            Goal)努力。
          </div>
        </div>

        {/* cards */}

        <div className="card_intro card_intro_1">
          <p className="card_title">產品代辦清單</p>
          <p className="card_subtitle">Product Backlog</p>
          <p className="ard_subtitle  card_border">指整個團隊代辦事項的清單</p>
          <ul>
            <li>
              <span className="list_dot"></span>
              <span>每個事項都有優先度的等級</span>
            </li>
            <li>
              <span className="list_dot"></span>
              <span>以使用者故事的方式進行撰寫</span>
            </li>
            <li>
              <span className="list_dot"></span>
              <span>Scrum的任務核</span>
            </li>
          </ul>
        </div>

        <div className  ="card_intro card_intro_2">
          <p className="card_title">短衝</p>
          <p className="card_subtitle">Sprint</p>
          <p className="ard_subtitle  card_border">
            短期且固定時間內，完成交付的任務
          </p>
          <ul>
            <li>
              <span className="list_dot"></span>
              <span>短衝是迭代的</span>
            </li>
            <li>
              <span className="list_dot"></span>
              <span>不斷回饋的過程即時修正工作方向</span>
            </li>
            <li>
              <span className="list_dot"></span>
              <span>通常為15～30天的工作週期</span>
            </li>
          </ul>
        </div>

        <div className="card_intro card_intro_3">
          <p className="card_title">角色</p>
          <p className="card_subtitle">Roles</p>
          <p className="ard_subtitle  card_border">Scrum團隊裡所需的職位</p>
          <ul>
            <li>
              <span className="list_dot"></span>
              <span>產品負責人 (PO) 決定方向、代表客戶的意願</span>
            </li>
            <li>
              <span className="list_dot"></span>
              <span>Scrum Master (SM) 監督、促進流程</span>
            </li>
            <li>
              <span className="list_dot"></span>
              <span>開發團隊 (DV) 執行任務、實際開發</span>
            </li>
          </ul>
        </div>

        <svg id="greenCircles" viewBox="0 0 300 400">
          <circle cx="48" cy="200" r="150" stroke="none" fill="#4E7B57" />

          <g id="small">
            <text id="letter" text-anchor="middle" x="20" y="90">
              產品代辦清單
            </text>
            <text id="letter1" text-anchor="middle" x="20" y="90">
              短衝
            </text>
            <text id="letter2" text-anchor="middle" x="20" y="90">
              角色
            </text>
          </g>
          <circle
            id="circlePath"
            cx="48"
            cy="200"
            r="150"
            stroke="red"
            fill="none"
          />
        </svg>
      </section>
    </div>
  );
}

export default Home;
