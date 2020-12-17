//jshint esversion:5

//IIEF
//前加分号是为了防止前边的js文件末尾忘记加分号
;(function(global,$){

    //让创建对象时省去new关键字，“new”一个对象
    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }
    
    //把变量封装在IIEF中，外部变量无法访问
    var supportLan = ['en','ch'];

    //日常问候
    var greetings = {
        en: 'Hello',
        ch: '食咗饭未啊'
    };

    //正式问候
    var formalGreetings = {
        en: 'Greeting',
        ch: '你好'
    };

    //登陆信息
    var logMessages = {
        en: 'log in',
        ch: '登陆'
    };

    //方法写进原始属性，节省内存空间
    Greetr.prototype = {

        
        //"this" 指向在执行阶段创建的新对象
        getFullName: function(){
            
            if(this.language === 'en'){
                //英文
                return this.firstName + ' ' + this.lastName;
            }else{
                //中文
                return this.lastName + this.firstName;
            }
        },
        
        validate: function(){
            //检查是不是一个合法语言
            //参考闭包中的外部不可访问的“supportLan”
            if( supportLan.indexOf(this.language) === -1 ){
                throw 'Invalid Language!';
            }
        },
        
        //用[]语法来获取对象的属性
        greeting: function(){
            return greetings[this.language] + ', ' + this.firstName;
        },
        
        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.getFullName();    
        },
        
        //chainable method（可用多个点运算符一起调用方法），返回他们自己的对象
        greet: function(formal){
            var msg;
            
            //如果值为"undefined"或“null”强转型为false
            if(formal){
                msg = this.formalGreeting();
            }else{
                msg = this.greeting();
            }
            
            if(console){
                console.log(msg);
            }
            
            //this指向执行阶段所创建的新对象
            //makes the method chainable
            return this;
        },
        
        
        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': ' + this.getFullName());
            }
            //make chainable
            return this;
        },
        
        setLanguage: function(lan){

            //设置语言
            this.language = lan;

            //检测语言是否合法
            this.validate();

            //chainable method
            return this;
        },

        setName: function(first,last){

            //设置姓名
            this.firstName = first;
            this.lastName = last;

            //chainable method
            return this; 
        },

        greetHTML: function(selector,formal){
            if(!$){
                throw "jQuery not loaded!";
            }

            if(!selector){
                throw "Missing jQuery selector!"
            }

            //声明信息
            var msg;
            if(formal){
                msg = this.formalGreeting();
            }else{
                msg = this.greeting();
            }

            //文档操作给选中内容插入信息
            $(selector).text(msg);

            //chainable
            return this;
        }
        
    }

    //真正的构造函数，允许创建对象是不用写new
    Greetr.init = function(first, last, lan){

        //避免es5的bug,也可以改为直接用es6的let来声明
        var self = this;

        //设置初始值
        self.firstName = first || '';
        self.lastName = last || '';
        self.language = lan || 'en';

        self.validate();

    }

    //从jQuery学到的方法，让我们不必使用new关键字
    Greetr.init.prototype = Greetr.prototype;

    //让我们的Greetr放到全局变量，并用 G$ 来快速创建Greetr
    global.Greetr = global.G$ = Greetr;

}(window,jQuery));