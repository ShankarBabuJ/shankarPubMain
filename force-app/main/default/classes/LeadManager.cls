global class LeadManager {
    webservice static String createNewLead(String leadFirstName, String leadLastName, String leadCompanyName, String leadEmail, String leadPhone){
            try{
            Lead lead = new Lead();
            lead.FirstName = leadFirstName;
            lead.LastName = leadLastName;
            lead.Company = leadCompanyName;
            lead.Email = leadEmail;
            lead.Phone = leadPhone;
            insert lead;
            return lead.Id;
        }catch(Exception ex){
            return 'Error occured during processing';
        } 
    } 
}