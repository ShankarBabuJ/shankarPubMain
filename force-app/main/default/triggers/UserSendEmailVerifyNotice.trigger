trigger UserSendEmailVerifyNotice on User (before update, after insert) {
    if((Trigger.isBefore && Trigger.isUpdate) || (Trigger.isAfter && Trigger.isInsert)){
        UserSendEmailVerifyNoticeHandler.sendEmailVerifyNotfication(Trigger.new);
    }
}