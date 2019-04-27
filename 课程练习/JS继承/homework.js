//关系一
function Foo(userName,age){
    this.userName=userName;
    this.age=age;
};
Foo.prototype.sayHello=function(){
    return this.userName+" say hello";
}
var f1=new Foo("zhangsan",20);
/*
    关系一:f1对象的__proto__属性与其构造函数Foo的prototype属性指向相同，
    所以通过Foo实例化得到的对象可以去Foo.prototype上查找方法，例如sayHello方法

*/
console.log(f1.__proto__==Foo.prototype);
console.log(f1.sayHello());

//关系二
function Foo(userName,age){
    this.userName=userName;
    this.age=age;
};
Object.prototype.sayHello=function(){
    return this.userName+" say hello";
};
var f1=new Foo("zhangsan",20);
var f2={userName:"lisi",age:20};
/*
    关系二:f1对象的原型对象(父)的原型对象(爷)和函数Object的原型对象相同，
    因为f1.__proto__=Foo.prototype,所以也可以理解为函数Foo的原型对象(父)
    的原型对象(爷)与Object的原型对象相同
    f1.__proto__.__proto__==Object.prototype
    Foo.prototype.__proto__==Object.prototype

*/
console.log(f1.__proto__.__proto__==Object.prototype);
console.log(Foo.prototype.__proto__==Object.prototype);
/*
    为什么会相等呢？
    我们可以这样理解
    我们知道任何继承自Object,也可以理解为是用Object函数来创建,
    如果一个对象不是用构造函数创建，而是使用字面量的方式创建，比如f2,
    那么f2.__proto__=Object.prototype,也就是说f2的父对象就是Object的函数对象

    而f1是通过Foo这个构造函数创建的，所以f1.__proto__==Foo.prototype,
    f1.__proto__(Foo.prototype)相当于'f2',所以'f2'的父对象是Object的函数对象

*/
console.log(f2.__proto__==Object.prototype);
/*
    我们来验证一下
    添加在Object.prototype上的sayHello函数f1,f2都可以调用到
*/
console.log(f1.sayHello());
console.log(f2.sayHello());

//关系三
var f2={userName:"lisi",age:20};
console.log(f2.__proto__);
console.log(f2.__proto__.__proto__);
console.log(Object.prototype.__proto__);
/*
    关系三:Object.prototype的原型对象是null,因为Object.prototype没有原型
*/

//关系四

//关系五
function Foo(userName,age){
    this.userName=userName;
    this.age=age;
};
Foo.prototype.sayHello=function(){
    return this.userName+" say hello";
}
var f1=new Foo("zhangsan",20);
/*
    先理解一下const
*/
