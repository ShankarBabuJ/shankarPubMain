public class AuthBasicClass {

    //invoke my partenr WSDL class login

//soap class

//partnerSoapSforceCom class

//login(user name and passowrd)

//Using partner WSDL

/*string username = 'shankarbj1998@devorg.com';

string password = 'Shankar@123.J30PxS8i9UwvaVUgHNX3CH7Jp';

partnerSoapSforceCom.soap soapObj = new partnerSoapSforceCom.soap();

partnerSoapSforceCom.LoginResult logRes = soapObj.login(username,password);

system.debug('logRes'+logRes);

//step 2 - sessionHeader objec to pass session id

SoapLeadManager.SessionHeader_element sessionObj = new SoapLeadManager.SessionHeader_element();

sessionObj.sessionId = logRes.sessionId;

//step 3- session obj with soap call

SoapLeadManager.LeadManager leadserveice = new SoapLeadManager.LeadManager();

leadserveice.SessionHeader = sessionObj;

string response = leadserveice.createNewLead('Shankar','Babu J','SBJ Company','1998shankar@gmail.com','+971562836603');

system.debug('response'+response);
Using connected app


String consumerKey = '3MVG95mg0lk4batjFesyuXRSxBhzfTNp2sTgQF_EmimyHLlhmg6NA8F_sUu.mn2D9jK7xFrNMnoUsI6E3w6dQ';
String consumerSecret = '097AA4172BE777AB874A13916D375DDB5CFCB82A4E779077940F584EF58786B8';
String userName = 'shankarbj1998@devorg.com';
String password = 'Shankar@123.J30PxS8i9UwvaVUgHNX3CH7Jp';
String authTokenEndPoint = 'https://login.salesforce.com/services/oauth2/token';

Http http = new HTTP();
HttpRequest httpR = new HttpRequest();
//hreq.setEndpoint('https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG95jctIhbyCpqKBhfhUgQITLOUF_gUjKgwoNaaVY0VMiyiW6dznmPci7ADZKiH5VSXG79Xowl.XS9zXlfC&client_secret=1D65EC27D47699AA7F5A36A707EA988D2298202D0B6DB72965BA721312FF433D&username=debasis@server.com&password=Bunu@1234ddvDVSKSBgF2fzQHNYz1CL5J');
httpR.setEndpoint(authTokenEndPoint+'?grant_type=password&client_id='+consumerKey+'&client_secret='+consumerSecret+'&username='+userName+'&password='+password);
httpR.setMethod('POST');
Blob headerValue = Blob.valueOf(userName+':'+password);
string authorizationValue = 'BASIC' + EncodingUtil.base64Encode(headervalue);
httpR.setHeader('Authorization', authorizationValue);
HttpResponse hresp =  http.send(httpR);
system.debug('hresp'+hresp.getBody()); 

JSONParser parser = JSON.createParser(hresp.getBody());
String aToken = '';
String instanceURL = '';
while(parser.nextToken() != null){
    if(parser.getCurrentToken() == JSONToken.FIELD_NAME && parser.getText() == 'access_token'){
        parser.nextToken();
        aToken = parser.getText();
    }
     if(parser.getCurrentToken() == JSONToken.FIELD_NAME && parser.getText() == 'instance_url'){
        parser.nextToken();
        instanceURL = parser.getText();
    }
}
System.debug('aToken --'+aToken);
System.debug('instanceURL --'+instanceURL);

SoapLeadManager.SessionHeader_element sessionObj = new SoapLeadManager.SessionHeader_element();
sessionObj.sessionId = aToken;

SoapLeadManager.LeadManager leadManger = new SoapLeadManager.LeadManager();
leadManger.endpoint_x = instanceURL + '/services/Soap/class/LeadManager';
leadManger.SessionHeader = sessionObj;
string response = leadManger.createNewLead('Sri','Lekha','SL Company','1997Srilekha@gmail.com','+971562836603');
system.debug('response'+response);*/
}