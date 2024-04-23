function h(sel, attrs, children) {
    return {
      sel,
      attrs,
      children,
    };
  }
   
  function mount(vnode, container) {
    if (typeof container === "string") {
      container = document.querySelector(container);
    }
   
    const el = (vnode.el = document.createElement(vnode.sel));
   
    if (vnode.attrs) {
      for (const key in vnode.attrs) {
        if (key.startsWith("on") && typeof vnode.attrs[key] === "function") {
          const eventType = key.slice(2).toLowerCase();
          el.addEventListener(eventType, vnode.attrs[key]);
        } else {
          el.setAttribute(key, vnode.attrs[key]);
        }
      }
    }
   
    if (typeof vnode.children === "string") {
      el.innerText = vnode.children;
    } else if (vnode.children && vnode.children.length > 0) {
      vnode.children.forEach((childVNode) => {
        mount(childVNode, el);
      });
    }
   
    container.appendChild(el);
  }