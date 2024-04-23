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

console.log(map)