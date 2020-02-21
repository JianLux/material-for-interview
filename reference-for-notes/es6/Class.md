# Class

标签（空格分隔）： ES6

---

## 简介
`class` 可以看作只是一个语法糖, 它的绝大部分功能, `ES5` 都可以做到, 新的 `class` 写法只是让对象原型的写法更加清晰, 更像面向对象编程的语法而已.
```JavaScript
// ES5
function Point (x, y) {
    this.x = x
    this.y = y
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2)

//ES6 定义类
class Point {
    constructot(x, y) {
        this.x = x;
        this.y = y;
    }
    
    toString() {
        return '(' + this.x + ', ' + this.y + ')' 
    }
}
```

注意定义 "类" 的方法时, 前面不需要加上 `function` 这个关键字, 直接把函数定义放进去就可以了,方法直接也不需要逗号分隔, 加了会报错.

```JavaScript
class Point {
    // ...
}

typeof Point     // 'function'
Point === Point.prototype.constructor   // true
var p = new Point()
```
类的数据类型就是函数, 类本身就指向构造函数, 使用的时候, 直接对类使用 `new` 命令

构造函数的 `prototype` 属性, 在`ES6`的"类"上面继续存在. 事实上, 类的所有方法都定义在类的 `prototype` 属性上面
```javaScript
class Point {
    constructor () {
        // ...
    }
    
    toString() {
        //...
    }
}

// 等同于

Point.prototype = {
    construcot() {},
    toString() {},
    toValue() {}
}
```
在类的实例上面调用方法, 其实就是调用原型上的方法
```JavaScript
class B {}
let b = new B();
b.constructor === B.prototype.constructor   //true
```

`prototype` 对象的 `constructor` 属性, 直接指向"类"的本身, 这与ES5的行为是一致的
```
Point.prototype.constructot === Point   //true
```
___

##　严格模式

类和模块的内部，默认就是严格模式

___

## constructot 方法

`constructor` 方法是类的默认方法, 通过 `new` 命令生成对象实例时, 自动调用该方法. 一个类必须有 `constructor` 方法, 如果没有显示定义, 一个空的 `constructor` 方法会被默认添加.

类必须使用 `new` 调用, 否则会报错.

___
## Class 表达式
```
const Myclass = class Me {
    getClassName() {
        return Me.name;
    }
}

let inst = new MyClass()
inst.getClassName()         //Me
Me.name                     //ReferenceError
```
需要注意的是, 这个类的名字是 `MyClass` 而不是 `Me`, `Me` 只在 Class 的内部代码使用, 指代当前类.

采用 `Class` 表达式, 可以写出立即执行的 `Class`
```
let person = new class {
    constructor(name) {
        this.name = name
    }
    
    sayName() {
        console.log(this.name);
    }
}('张三')

person.sayName()
```
___

## 类不存在变量提升
```
new Foo()                 // ReferenceError
class Foo{}
```
```
    let Foo = class {};
    class Bar extends Foo {}
```
上面的代码不会报错, 但是如果存在 `class` 的提升, 上面的代码就会报错, 因为 `class` 会被提升到代码头部, 而 `let` 命令是不提升的, 所以导致 `Bar` 继承 `Foo` 的时候, `Foo`还没有定义

## Class 的取值函数 (getter) 和存值函数 (setter)

与 `ES5` 一样, 在 "类" 的内部可以使用 `get` 和 `set` 关键字, 对某个属性设置存值函数和取值函数, 拦截该属性的存取行为
```JavaScript
class MyClass {
    constructot() {//...}
    
    get prop() {
        return 'getter'
    }
    set prop (value) {
        console.log('setter: ' + value);
    }
}

let inst = new MyClass ();

inst.prop = 123    // setter: 123
inst.prop          // 'getter'
```
___

## Class 的静态方法
如果在一个方法前, 加上 `static` 关键字, 就表示该方法不会被实例继承, 而是直接通过类来调用, 这就称为"静态方法"
```JavaScript
class Foo {
    static classMethod() {
        return 'hello';
    }
}

Foo.classMeethod()     // 'hello'

var foo = new Foo ();
foo.classMethod()     //TypeError
```
父类的静态方法, 可以被子类继承

## Class 的静态属性和实例属性
静态属性指的是 `Class`  本身的属性, 即 `Class.proName`, 而不是定义在实例对象 (`this`) 上的属性.
```
class Foo {}

Foo.prop = 1
Foo.prop      // 1
```
```
// 以下两种写法都无效

class Foo {
    // 写法一
    prop: 2
    
    // 写法二
    static prop: 2
}

Foo.prop        // undefined
```