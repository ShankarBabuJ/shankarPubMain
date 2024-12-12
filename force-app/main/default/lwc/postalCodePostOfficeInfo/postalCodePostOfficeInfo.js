import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPostalCodeDetails from '@salesforce/apex/PostalCodeAPIController.getPostalCodeDetails';

export default class PostalCodePostOfficeInfo extends LightningElement {
    showSpinner = false;
    showDetails = false;
    deliveryStatus = '';
    inputParameters = {
        postalArea: '',
        postalCode: ''
    }
    columns = [        
        {label: 'Name', fieldName: 'Name'},
        {label: 'BranchType', fieldName: 'BranchType'},
        {label: 'Country', fieldName: 'Country'},
        {label: 'Delivery Status', fieldName: 'DeliveryStatus'},
        {label: 'District', fieldName: 'District'},
        {label: 'Division', fieldName: 'Division'},
        {label: 'Pincode', fieldName: 'Pincode'},
        {label: 'Region', fieldName: 'Region'},
        {label: 'State', fieldName: 'State'}
    ]

    postOfficeData = [];
    
    handleValuesChanged(event){
        this.inputParameters[event.target.name] = event.target.value;
    }
    handlePostalCodeDetails(event){
        if((this.inputParameters.postalCode != '' && this.inputParameters.postalArea != '') || 
        (this.inputParameters.postalCode == '' && this.inputParameters.postalArea == '')){
            this.showToastMessage('Error','Please search either by Postal Code or Postal Area','error')
            return false;
        }
        this.showSpinner = true;
        getPostalCodeDetails({inputParams: JSON.stringify(this.inputParameters)}).then((result)=>{
            var response = JSON.parse(result);
            console.log('response ' , response)
            this.postOfficeData = [];
            if(response[0].Status){
                this.postOfficeData = response[0].PostOffice;
            }
            this.showSpinner = false;
        }).catch((error)=>{            
            this.showSpinner = false;
            this.showToastMessage('Error',error.body.message,'error');           
       })
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