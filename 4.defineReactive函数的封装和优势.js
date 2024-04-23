let obj = {
  name: "aaaa",
  age: 99,
  job: {
    company: "Byte Dance",
    experience: "100",
  },
};

function defineReactive(obj, key, val) {
  // 惰性加载， 比如 一个对象有很多嵌套属性， 只有它的父级被放到的时候才会把子属性进行响应式
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

obj.job.company;
obj.job.company = "新公司";
