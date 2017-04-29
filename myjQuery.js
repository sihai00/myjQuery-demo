(function(w, d){
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
      
      if (!math) {
        // 匹配：空
        return this;
      }else if(typeof math !== 'string'){
        // 匹配：DOM || 循环嵌套封装对象 || 函数
        if (math['selector']) {
          // 匹配：循环嵌套$$情况，例如：$$($('.a'))
          return math;
        }else if(math instanceof HTMLElement){
          // 匹配：单个DOM
          this[0] = math;
          this.length = 1;
          this.selector = math.tagName.toLowerCase();

          return this;
        }else if(typeof math === 'object'){
          // 匹配：一组DOM
          for (var i = 0; i < math.length; i++) {
            this[i] = math[i];
          }
          this.length = math.length;
          this.selector = math[0].tagName.toLowerCase();

          return this;
        }else if(myjQuery.isFunction(math)){
          // console.log(myjQuery.isFunction(math))
          // 匹配：函数
          this.ready(math)
        }
      }else if(typeof math === 'string'){

        // 匹配：字符串
        math2trim = myjQuery.trim(math);
        // 匹配：id
        if (math2trim.charAt(0) === '#') {
          this[0] = d.getElementById(math2trim.substring(1));
          this.length = 1;
        } else {
        // 匹配：标签 || class
          elements = d.querySelectorAll(math2trim);

          for (var i = 0; i < elements.length; i++) {
            this[i] = elements[i];
          }
          
          this.length = elements.length;
        }
        this.selector = math;
        return this;
      }
    },
    ready: function(fn){
      if (fn && typeof fn === 'function') {
        d.addEventListener('DOMContentLoaded', function(){
          fn();
        })
      }
    },
    // 判断是否有className
    hasClass : function(cls) {
      if (!cls) return;
      // 去空格
      var cls = myjQuery.trim(cls);
      // 节点className排除前后空格
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      for (var i = 0; i < this.length; i++) {
        console.log(reg.test(this[i].className))
        if (!reg.test(this[i].className)) {
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
      var cls = myjQuery.trim(cls);

      for (var i = 0; i < this.length; i++) {
        this[i].classList.add(cls);
      }

      return this;
    },
    // 移除className
    removeClass: function(cls){
      if (!cls) return;
      // 去空格
      var cls = myjQuery.trim(cls);

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
  // 工具方法
  // 是否为函数
  myjQuery.isFunction = function(str){
    return typeof str === 'function';
  }
  // 清除前后空格
  myjQuery.trim = function(str){
    return str.replace(/(^\s*)|(\s*)$/g,'');
  }
  // 转数组
  myjQuery.toArray = function(arr){
    return Array.prototype.slice.call(arr);
  },
  // new myjQuery.prototype.init()后返回的是init构造的对象，它的原型上没有myjQuery.prototype的方法，需手动指定
  myjQuery.prototype.init.prototype = myjQuery.prototype;
  // 把构造函数挂载到window上
  w.myjQuery = w.$$ = myjQuery;
})(window, document)