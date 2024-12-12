import { LightningElement, wire } from 'lwc';
import { MessageContext, publish} from 'lightning/messageService';
import ShaChannel from '@salesforce/messageChannel/ShaChannel__c';


export default class PublisherComponent extends LightningElement {
    firstName = '';
    lastName = '';
    color = 'Red';
    @wire(MessageContext) messageContext;

    get colorOptions() {
        return [
            { label: 'Red', value: 'Red' },
            { label: 'Blue', value: 'Blue' },
            { label: 'Green', value: 'Green' }
        ];
    }

    handleFirstNameChange(event){
        this.firstName = event.target.value;
    }
    handleLastNameChange(event){
        this.lastName = event.target.value;
    }
    handleColorChange(event){
        this.color = event.target.value;
    }
    handleSubmit(event){
        const payload = { firstName: this.firstName, lastName: this.lastName, color: this.color};
        publish(this.messageContext, ShaChannel, payload);
    }
}