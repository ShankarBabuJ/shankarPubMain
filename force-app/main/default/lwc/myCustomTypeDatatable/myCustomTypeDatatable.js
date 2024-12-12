//myCustomTypeDatatable.js
import LightningDatatable from "lightning/datatable";
import customNameTemplate from "./customName.html";
import customNumberTemplate from "./customNumber.html";
import customCurrencyTemplate from "./customCurrency.html";

export default class MyCustomTypeDatatable extends LightningDatatable {
  static customTypes = {
    customName: {
      template: customNameTemplate,
      standardCellLayout: true,
      typeAttributes: ["accountName"],
    },
    customNumber: {
      template: customNumberTemplate,
      standardCellLayout: false,
      typeAttributes: ["status"],
    },
    customCurrency: {
        template: customCurrencyTemplate,
        standardCellLayout: false,
        typeAttributes: ["currency", "profit"],
    },
    // Other types here
  };
}