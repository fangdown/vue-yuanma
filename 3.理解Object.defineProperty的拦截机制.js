let obj = {};
let _name = "";
Object.defineProperty(obj, "name", {
  get() {
    console.log("get", "name");
    return _name;
  },
  set(val) {
    console.log("set", val);
    _name = val;
  },
});
obj.name; // 访问属性会触发get
obj.name = "codereasy"; // 设置属性会触发set