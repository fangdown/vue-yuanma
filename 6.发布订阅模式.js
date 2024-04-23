/**
 * 事件中心对象，
 * 注册：根据事件类型加入数组
 * 执行：根据事件类型把对应数组中的回调函数执行
 * 取消： 删除事件key
 */
class Event {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    this.events[event] = callback;
  }
  emit(event, arg) {
    this.events[event](arg);
  }
  off(event, arg) {
    delete this.events[event];
  }
}

let EventInstance = new Event();

// 订阅事件
EventInstance.on("eventName", (arg) => {
  console.log(arg);
});

// 发布事件
EventInstance.emit("eventName", "arguments"); //输出：message

// 取消订阅
EventInstance.off("eventName");
