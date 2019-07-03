/**
 * Created by lidy on 2019/3/14.
 */

const storage = {
  //存储
  set(key, value) {
    if(localStorage){
      localStorage.setItem(key, value);
    }
  },
  //取出数据
  get(key) {
    if(localStorage){
      return localStorage.getItem(key);
    }
    return ''
  },
  // 删除数据
  remove(key) {
    if(localStorage) {
      localStorage.removeItem(key);
    }
  }
}

export default storage;
