public with sharing class YouTubeAPIController {
    private static String searchURL = 'https://www.googleapis.com/youtube/v3/search';
    @AuraEnabled
    public static Map<String,Object> getYouTubeVideos(String searchKey) {
        Http http = new Http();
        Map<String,Object> results;
        HttpRequest request = new HttpRequest();
        searchKey = (searchKey == '' ? 'Salesforce' : searchKey);
        String endPoint = searchURL+'?part=snippet&maxResults=90&type=video&q='+EncodingUtil.urlEncode(searchKey, 'UTF-8')+'&key='+YoutubeAPIKey__c.getInstance('YoutubeKey').Key__c;
        request.setEndpoint(endPoint);
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Accept', 'application/json');
        HttpResponse response = http.send(request);
        system.debug('response '+response.getBody());
        System.debug('response status '+response.getStatusCode());
        results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
        return results;
    }
}