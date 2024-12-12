public with sharing class AccountController {
    public Account handleAccountUpdate(Id accountId) {
        Account acc = new Account(Id = accountId, CustomerPriority__c = 'High');
        try{
            Update acc;
        }catch(Exception ex){
            System.debug('Error '+ ex.getMessage());
        }
        Update_Case_On_Account_Update__e uconac = new Update_Case_On_Account_Update__e(Account_Id__c = acc.id);
        Database.SaveResult saveResult = EventBus.publish(uconac);
        if(saveResult.isSuccess()){
            System.debug('Success event published ');
        }else{
            System.debug('Failed event not published ' + saveResult.getErrors());
        }
        return acc;
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, AnnualRevenue, Industry, NumberOfEmployees FROM Account WITH SECURITY_ENFORCED LIMIT 50];
    }
}