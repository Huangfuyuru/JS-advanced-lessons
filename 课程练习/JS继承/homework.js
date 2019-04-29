/*写在前面 
一、普通对象与函数对象
    在JS中，万物皆对象，但是也是有区别的，分为普通对象和函数对象,
    (我们也可以把函数对象也可以理解为构造函数),Object、Function是JS自带的函数对象,
    如何来分辨函数对象和普通对象？
    通过new Function()创建的对象都是函数对象，其他是普通对象，
    那么Object\Function因为也是通过new Function创建的，所以也是函数对象
    
二、原型对象
    在JS中，每当定义一个普通对象(函数对象)时候，对象中都会包含一些预定义的属性。
    其中函数对象的一个属性就是原型对象prototype,普通对象的原型对象就是__proto__

    而原型对象[.prototype 或  .__proto__]的实质是普通对象[普通对象有__proto__ constructor],
    (Function.prototype除外，他是函数对象，虽然他是函数对象，
    但他很特殊他没有prototype属性[函数对象都有prototype属性]，
    像Foo.prototype是普通对象)
三、__proto__
    f1.__proto__=Foo.prototype
    第一种理解：f1的原型对象，他继承自Foo.prototype
    第二种理解：指向创建他(f1)的函数对象(Foo)的原型对象prototype 
四、
    __proto__ constructor是普通对象独有的，
    prototype是函数对象独有的，但是函数对象作为普通对象的时候
    拥有__proto__ constructor
五、
    原型链的尽头是Object.prototype 所有对象均从Object.prototype继承属性
    也就是说Object.prototype没有原型对象,Object.prototype.__proto__不存在
    他不能继承自任何对象
*/

//关系一: f1.__proto__==Foo.prototype
function Foo(userName,age){
    this.userName=userName;
    this.age=age;
};
Foo.prototype.sayHello1=function(){
    return this.userName+" say hello1";
}
var f1=new Foo("zhangsan",20);
console.log(f1.__proto__==Foo.prototype);
console.log(f1.sayHello1());
/*
    f1.__proto__指向创建他(f1)的函数对象(Foo)的原型对象prototype,
    (f1继承自Foo.prototype)
    因为sayHello是定义在Foo.prototype上的，所以f1可以继承得到sayHello1函数

*/

//关系二: Foo.prototype.__proto__==Object.prototype
function Foo(userName,age){
    this.userName=userName;
    this.age=age;
};
Object.prototype.sayHello2=function(){
    return this.userName+" say hello2";
};
var f1=new Foo("zhangsan",20);
console.log(Foo.prototype.__proto__==Object.prototype);
console.log(Foo.prototype.sayHello2());
console.log(f1.sayHello2());

/*
    f1继承自Foo.prototype,Foo.prototype是普通对象，
    他的__proto__指向创建他(Foo.prototype他是个对象)
    的函数对象(Object)的prototype
    (Foo.prototype继承自Object.prototype)
    所以当我们在Object.prototype上定义sayHello2函数时，
    Foo.prototype可以调用sayHello,f1也可以调用sayHello2()
*/

//关系三: Object.prototype.__proto__==null
console.log(Object.prototype.__proto__==null)
/*
    Object.prototype(这是个普通对象),他的__proto__指向创建他(Object.prototype)
    的构造函数的prototype,但是并没有一个构造函数是创建了他，所以是null
    也可以把Object.prototype理解为是所有原型的祖宗，到他这里为止，在也没有父代
*/

//关系四: Foo.prototype==Foo.prototype
console.log(Foo.prototype==Foo.prototype);
/*
    每个函数对象生成时自动生成一个prototype
*/

//关系五: Foo.prototype.constructor==Foo
function Foo(userName,age){
    this.userName=userName;
    this.age=age;
};
var f1=new Foo("zhangsan",20);
console.log(Foo.prototype.constructor==Foo);
console.log(f1.__proto__.constructor==Foo);
/*

    函数对象的原型对象prototype中的constructor属性，
    指向他的函数对象(构造函数)
    普通对象的原型对象__proto__中的constructor属性，
    指向引用他的函数对象(构造函数)
   
*/

//关系六： Foo.__proto__==Function.prototype
function Foo(userName,age){
    this.userName=userName;
    this.age=age;
};
Function.prototype.sayHello3=function(){
    return "hello3";
};
console.log(Foo.__proto__==Function.prototype);
console.log(Foo.sayHello3());
/*
    Foo是一个函数对象，他的原型对象是Foo.prototype,
    但同时也可以理解为一个普通对象，Foo.__proto__指向创建他(Foo)的构造
    函数(Function)的原型对象prototype
    (Foo继承自Function.prototype),所以在Function.prototype上定义的sayHello3
    函数，在Foo上也可以调用
*/

//关系七：Function.prototype.__proto__==Object.prototype
Object.prototype.sayHello4=function(){
    return "hello4";
}
console.log(Function.prototype.__proto__==Object.prototype);
console.log(Function.prototype.sayHello4());
console.log(Array instanceof Function);
console.log(Function instanceof Object);
/*
    Function.prototype直接继承Object.prototype,
    所以Function.prototype.__proto__==Object.prototype,
    当在Object.prototype上定义sayHello4函数时，Function.prototype
    也可以调用.

    Function|Object|Array.__proto__继承自Function.prototype
    Function.prototype.__proto__继承自Object.prototype
*/

//关系八: o1.__proto__==Object.prototype
var o1=new Object();
o1.name="zhangsan";
Object.prototype.sayHello5=function(){
    return this.name+" say hello5";
}
console.log(o1.__proto__==Object.prototype);
console.log(o1.sayHello5());
console.log(Object.prototype);
/*
    o1.__proto__指向创建o1的构造函数(Object)的原型对象prototype
    也可以理解为o1继承Object.prototype
    当在Object.prototype上定义sayHello5这个函数的时候，o1也可以调用到
*/

///关系九:Object.prototype==Object.prototype
console.log(Object.prototype==Object.prototype);
/*
    一个构造函数(函数对象)生成时，自动生成一个prototype属性，指向他的原型对象
*/

//关系十:Object.prototype.constructor==Object
console.log(Object.prototype.constructor==Object);
/*
    函数对象的原型对象prototype中的constructor属性，
    指向他的函数对象(构造函数)
    普通对象的原型对象__proto__中的constructor属性，
    指向引用他的函数对象(构造函数)
*/

//关系十一：Object.__proto__==Function.prototype
Function.prototype.sayHello6=function(){
    return "hello6";
};
console.log(Object.sayHello6());
console.log(Object.__proto__==Function.prototype);
/*
    Object是函数对象，是通过new Function()创建的，
    但是我们也可以理解为他是一个普通对象，
    Object.__proto__含义是指向创建他(Object)的构造函数(Function)
    的原型对象prototype(Object继承自Function.prototype)
    所以在Function.prototype上定义的sayHello6()函数,Object可以调用
*/

//关系十二:Function.prototype==Function.prototype
console.log(Function.prototype==Function.prototype);
/*
    每个函数对象生成时自动生成一个原型对象prototype
*/

//关系十三: Function.prototype.constructor==Function
console.log(Function.prototype.constructor==Function);
/*
    函数对象的原型对象prototype中的constructor属性，
    指向他的函数对象(构造函数)
    普通对象的原型对象__proto__中的constructor属性，
    指向引用他的函数对象(构造函数)
*/

//关系十四
console.log(Function.__proto__==Function.prototype);
/*
    关系十四：Function是函数对象，是通过new Function()创建的，
    但是我们也可以理解为他是一个普通对象，
    Function.__proto__含义是指向创建他(Function)的构造函数(Function)
*/

