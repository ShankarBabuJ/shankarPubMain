public class RefactorTest {
	// refactor the methods below to improve performance and readability
	public static final String VIP = 'VIP';
	public static final String SYSTEM_ADMINISTRATOR = 'System Administrator';
	public static void restrictChangeOwner(List<Case> lstNewCases, Map<Id,Case> mapOldCases) {
		Map<Id,List<Case>> AccToCasesList = new Map<Id,List<Case>>();
		Set<Id> CaseOwnerSet = new Set<Id>();
        Map<Id, User> vipUsersMap = new Map<Id, User>();
		for (Case cs : lstNewCases) {
            if(AccToCasesList.containsKey(cs.AccountId) && !AccToCasesList.get(cs.AccountId).isEmpty()){
                AccToCasesList.get(cs.AccountId).add(cs);
            }else{
                AccToCasesList.put(cs.AccountId, new List<Case> {cs});
            }
			CaseOwnerSet.add(cs.OwnerId);
		}
        if(!CaseOwnerSet.isEmpty()){
            vipUsersMap = hasVIPAccess(CaseOwnerSet);
        }
		for (Account acc : [Select Id from Account where Id = :AccToCasesList.keySet() and Type =: VIP]) {
            if(AccToCasesList.containsKey(acc.Id) && !AccToCasesList.get(acc.Id).IsEmpty()){
                for (Case cs: AccToCasesList.get(acc.Id)) {
                    if (cs.OwnerID.getSobjectType() == User.SobjectType && cs.OwnerId != mapOldCases.get(cs.Id).OwnerId) {
                        if (!vipUsersMap.containsKey(cs.OwnerId)) {
                            cs.addError('This Case owner does not have VIP access');
                        } 
                    }
            	}
            }
		}
	}
	// only Sys Admins have VIP access
	public static Map<Id, User> hasVIPAccess(Set<Id> userIds) {
		Map<Id, User> resultLst = null;
		if (!userIds.IsEmpty()) {
			resultLst = new Map<Id, User>([SELECT Id, Profile.Name FROM User WHERE Id In :userIds and Profile.Name = :SYSTEM_ADMINISTRATOR]);
		}
        return resultLst;
	}
}