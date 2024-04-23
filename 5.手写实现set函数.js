/**
 * 新增属性无法响应式 ，可以用set进行响应式
 * 数组变化无法响应式，可以用set进行响应式
 */
//新增属性无法拦截
let obj = {
  name: "aaaa",
  age: 99,
  job: {
    company: "Byte Dance",
    experience: "100",
  },
};

function defineReactive(obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal != val) {
        console.log("set", newVal);
        val = newVal;
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || !obj) return;
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

observe(obj);

obj.newProp = "我是新的属性";

// 新增属性添加响应式
function set(obj, key, val) {
  defineReactive(obj, key, val);
}

observe(obj);
set(obj, "newProp", "我是新的属性");
obj.newProp;
obj.newProp = "我是新的属性111";
