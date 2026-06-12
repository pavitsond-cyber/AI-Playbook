const SHEET_ID         = '1fRWukFYEmpWQ9FpDoq40XwPhktqQ42tVSdkgJjO2BGo';
const PARENT_FOLDER_ID = '1cqKRnAU46sJuW-d5Kbe-2O17sjgI7Uul';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Debug: log what arrived
    Logger.log('name: ' + data.name);
    Logger.log('files count: ' + (data.files ? data.files.length : 0));

    // 1. Create per-submission Drive folder  →  "Ada Lovelace – 2026-06-12"
    const date   = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const label  = (data.name || 'Unknown').replace(/[\/\\:*?"<>|]/g, '');
    const folder = DriveApp.getFolderById(PARENT_FOLDER_ID)
                           .createFolder(label + ' – ' + date);

    // 2. Upload each base64-encoded file — log errors per file, don't abort
    for (const f of (data.files || [])) {
      try {
        const bytes = Utilities.base64Decode(f.data);
        const blob  = Utilities.newBlob(bytes, f.mimeType || 'application/octet-stream', f.name);
        folder.createFile(blob);
        Logger.log('Uploaded: ' + f.name);
      } catch (fileErr) {
        Logger.log('Failed to upload ' + f.name + ': ' + fileErr.message);
      }
    }

    // 3. Append row — Timestamp | Name | Email | Category | Description | Drive Link
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sheet.appendRow([
      new Date(),
      data.name        || '',
      data.email       || '',
      data.category    || '',
      data.description || '',
      folder.getUrl(),
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('doPost error: ' + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run once to set up Sheet headers
function setupSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  sheet.getRange(1, 1, 1, 6).setValues([[
    'Timestamp', 'Name', 'Email', 'Category', 'Description', 'Drive Link',
  ]]);
  sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  sheet.setFrozenRows(1);
  SpreadsheetApp.flush();
  Logger.log('Sheet headers created.');
}
