import './1.html';

class Parent {
  constructor() {
    console.log('Parent constructor');
    this.name = 'john';
  }
}

class A extends Parent {
  constructor() {
    console.log('Child constructor');
    super();
  }

  static propTypes = 1;
  static method(obj) {
    console.log('method', obj);
  }

  foo() {
    console.log('foo', this.name);
  }
}

const a = new A();
a.foo();
A.method('haha');


