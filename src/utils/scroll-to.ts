/**
 * 二次缓入缓出函数
 * @param t 当前时间
 * @param b 初始值
 * @param c 变化量
 * @param d 持续时间
 * @returns 缓动后的值
 */
function easeInOutQuad(t: number, b: number, c: number, d: number): number {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

/**
 * requestAnimationFrame 兼容性封装
 * http://goo.gl/sx5sts
 */
const requestAnimFrame =
  window.requestAnimationFrame ||
  (window as any).webkitRequestAnimationFrame ||
  (window as any).mozRequestAnimationFrame ||
  function (callback: FrameRequestCallback) {
    return window.setTimeout(callback, 1000 / 60);
  };

/**
 * 滚动到指定位置，兼容不同的浏览器
 * @param amount 滚动的位置
 */
function move(amount: number): void {
  document.documentElement.scrollTop = amount;
  (document.body.parentNode as HTMLElement).scrollTop = amount;
  document.body.scrollTop = amount;
}

/**
 * 获取当前滚动位置，兼容不同的浏览器
 * @returns 当前滚动位置
 */
function position(): number {
  return (
    document.documentElement.scrollTop ||
    (document.body.parentNode as HTMLElement).scrollTop ||
    document.body.scrollTop
  );
}

/**
 * 平滑滚动到指定位置
 * @param to 目标位置
 * @param duration 动画持续时间（毫秒），默认为 500
 * @param callback 动画完成后的回调函数
 */
export function scrollTo(to: number, duration?: number, callback?: () => void): void {
  const start = position();
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  duration = duration !== undefined ? duration : 500;

  const animateScroll = function (): void {
    // 增加时间
    currentTime += increment;
    // 使用二次缓入缓出函数计算当前值
    const val = easeInOutQuad(currentTime, start, change, duration);
    // 移动滚动位置
    move(val);
    // 继续动画，直到时间超过持续时间
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof callback === 'function') {
        // 动画完成，调用回调函数
        callback();
      }
    }
  };

  animateScroll();
}
