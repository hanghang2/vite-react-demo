import { makeAutoObservable } from 'mobx';

class Test {
    number = 0;
    constructor() {
        makeAutoObservable(this);
    }
    add() {
        this.number += 1;
    }
    sub() {
        this.number -= 1;
    }
}

export default new Test();
