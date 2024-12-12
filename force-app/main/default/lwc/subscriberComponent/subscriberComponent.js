import { LightningElement, wire } from 'lwc';
import ShaChannel from '@salesforce/messageChannel/ShaChannel__c';
import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';

export default class SubscriberComponent extends LightningElement {
    firstName = ''
    lastName = ''
    subscription = null;
    cssClass = '';

    @wire(MessageContext) messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                ShaChannel,
                (parameter) => this.handleParameter(parameter)
            );
        }
    }
    unsubscribeToMessageChannel(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    handleParameter(parameter){
        console.log('parameter --',parameter)
        this.firstName = parameter.firstName;
        this.lastName = parameter.lastName;
        this.cssClass = parameter.color + 'Class';
        console.log('this.cssClass --',this.cssClass)
    }
}