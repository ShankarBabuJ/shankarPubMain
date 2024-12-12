public with sharing class WeatherAPI {
    public class WeatherAPIException extends Exception{}
    @AuraEnabled
    public static Map<String,Object> getCurrentWeather(Map<String,Object> params){
        Map<String,Object> results;
        Weather_Report_Log__c wlog = new Weather_Report_Log__c();
        wlog.Latitude__c = params.get('latitude') != '' ? Decimal.valueOf((String)params.get('latitude')) : null;
        wlog.Longitude__c = params.get('longitude') != '' ? Decimal.valueOf((String)params.get('longitude')) : null;
        try {
            System.debug('params --'+params);          
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('callout:weather_end_point/data/2.5/weather?lat='+params.get('latitude')+'&lon='+params.get('longitude')+'&appid=7007040c3202b0fddfa99a7763e90e71');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
        
            // If the request is successful, parse the JSON response.
            wlog.Response_Code__c = (Integer)response.getStatusCode();
            wlog.Response_Message__c = response.getBody().toString();
            System.debug('response.getStatusCode() --'+response.getStatusCode() + ' - wlog - ' + wlog);
          
            if(response.getStatusCode() == 200) {
                results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
                System.debug('results '+results);
                /*List<Object> weatherList = (List<Object>)results.get('weather');
                System.debug('weatherList '+weatherList);
                for(Object obj : weatherList){
                    String weatherSerialized = JSON.serialize(obj);
                    Map<String,Object> valsByProperty = (Map<String,Object>) JSON.deserializeUntyped(weatherSerialized);
                    System.debug('description --'+valsByProperty.get('description'));
                    System.debug('main --'+valsByProperty.get('main'));
                    System.debug('icon --'+valsByProperty.get('icon'));
                }*/
            }else{
                wlog.Response_Code__c = (Integer)response.getStatusCode();
                wlog.Response_Message__c = 'Failed with status code ' + response.getStatusCode() + ' With '+ response.getBody().toString();
            }
        } catch (Exception e) {
            throw new WeatherAPIException(e.getMessage());
        }
        insert wlog;
        return results;
    }
}