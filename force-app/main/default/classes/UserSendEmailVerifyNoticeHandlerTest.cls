@isTest
private class UserSendEmailVerifyNoticeHandlerTest {
    @isTest
    public static void testBulkUserSendEmailVerifyNoticeHandler() {
        Test.startTest();
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User' LIMIT 1];
        User newUser = new User( FirstName = 'John', LastName = 'Doe', Email = 'john.doe@example.com', Username = 'johndoe@example.com.test5867676767', Alias = 'jdoe', TimeZoneSidKey = 'America/Los_Angeles', LocaleSidKey = 'en_US', EmailEncodingKey = 'UTF-8', LanguageLocaleKey = 'en_US', ProfileId = p.Id ); 
        insert newUser;
        UserSendEmailVerifyNoticeHandler.sendEmailVerifyNotfication(new List<User> { newUser });
        System.debug('newUser.id'+newUser.id);
        Test.stopTest();
        System.assert(newUser.id != null);
    }
}