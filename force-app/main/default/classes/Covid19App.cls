public with sharing class Covid19App {
    public class Covid19AppException extends Exception{}
    @AuraEnabled
    public static CovidData getCovidData(){
        CovidData result;
        try {
            Http http = new Http();
            HttpRequest httpReq = new HttpRequest();
            httpReq.setMethod('GET');
            httpReq.setEndpoint('https://api.rootnet.in/covid19-in/stats/latest');
            HttpResponse httpRes =  http.send(httpReq);
            result = CovidData.parse(httpRes.getBody());  
        } catch (Exception e) {
            throw new Covid19AppException(e.getMessage());
        }    
        return result;   
    }
}