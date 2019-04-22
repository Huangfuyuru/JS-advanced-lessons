/* 
    不管哪种场景下调用，this指向的都是调用此函数的主体
*/
//一般函数中的this
function thisTest(){
    console.log(this);//window
}
thisTest();
//其实是window.thisTest(); 是window调用的

function thisTest2(){
    'use strict';
    console.log(this);//undefined
    return this===undefined?true:false;
}
thisTest2();//严格模式下是undefined

//对象方法中的this（无嵌套的情况下）
//(函数或者方法的内部this指向，取决于该函数的调用主体)
var point={
    x:0,
    y:0,
    moveTo:function(x,y){
        this.x=x;
        this.y=y;
    }
};
point.moveTo(1,1);//this绑定到当前对象，即point对象
console.log(point);

//构造函数中的this

function Bp(x,y){
    this.x=x;
    this.y=y;
    this.moveTo=function(){
        this.x=x+1;
        this.y=y+1;
    }
}
var p=new Bp(2,3);
console.log(p);
p.moveTo();//虽然是新建了对象，但是新建对象中的函数没有执行
console.log(p);
console.log(p); 

//间接调用中的this(call apply)
var objA={name:"AA",x:1};
var objB={name:"BB",x:5};
function test(){
    console.log(this.name,this.x);
}
objA.fun=test;
objA.fun();
//函数也是对象，函数对象
//函数对象的构造函数 Function
// 函数对象.__proto__=Function.prototype

//方法.call(函数调用主体对象)
objA.fun.call(objB);

var animal={
    weight:"",
    name:"animal",
};
var dog={
    height:"30cm",
    name:"lily"
};
animal.breath=function(){
    console.log(this.name+" can breath");
}
animal.breath.apply(dog,['jack']);


//对象方法中的this(有函数嵌套的情况下)
var point={
    x:0,
    y:0,
    moveTo:function(x,y){
        function moveToX(x){
            //这时候的this不指向point,而是指向window
            this.x=x;
        };
        moveToX(x);
    }
};
point.moveTo(10,10);
console.log(point);//x,y竟然没有改变!!!!
console.log(window.x);

//解决办法 方法一 软绑定
var point={
    x:0,
    y:0,
    moveTo:function(x,y){
        var that=this;//this无法穿透，将this转存一下
        function moveToX(x){
            //这时候的that指向了point
            that.x=x;
        };
        moveToX(x);
        function moveToY(y){
            that.y=y;
        }
        moveToY(y);
    }
};
point.moveTo(10,10);
console.log(point);//x,y改变

//方法二  call
var point={
    x:0,
    y:0,
    moveTo:function(x,y){
        function moveToX(x){
            this.x=x;
        };
       
        function moveToY(y){
            this.y=y;
        }
        //切换函数或方法的调用主体并且将方法执行
        moveToX.call(point,x);
        moveToY.call(point,y);
    }
};
point.moveTo(10,10);
console.log(point);//x,y改变

//方法三  硬绑定 
var point={
    x:0,
    y:0,
    moveTo:function(x,y){
        function moveToX(x){
            this.x=x;
        };
       
        function moveToY(y){
            this.y=y;
        }
        //bind和call的区别是不会直接执行,所以要赋值给一个变量，在执行
        var fn=moveToX.bind(point,x);//bind意思是我直接要改变this的指向
        var fn1=moveToY.bind(point,y);
        fn();fn1();
    }
};
point.moveTo(10,10);
console.log(point);//x,y改变