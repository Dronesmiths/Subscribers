/**
 * Google Apps Script Bridge for Subscribers Engine
 * 
 * Instructions:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code.
 * 4. Deploy > New Deployment > Web App.
 * 5. Set "Who has access" to "Anyone".
 * 6. Copy the Web App URL and paste it into your engine configuration.
 */

function doPost(e) {
  try {
    var params = e.parameter;
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Source']);
    }
    
    sheet.appendRow([
      new Date(),
      params.name || 'N/A',
      params.email || 'N/A',
      params.source || 'Website'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Subscriber added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Subscribers Engine Script is active.").setMimeType(ContentService.MimeType.TEXT);
}
