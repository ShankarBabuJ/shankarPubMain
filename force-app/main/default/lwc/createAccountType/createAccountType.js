import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class createAccount extends LightningElement {
    accountId;
    @api recordId;
    handleSuccess(event) {
        this.accountId = event.detail.id;
        this.showToastMessage('Success', 'Record has been updated Successfully', 'success');
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