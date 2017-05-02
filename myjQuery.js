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
        if (myjQuery.isType(attr, 'string')) {
          if (!val) {
            console.log(w.getComputedStyle(this[i])[attr])
            return w.getComputedStyle(this[i])[attr];
          }
          this[i].style[attr] = val;
        }else{
          var _this = this[i];
          // 传入对象形式例如：{top:0, left:0}
          myjQuery.each(attr, function(v, i){
            _this.style.cssText += `${i}:${v};`;
          })
        }
      }
      return this;
    },
    // 压栈操作，$$parent保存父封装对象（使用end()可返回上一个封装对象）
    pushStack: function(dom){
      return myjQuery.extend(myjQuery(dom), {'$$parent': this});
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
    },
    // 遍历：调用工具方法myjQuery.each
    each: function(fn){
      myjQuery.each(this, fn);
    },
    // 寻找匹配math封装对象
    find: function(math){
      if (!math) return;
      return this.pushStack(math);
    },
    // 寻找当前集合下的第一个子封装对象
    first: function(){
      return myjQuery(this[0]);
    },
    // 寻找当前集合下的第number个子封装对象
    eq: function(number){
      console.log(this.length)
      if (typeof number === undefined || number > this.length - 1) return this;
      var number = number < 0 ? (this.length + number) : number;
      return myjQuery(this[number]);
    },
    // 寻找当前集合下的最后一个子封装对象
    last: function(){
      return myjQuery(this[this.length - 1  ]);
    },
    // 同eq：寻找当前集合下的第number个子封装对象
    get: function(number){
      return this.eq(number);
    },
    // 获取或设置属性
    attr: function(attr, val){
      var _this = null;
      if (!attr) return;
      for (var i = 0; i < this.length; i++) {
        if (myjQuery.isType(attr, 'String')) {
          if (!val) {
            return this[i].getAttribute(attr);
          }
          this[i].setAttribute(attr, val);
        }else{
          _this = this[i];
          myjQuery.each(attr, function(v, i){
            _this.setAttribute(i, v);
          })
        }
      }
      return this;
    },
    // 获取或设置数据
    data: function(attr, val){
      var _this = null;
      if (!attr) return;
      for (var i = 0; i < this.length; i++) {
        if (myjQuery.isType(attr, 'String')) {
          if (!val) {
            return this[i].dataset[attr];
          }
          this[i].dataset[attr] = val;
        }else{
          _this = this[i];
          myjQuery.each(attr, function(v, i){
            _this.dataset[i] = v;
          })
        }
      }
      return this;
    },
    // 改变当前对象内容
    html: function(val){
      if (!val) {
        return this[0].textContent;
      }else{
        for (var i = 0; i < this.length; i++) {
          this[i].textContent = val;
        }
      }
    },
    // 添加子内容
    append: function(val){
      for (var i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML('afterbegin', val);
      }
      return this;
    },
    // 在当前对象前添加内容
    before: function(val){
      for (var i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML('beforebegin', val);
      }
      return this;
    },
    // 在当前对象后添加内容
    after: function(val){
      for (var i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML('afterend', val);
      }
      return this;
    },
    // 删除当前对象
    remove: function(){
      for (var i = 0; i < this.length; i++) {
        this[i].parentNode.removeChild(this[i]);
      }
    },
    delegate: function(selector, type, fn){
      this[0].addEventListener(type, function(e){
        target = e.target;
        if (selector.toLowerCase() && selector === e.nodeName.toLowerCase()) {
          fn(target);
        }
      })
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
  }
  // 遍历
  myjQuery.each = function(obj, fn){
    if (!obj) return;
    var i = 0;
    if (typeof obj === 'object' && !obj['selector']) {
      // 匹配：普通对象 || 数组 
      for(i in obj){
        fn.call(obj[i], obj[i], i);
      }
    }else{
      for(;i < obj.length; i++){
        fn.call(obj[i], myjQuery(obj[i]), i);
      }
    }
  }
  // Object.assign||$.extend功能，扩展对象，浅拷贝
  myjQuery.extend = function(obj1, obj2){
    if (Object.assign) {
      return Object.assign(obj1, obj2);
    }else{
      for(var i in obj2){
        obj1[i] = obj2[i];
      }
      return obj1;
    }
  }
  // ajax
  myjQuery.ajax = function(option){
    if (!option.url) return;
    // GET参数
    var query = '',
        arr = [],
        defaultOption = {
          url: '',
          type: 'GET',
          data: '',
          success: '',
          error: '',
          complete: ''
        };
    myjQuery.extend(defaultOption, option);
    // 格式化参数
    if (defaultOption.data) {
      for(var i in defaultOption.data){
        arr.push(i + '=' + defaultOption.data[i])
      }
      query = arr.join('&&')
    }

    if (defaultOption.type === 'GET') {
      defaultOption.url =defaultOption.url + '?' + query;
    }

    var xml = new XMLHttpRequest();
    xml.open(defaultOption.type, defaultOption.url);
    xml.onreadystatechange = function(){
      if (xml.readyState == 4) {
        if (this.status >= 200 && this.status < 400) {
          defaultOption.success && defaultOption.success(JSON.parse(xml.responseText));
        }else{
          defaultOption.error && defaultOption.error(xml.responseText);
        }
      }
    }

    if (defaultOption.type === 'POST') {
      xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    xml.send(query);
    defaultOption.complete && defaultOption.complete();
  }
  // 判断数据类型
  myjQuery.isType = function(val, type){
    if (!val && !type) {
      console.log('判断类型或判断值不能为空');
      return;
    };
    var type = type.charAt(0).toUpperCase() + type.substring(1).toLowerCase();
    return Object.prototype.toString.call(val).slice(8, -1) === type;
  }
  // new myjQuery.prototype.init()后返回的是init构造的对象，它的原型上没有myjQuery.prototype的方法，需手动指定
  myjQuery.prototype.init.prototype = myjQuery.prototype;
  // 把构造函数挂载到window上
  w.myjQuery = w.$$ = myjQuery;
})(window, document)