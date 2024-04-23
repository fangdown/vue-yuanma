function createApp(root) {
  return {
    mount(selector) {
      let isMounted = false;
      let oldVnode = null;
    //  响应式属性
      observe(root.data);

      addUpdate(function () {
        console.log('update')
        if (!isMounted) {
          oldVnode = root.render();
          mount(oldVnode, selector);
          isMounted = true;
        } else {
          const newVNode = root.render();
          console.log('newVNode',newVNode)
          console.log('oldVnode',oldVnode)
          patch(oldVnode, newVNode);
          oldVnode = newVNode;
          console.log('----oldVnode',oldVnode)
        }
      });
    },
  };
}
