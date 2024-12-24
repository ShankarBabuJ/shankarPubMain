import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import successMessage from '@salesforce/label/c.Dev_Record_has_been_updated_Successfully';

export default class createAccount extends LightningElement {
    accountId;
    @api recordId;
    handleSuccess(event) {
        this.accountId = event.detail.id;
        this.showToastMessage('Success', successMessage, 'success');
        console.log('this.accountId',this.accountId);
    }
    showToastMessage(title, message, varient){
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: varient
            })
       );
    }
}