public class AccountCSVGenerator {
    public static Id generateCSV() {
        // Query Account records
        List<Account> accounts = [SELECT Id, Name, Type, AnnualRevenue, CleanStatus, AccountNumber, CreatedDate FROM Account LIMIT 100];

        // Define CSV headers
        String csvHeader = 'Id,Name,Type,AccountNumber,AnnualRevenue,CleanStatus,CreatedDate\n';
        String csvBody = '';

        // Loop through Account records and build CSV body
        for (Account acc : accounts) {
            csvBody += acc.Id + ',' + acc.Name.escapeCsv() + ',' + acc.Type + ',' + acc.AccountNumber + ',' + acc.AnnualRevenue + ',' + acc.CleanStatus + ',' +  acc.CreatedDate.format('yyyy-MM-dd') + '\n';
        }

        // Combine header and body
        String csvContent = csvHeader + csvBody;

        // Create a ContentVersion record to store the CSV file in Salesforce
        ContentVersion csvFile = new ContentVersion();
        csvFile.Title = 'AccountRecords.csv';
        csvFile.PathOnClient = 'AccountRecords.csv';
        csvFile.VersionData = Blob.valueOf(csvContent);
        csvFile.IsMajorVersion = true;
        insert csvFile;
        system.debug('CSV ID '+csvFile.Id);
        return csvFile.Id;        
    }
}