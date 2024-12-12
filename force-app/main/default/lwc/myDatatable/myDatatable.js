/* myDatatable.js */
import { LightningElement, wire, track, api } from "lwc";
import getAccountList from "@salesforce/apex/AccountController.getAccountList";
import { getRecord } from "lightning/uiRecordApi";

const COLS = [
  {
    label: "Account Name",
    type: "customName",
    typeAttributes: {
      accountName: { fieldName: "Name" },
    },
  },
  {
    label: "Industry",
    fieldName: "Industry",
    cellAttributes: {
      class: { fieldName: "industryColor" },
    },
  },
  {
    label: "Account Revenue",
    fieldName: "AnnualRevenue",
    type: "customCurrency",
    typeAttributes: {
        currency: {fieldName: "currency"},
        profit: {fieldName: "profit"}
    },
    cellAttributes: {
      class: { fieldName: "currencySuccess" },
    },
  },
  { label: 'Employees', type: 'customNumber', fieldName: 'NumberOfEmployees',
  typeAttributes: {
         status: {fieldName: 'status'},
    },
    cellAttributes: {
        class: 'slds-theme_alert-texture'
    }
  },
];
const fieldNames = ['Account.Id', 'Account.Name', 'Account.AnnualRevenue', 'Account.Industry', 'Account.NumberOfEmployees'];

export default class MyDatatable extends LightningElement {
  columns = COLS;
  @track accounts = [];
  @api recordId;

  @wire(getAccountList)
  wiredAccounts({ error, data }) {
    if (error) {
      console.log('getAccounts error', error);
    } else if (data) {
      this.accounts = data.map((record) => {
        let industryColor = record.Industry === "Energy" ? "slds-text-color_success" : "slds-text-color_error";
        let status = record.NumberOfEmployees > 10000 ? "utility:ribbon" : "";
        let currencySuccess = (record.AnnualRevenue > 50000000 ? "slds-text-color_success" : "slds-text-color_error");
        let profit = (record.AnnualRevenue > 50000000 ? "utility:arrowup" : "utility:arrowdown");
        let currency = record.AnnualRevenue > 50000000 ? "utility:moneybag" : "utility:money";
        return { ...record, industryColor: industryColor, status: status, currencySuccess: currencySuccess, profit: profit, currency: currency};
      });
    }
  }
  @wire(getRecord, { recordId: '0015h00001UhJroAAF', fields: fieldNames })
    wiredRecord({ error, data }) {
      if (data) {
        console.log('wiredRecord data',data);
      } else if (error) {
        console.log('wiredRecord error',error);
      }
    }
  getSelectedRows(event){
    const selectedRows = JSON.parse(JSON.stringify(event.detail.selectedRows));
    console.log('selectedRows size - ',selectedRows.length)
    selectedRows.forEach(element => {
        console.log('element industryColor',element.industryColor)
        console.log('element Industry',element.Industry)
        console.log('element Id',element.Id)
        console.log('element status',element.status)
    });
  }
}