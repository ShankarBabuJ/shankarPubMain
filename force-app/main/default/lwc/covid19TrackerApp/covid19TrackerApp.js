import { LightningElement, wire } from 'lwc';
import getCovidData from '@salesforce/apex/Covid19App.getCovidData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const COLS = [
    {
      label: "Location",
      type: "customName",
      typeAttributes: {
        loc: { fieldName: "loc" },
      },
    },
    { label: 'Total Confirmed Cases', type: 'covid19TotalCases', fieldName: 'totalConfirmed',
    typeAttributes: {
            status: {fieldName: 'status'},
        },
        cellAttributes: {
            class: 'slds-theme_alert-texture'
        }
    },
    { label: 'Total Confirmed Indian Cases', type: 'covid19TotalIndianCases', fieldName: 'confirmedCasesIndian'},
    { label: 'Total Confirmed Forgin Cases', type: 'covid19TotalForginCases', fieldName: 'confirmedCasesForeign'},
    { label: 'Total Deaths', type: 'covid19Deaths', fieldName: 'deaths'},
    { label: 'Total Discharged', type: 'covid19Discharged', fieldName: 'discharged'}
  ];

export default class Covid19TrackerApp extends LightningElement {
    data = [];
    unofficial_summary = {};
    columns = COLS;
    // columns = [
    //     { label: 'Location', fieldName: 'loc', type: 'text', cellAttributes: { alignment: 'left' }},
    //     { label: 'Confirmed Cases Foreign', fieldName: 'confirmedCasesForeign', type: 'number', cellAttributes: { alignment: 'left' } },
    //     { label: 'Confirmed Cases Indian', fieldName: 'confirmedCasesIndian', type: 'number', cellAttributes: { alignment: 'left' } },
    //     { label: 'Deaths', fieldName: 'deaths', type: 'number', cellAttributes: { alignment: 'left' }},
    //     { label: 'Discharged', fieldName: 'discharged', type: 'number', cellAttributes: { alignment: 'left' } }
    // ];
    connectedCallback(){
        getCovidData().then((result) => {
            console.log('Result = ', result);
            console.log('Result regional= ', result.data.regional);
             this.data = result.data.regional.map((record) => {
                // let industryColor = record.Industry === "Energy" ? "slds-text-color_success" : "slds-text-color_error";
                let status = record.totalConfirmed > 50000 ? "custom:custom86" : "custom:custom94";
                // let currencySuccess = (record.AnnualRevenue > 50000000 ? "slds-text-color_success" : "slds-text-color_error");
                // let profit = (record.AnnualRevenue > 50000000 ? "utility:arrowup" : "utility:arrowdown");
                // let currency = record.AnnualRevenue > 50000000 ? "utility:moneybag" : "utility:money";
                return { ...record, status: status};
              });
            this.unofficial_summary = result.data.unofficial_summary[0];
        }).catch((error) => {
            this.dispatchMessage('Error',error.body.message,'error')
        });
    }
    dispatchMessage(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        }));
    }
}