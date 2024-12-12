import { LightningElement, api, track, wire } from 'lwc';
import { getRecordUi, getRecordCreateDefaults } from 'lightning/uiRecordApi';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';

export default class RecordForm extends LightningElement {
    @api recordId;
    @api recordTypeId;
    @api sObjectName;
    @track error;
 
    recordIdPart1 = '012000000';
    recordIdPart2 = '000000AAA';
    recordIdParts = this.recordIdPart1 + this.recordIdPart2;
    

    @wire(getRecordUi, { recordIds: '$recordId', layoutTypes: 'Full', modes: 'Edit' })
    getEditLayout({ error, data }) {
        if (data) {
            this.error = undefined;
            // Create event to send the record ui
            const getLayoutDetailsEvent = new CustomEvent('getlayoutdetails', {
                detail: { 'recordUI': data },
            });
        
            // Fire the custom event
            this.dispatchEvent(getLayoutDetailsEvent);
        } 
        else 
        if (error) {
            this.error = error;
        }
    }

    @wire(getRecordCreateDefaults, { objectApiName: '$sObjectName', recordTypeId: '$recordTypeId' })
    getCreateLayout({ error, data }) {
        if (data && (this.recordId === undefined)) {
            this.error = undefined;
            
            // Create event to send the record ui
            const getLayoutDetailsEvent = new CustomEvent('getlayoutdetails', {
                detail: { 'recordUI': data },
            });

            // Fire the custom event
            this.dispatchEvent(getLayoutDetailsEvent);
        } 
        else 
        if (error) {
            this.error = error;
        }
    }

    @wire(getPicklistValuesByRecordType, { objectApiName: '$sObjectName', recordTypeId: '$recordIdParts' })
    getPicklistValues({ error, data }) {
        if (data) {
            this.error = undefined;

            const getPicklistValuesEvent = new CustomEvent('getpicklistvalues', {
                detail: { 'picklistFieldValues': data.picklistFieldValues },
            });
            this.dispatchEvent(getPicklistValuesEvent);
        } 
        else 
        if (error) {
            this.error = error;
        }
    }
}