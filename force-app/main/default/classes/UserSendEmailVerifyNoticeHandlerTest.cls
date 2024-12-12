@isTest
private class UserSendEmailVerifyNoticeHandlerTest {

    @isTest
    public static void testBulkUserSendEmailVerifyNoticeHandler() {
        List<User> testUserList = [SELECT Id, Email, Username FROM User WHERE Username IN ('1998shankarbabu@gmail.com')];
        Test.startTest();
        update testUserList;
        Test.stopTest();
        System.assert(testUserList[0].id != null);
    }
}