import { LightningElement } from 'lwc';

export default class ParentLWCHooks extends LightningElement {

    constructor(){
        super()
        console.log('parent Constructor is called', this.template.querySelector('p'));
    }

    connectedCallback(){
        console.log('parent connected callback is called', this.template.querySelector('p'));
    }

    renderedCallback(){
        console.log('parent rendered callback  is called', this.template.querySelector('p'));
        const ptag = this.template.querySelector('p');
        ptag.style.color = 'orange'
        ptag.style.fontSize = '30px'
        ptag.style.textAlign = 'center'
        ptag.style.fontStyle = 'oblique'
        ptag.style.fontWeight = 'bold'
    }

    disconnectedCallback(){
        console.log('parent disconnected callback  is called', this.template.querySelector('p'));
    }

    errorCallback(error, stack) {
        console.log('parent error callback  is called', this.template.querySelector('p'));
    }
}