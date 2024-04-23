/**
 * Object.defineProperty + 观察者模式
 * 定义观察者对象
 * 定义全局对象map，
 * 对象进行响应式，对属性key 改写get set方法, 初始化dep， 每个属性都有一个观察者模式
 * 将订阅者加入数组 即将update 更新方法加入到 观察者模式 key对应的数组中，触发读把callback加入到数组中，全局变量
 * 通过变更值来触发callback执行
 */
class Dep {
  constructor() {
    this.subs = [];
    this.target = null;
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i]();
    }
  }

  //将回调函数保存
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
    }
  }
}

const map = new Map();
function getDep(target, key) {
  let depsMap = map.get(target);
  if (!depsMap) {
    depsMap = new Map();
    map.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

function addUpdate(update) {
  Dep.target = update;
  update();
  Dep.target = null;
}

function defineReactive(obj, key, val) {
  observe(val);
  const dep = getDep(obj, key);
  console.log('dep', dep)
  Object.defineProperty(obj, key, {
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal != val) {
        val = newVal;
        dep.notify();
      }
    },
  });
  return obj;
}

function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

const codereasy = { age: 18, money: 99999 };
observe(codereasy);

// 触发get
const functionOne = function () {
  console.log("年龄", codereasy.age);
};

const functionTwo = function () {
  console.log("工资", codereasy.money);
};

addUpdate(functionOne);

addUpdate(functionTwo);

codereasy.age++;
console.log(map)