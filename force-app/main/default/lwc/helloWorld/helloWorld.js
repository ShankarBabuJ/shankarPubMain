import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    subtitle = 'By Shankar';
    contantMessage1 = 'Title sponsor1'
    contantMessage2 = 'Title sponsor2'
    num = 10;
    num2 = 20;
    get sum() {
        return this.num + this.num2;
    }
}