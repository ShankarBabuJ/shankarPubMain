import { LightningElement } from 'lwc';

export default class LwcLifeCycleDemo extends LightningElement {

    connectedCallback(){
        console.log('connected callback called', this.template.querySelector('p'));
    }

    renderedCallback(){
        console.log('rendered connected callback called', this.template.querySelector('p'));
        const ptag = this.template.querySelector('p');
        ptag.style.color = 'Red'
        ptag.style.fontSize = '30px'
        ptag.style.textAlign = 'center'
        ptag.style.fontStyle = 'oblique'
        ptag.style.fontWeight = 'bold'
    }

    disconnectedCallback(){
        console.log('disconnected callback called')
    }
}