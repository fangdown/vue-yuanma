function patch(oldVnode, newVNode) {
  if (oldVnode.sel !== newVNode.sel) {
    const container = oldVnode.parentNode;
    removeAllChildren(container);
    mount(newVNode, container);
  } else {
    // 更新属性
    const el = oldVnode.el;
    const newAttrs = newVNode.attrs || {};
    const oldAttrs = oldVnode.attrs || {};
    for (let key in oldAttrs) {
      if (key.startsWith("on") && typeof oldAttrs[key] === "function") {
        const eventType = key.slice(2).toLocaleLowerCase();
        el.removeEventListener(eventType, oldAttrs[key]);
      } else {
        el.removeAttribute(key);
      }
    }
    for (let key in newAttrs) {
        if (key.startsWith("on") && typeof oldAttrs[key] === "function") {
          const eventType = key.slice(2).toLocaleLowerCase();
          el.addEventListener(eventType, newAttrs[key]);
        } else {
          el.setAttribute(key, newAttrs[key]);
        }
      }
    // 更新元素
    if (typeof newVNode.children === "string") {
      oldVnode.el.innerHTML = newVNode.children;
      newVNode.el = oldVnode.el;
    } else if (typeof oldVnode.children === "string") {
      oldVnode.el.innerHTML = "";
      newVNode.children.map((item) => mount(item, oldVnode.el));
    } else {
      const oldLenth = oldVnode.children.length;
      const newLenth = newVNode.children.length;
      const el = oldVnode.el;
      const minLen = Math.min(oldLenth, newLenth);
      for (let i = 0; i < minLen; i++) {
        patch(oldVnode.children[i], newVNode.children[i]);
      }
      if (newLenth > oldLenth) {
        for (let i = oldLenth; i < newLenth; i++) {
          mount(newVNode.children[i], el);
        }
      } else if (newLenth < oldLenth) {
        for (let i = newLenth; i < oldLenth; i++) {
          el.removeChild(oldVnode.children[i].el);
        }
      }
    }
  }
}
function removeAllChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
