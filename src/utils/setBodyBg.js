/**
 * Created by lidy on 2019/3/15.
 */
export const setBodyBg = (value='blue-bg') => {
  document.getElementsByTagName("body")[0].className=value;
}

export const removeBodyBg = (value='blue-bg') => {
  document.body.classList.remove(value);
}

export const setBodyStyleBg = value => {
  document.getElementsByTagName("body")[0].style.backgroundColor=value;
}
export const removeBodyStyleBg = value => {
  document.getElementsByTagName("body")[0].style.backgroundColor='';
}
