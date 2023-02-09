import { useEffect } from 'react';
import { useRef } from 'react';

export function useOnClear(reset) {
  const canvasRef = useRef(null);
  const isClearRef = useRef(false);

  function setCanvasRef(ref) {
    if (!ref) return;
    console.log('useonClear');
    canvasRef.current = ref;
    console.log('ref', ref.target);
    initClearListener();
  }
  return setCanvasRef;

  //    抓取滑鼠移動軌跡
  function initClearListener() {
    const mouseDownListener = (e) => {
      console.log('mouseDownListener', mouseDownListener);
      // console.log({ x: e.clientX, y: e.clientY });
      //重新定位canvas座標（利用 e.clientX, e.clientY）
      if (isClearRef.current) {
        const point = computeCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current.getContext('2d');

        if (reset) reset(ctx, point);
      }
      isClearRef.current = true;
    };
    window.addEventListener('mousedown', mouseDownListener);
  }

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
}
