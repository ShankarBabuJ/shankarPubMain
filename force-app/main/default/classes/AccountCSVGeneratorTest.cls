@isTest
public with sharing class AccountCSVGeneratorTest {
    @isTest
    public static void AccountCSVGeneratorTest() {
        Account accountNew = new Account();
        accountNew.Name = 'Test Account';
        accountNew.Type = 'VIP';
        insert accountNew;
        AccountCSVGenerator.generateCSV();
    }
}