# myjQuery-demo
手写jQuery(不考虑兼容性)，未完待续\

$$实例对象上的方法：
- [x] $$.fn.init(selector)：初始化$$封装对象(自定义$$为调用函数名)
- [x] $$.fn.toArray()：dom转数组
- [x] $$.fn.hasClass()：判断是否含类名
- [x] $$.fn.addClass()：添加类名
- [x] $$.fn.removeClass()：移除类名
- [x] $$.fn.css()：查询或添加css属性
- [x] $$.fn.trim()：去除前后空格
- [x] $$.fn.extend()：对象属性扩展（像Object.assign）
- [x] $$.fn.pushStack()：压栈（把当前$$对象存为$$parent，返回操作后$$对象）
- [x] $$.fn.end()：出栈（返回$$parent）
- [x] $$.fn.next()：获得下一个兄弟节点$$对象
- [x] $$.fn.prev()：获得上一个兄弟节点$$对象
- [x] $$.fn.parent()：获得父节点$$对象
- [x] $$.fn.each()：遍历$$对象
- [x] $$.fn.find()：寻找匹配math$$对象
- [x] $$.fn.first()：寻找当前集合下的第一个子$$对象
- [x] $$.fn.eq()：寻找当前集合下的第number个子$$对象
- [x] $$.fn.last()：寻找当前集合下的最后一个子$$对象
- [x] $$.fn.get()：同eq()
- [x] $$.fn.attr()：获取或设置属性
- [x] $$.fn.data()：获取或设置数据
- [x] $$.fn.html()：改变当前对象内容
- [x] $$.fn.append()：添加子内容
- [x] $$.fn.before()：在当前对象前添加内容
- [x] $$.fn.after()：在当前对象后添加内容
- [x] $$.fn.remove()：删除当前对象

$$原型上的工具方法：
- [x] myjQuery.isFunction(str)：判断是否为数组
- [x] myjQuery.trim(str)：清除前后空格
- [x] myjQuery.toArray(obj)：转数组
- [x] myjQuery.each(obj,fn)：遍历，执行函数
- [x] myjQuery.extend(obj1, obj2)：Object.assign||$.extend功能，扩展对象，浅拷贝
- [x] myjQuery.ajax(option)：异步请求
- [x] myjQuery.isType(val, type)：判断类型
