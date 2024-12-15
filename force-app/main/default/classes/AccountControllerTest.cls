@isTest
public with sharing class AccountControllerTest {
    @isTest
    public static void AccountControllerTest() {
        Account accountNew = new Account();
        accountNew.Name = 'Test Account';
        accountNew.Type = 'VIP';
        insert accountNew;
        Case caseNew = new Case();
        caseNew.Status = 'Working';
        caseNew.Origin = 'Phone';
        caseNew.IsEscalated = true;
        caseNew.Priority = 'High';
        caseNew.Subject = 'HELPP';
        caseNew.AccountId = accountNew.Id;
        insert caseNew;
        Test.startTest();
        AccountController.handleAccountUpdate(accountNew.Id);
        AccountController.getAccountList();
        Test.stopTest();
    }
}