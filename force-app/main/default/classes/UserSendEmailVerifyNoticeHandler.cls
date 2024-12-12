public with sharing class UserSendEmailVerifyNoticeHandler {
    public static void sendEmailVerifyNotfication(List<User> userList){
        for(User user : userList){
            System.UserManagement.sendAsyncEmailConfirmation(user.Id, null, null, null);
        }
    }
}