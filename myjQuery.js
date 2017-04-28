(function(w){
  var myjQuery = function(math){
    // 可以直接调用，无需手动进行new
    return new myjQuery.prototype.init(math);
  }
  // 在prototype上定义的属性和方法都属于动态方法
  myjQuery.prototype = {
    // 修正myjQuery.prototype.constructor的指向错误问题
    constructor: myjQuery,
    // 版本号
    version: 1.0,
    length: 0,
    selector: 'null',
    // 初始化myjQuery,根据传进来的参数获取对应节点
    init: function(math){
      var math2trim = '',
          elements = [];
      // if 空
      if (!math) {
        return this;
      }
      // if $$对象
      if (math[0] instanceof HTMLElement) {
        return math;
      }
      // if DOM元素
      if (math instanceof HTMLElement) {
        this[0] = math;
        this.length = 1;
        this.selector = math.tagName.toLowerCase();
        return this;
      }
      // if 不为空切不为DOM元素
      math2trim = math.trim();
      // if 匹配id
      if (math2trim.charAt(0) === '#') {
        this[0] = document.getElementById(math2trim.substring(1));
        this.length = 1;
      } else {
      // if 不匹配id以外(div、.class)
        elements = document.querySelectorAll(math2trim);

        for (var i = 0; i < elements.length; i++) {
          this[i] = elements[i];
        }
        
        this.length = elements.length;
      }

      this.selector = math;
      return this;
    },
    // 去前后空格
    trim(str){
      return str.replace(/(^\s*)|(\s*)$/g,'');
    },
    // 把DOM节点变为数组
    toArray: function(){
      return Array.prototype.slice.call(this)
    },
    // 判断是否有className
    hasClass : function(cls) {
      if (!cls) return;
      // 去空格
      var cls = this.trim(cls);
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
      // 去空格
      var cls = this.trim(cls);

      for (var i = 0; i < this.length; i++) {
        this[i].classList.add(cls);
      }

      return this;
    },
    // 移除className
    removeClass: function(cls){
      if (!cls) return;
      // 去空格
      var cls = this.trim(cls);

      for (var i = 0; i < this.length; i++) {
        this[i].classList.remove(cls);
      }

      return this;
    },
    // 获取或添加元素样式
    css: function(attr, val){
      if (!attr) return;

      for (var i = 0; i < this.length; i++) {
        if (typeof attr !== 'string' && !val) {
          // 传入对象形式例如：{top:0, left:0}
          for(var ii in attr){
            this[i].style[ii] = attr[ii];
          }
        } else if (typeof attr === 'string' && !val) {
          // 获取元素单个样式
          w.getComputedStyle(this[i])[attr];
        } else {
          // 设置元素单个样式
          this[i].style[attr] = val;
        }
      }
      return this;
    },
    // Object.assign||$.extend功能，扩展对象
    extend: function(obj1, obj2){
      if (Object.assign) {
        return Object.assign(obj1, obj2);
      }else{
        for(var i in obj2){
          if (!obj1[i]) {
            obj1[i] = obj2[i];
          }
        }
        return obj1;
      }
    },
    // 压栈操作，$$parent保存父封装对象（使用end()可返回上一个封装对象）
    pushStack: function(dom){
      return this.extend(myjQuery(dom), {'$$parent': this});
    },
    end: function(){
      return this['$$parent'];
    },
    // 获取上一个兄弟封装对象
    prev: function(){
      return this.pushStack(this[0].previousElementSibling);
    },
    // 获取下一个兄弟封装对象
    next: function(){
      return this.pushStack(this[0].nextElementSibling);
    },
    // 获取父封装对象
    parent: function(){
      return this.pushStack(this[0].parentElement);
    }
  }

  // new myjQuery.prototype.init()后返回的是init构造的对象，它的原型上没有myjQuery.prototype的方法，需手动指定
  myjQuery.prototype.init.prototype = myjQuery.prototype;
  // 把构造函数挂载到window上
  w.myjQuery = w.$$ = myjQuery;
})(window)