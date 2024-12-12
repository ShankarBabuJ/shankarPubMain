import { LightningElement } from 'lwc';

export default class ChildLwcHooks extends LightningElement {
    constructor(){
        super()
        console.log('child Constructor is called', this.template.querySelector('p'));
    }

    connectedCallback(){
        console.log('child connected callback is called', this.template.querySelector('p'));
    }

    renderedCallback(){
        console.log('child rendered callback  is called', this.template.querySelector('p'));
        const ptag = this.template.querySelector('p');
        ptag.style.color = 'Blue'
        ptag.style.fontSize = '30px'
        ptag.style.textAlign = 'center'
        ptag.style.fontStyle = 'oblique'
        ptag.style.fontWeight = 'bold'
    }

    disconnectedCallback(){
        console.log('child disconnected callback  is called', this.template.querySelector('p'));
    }

    errorCallback(error, stack) {
        console.log('child error callback  is called', this.template.querySelector('p'));
    }
}