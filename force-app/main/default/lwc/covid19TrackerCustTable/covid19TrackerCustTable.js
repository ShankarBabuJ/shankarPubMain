import LightningDatatable from "lightning/datatable";
import customNameTemplate from "./covid19TrackerName.html";
import covid19TotalCasesTemplate from "./covid19TotalCases.html";
import covid19IndianCasesTemplate from "./covid19IndianCases.html";
import covid19ForginCasesTemplate from "./covid19ForginCases.html";
import covid19DeathsTemplate from "./covid19Deaths.html";
import covid19DischargeTemplate from "./covid19Discharge.html";
export default class Covid19TrackerCustTable extends LightningDatatable {
    static customTypes = {
        customName: {
          template: customNameTemplate,
          standardCellLayout: true,
          typeAttributes: ["loc"],
        },
        covid19TotalCases: {
            template: covid19TotalCasesTemplate,
            standardCellLayout: false,
            typeAttributes: ["status"],
        }, 
        covid19TotalIndianCases: {
            template: covid19IndianCasesTemplate,
            standardCellLayout: false
        },
        covid19TotalForginCases: {
            template: covid19ForginCasesTemplate,
            standardCellLayout: false
        },
        covid19Deaths: {
            template: covid19DeathsTemplate,
            standardCellLayout: false
        },
        covid19Discharged: {
            template: covid19DischargeTemplate,
            standardCellLayout: true
        }       
        // Other types here
      };
}