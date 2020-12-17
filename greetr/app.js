//用Greetr框架创建一个新对象，不用使用new关键字
var g = Greetr("John","Doe");
console.log(g);

//用chainable方法
g.log().greet().setLanguage('ch').setName('德华','刘').greet(true);

//为登录按钮创建鼠标对象
$("#login").click(function(){
    //创建新的Greetr对象
    var loginGret = G$("朝伟","梁");

    //隐藏语言选择界面
    $("logindiv").hide();

    //把jQuery选择器选中的语言传入到我们的Greetr对象方法中设置语言，并在控制台打印登陆信息，并修改HTML中选中的内容
    loginGret.setLanguage($("#language").val()).log().greetHTML("#greeting");
});