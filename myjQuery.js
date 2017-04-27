(function(w){

  var myjQuery = function(selector){
    // 可以直接调用，无需手动进行new
    return new myjQuery.prototype.init(selector);
  }
  // 在prototype上定义的属性和方法都属于动态方法
  myjQuery.prototype = {
    // 修正myjQuery.prototype.constructor的指向错误问题
    constructor: myjQuery,
    // 版本号
    version: 1.0,
    length: 0,
    selector: '',
    splice: [].splice,
    // 初始化myjQuery
    init: function(selector){
      // 根据传进来的参数获取对应节点
      if (!selector) {
        return this
      }
      // 去空格
      var selector = selector.replace(/(^\s*)|(\s*$)/g, ''),
          elements = [];
      // 选择器为id
      if (selector.charAt(0) === '#') {
        this[0] = document.getElementById(selector.substring(1));
        this.length = 1;
      } else {
      // 选择器为id以外
        elements = document.querySelectorAll(selector);

        for (var i = 0; i < elements.length; i++) {
          this[i] = elements[i];
        }
        
        this.length = elements.length;
      }

      this.selector = selector;
      return this;
    },
    // 把DOM节点变为数组
    toArray: function(){
      return Array.prototype.slice.call(this)
    },
    // 判断是否有className
    hasClass : function(cls) {
      if (!cls) return;
      // 去空格
      var cls = cls.replace(/(^\s*)|(\s*)$/g,'');
      // 节点className排除前后空格
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      for(var v of this.toArray(this)){
        if (!reg.test(v.className)) {
          return false;
          break;
        }
      }
      return true;
    },
    // 添加className
    addClass: function(cls){
      if (!cls) return;
      var cls = cls.replace(/(^\s*)|(\s*)$/g,'');

      for (var i = 0; i < this.length; i++) {
        this[i].classList.add(cls);
      }

      return this;
    },
    // 移除className
    removeClass: function(cls){
      if (!cls) return;
      var cls = cls.replace(/(^\s*)|(\s*)$/g,'');

      for (var i = 0; i < this.length; i++) {
        this[i].classList.remove(cls);
      }

      return this;
    }
  }

  // new myjQuery.prototype.init()后返回的是init构造的对象，它的原型上没有myjQuery.prototype的方法，需手动指定
  myjQuery.prototype.init.prototype = myjQuery.prototype;
  // 把构造函数挂载到window上
  w.myjQuery = w.$$ = myjQuery;
})(window)