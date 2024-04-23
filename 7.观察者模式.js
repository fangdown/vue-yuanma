/**
 * 相比发布订阅少了一个层级，之间对应摸个事件的处理
 * 注册： 直接把回调函数加入数组
 * 执行： 遍历数组，执行回调
 * 取消： 过滤掉某个callback
 */
class Observed {
  constructor() {
    this.listener = [];
  }
  subscribe(callback) {
    this.listener.push(callback);
  }
  notify(message) {
    this.listener.forEach((callback) => {
      callback(message);
    });
  }
  unsubscribe(callback) {
    this.listener = this.listener.filter((item) => item !== callback);
  }
}
let observer = new Observed();
let functionOne = (arg) => {
  console.log("我是观察者1号", arg);
};
let functionTwo = (arg) => {
  console.log("我是观察者2号", arg);
};
// 注册观察者
observer.subscribe(functionOne);
observer.subscribe(functionTwo);
//模拟被观察者状态改变，调用notify函数
observer.notify("第一次");
observer.unsubscribe(functionOne);
observer.notify("第二次");
