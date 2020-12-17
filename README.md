# jQuery源码分析

> 看完了Udemy上的课程[JavaScript: Understanding the Weird Part](https://www.udemy.com/course/understand-javascript/)，写一下关于jQuery部分的笔记

>jQuery的版本为 `v3.5.1`
## IIEF(立即调用函数表达式）

```javascript
( function( global, factory ) {
	
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
});

```
外部环境无法访问内部的变量与函数，但内部却可以通过范围链访问到外部变量。`IIFE`可以防止函数内的代码与其他函数库冲突或污染全局变量。

```javascript
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}
```
把`jQuery`函数名放在全局环境中，并且可以通过`$`快速调用。

## CommonJS环境下的使用

```javascript
( function( global, factory ) {
	//strict mode 严格模式
	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		//对于CommonJS或CommonJS-like的环境
    //如果存在，则执行factory函数,并获取jQuery
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				//调用传入的函数参数
				return factory( w );
			};
	} else {
		factory( global );
	}

//调用函数表达式，前为三元式子决定当前全域变量window是否存在，后为传入新的执行环境
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) { });
```

## 无new构造
```javascript
//这里可以看到，jQuery不是一个构造函数，而是返回一个新对象，避免每次运用“$”都要用new关键字创建对象
var jQuery = function( selector, context ) {

		return new jQuery.fn.init( selector, context );
    
};

//两个对象名，指向同一内存空间
//为new后的新对象的原型对象增加属性和方法，让新对象要用时可以通过原型链使用
//把方法写进原型对象的好处是减少运行内存空间
jQuery.fn = jQuery.prototype = {
    //...
};

//init才是真正的构造函数
var init = jQuery.fn.init = function( selector, context, root ) {
		//... 
    
    //这里很特殊，函数构造体本应该返回一个对象，他先调用一个方法，把新对象存在数组里，再返回该对象
		return jQuery.makeArray( selector, this );
    
    //...
};

//让新创建的对象指向的原型对象与jQuery的原型对象一样
init.prototype = jQuery.fn;
```

