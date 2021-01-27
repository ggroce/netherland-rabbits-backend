const { GoogleSpreadsheet } = require('google-spreadsheet');

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACC_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const handleInventoryGet = (req, res) => {

  (async function () {
    await initGoogleAuth();
    const returnedSheetInfo = await loadSheetInfo();
    await loadCellInfo(returnedSheetInfo);
    res.json(doc.title);
  }());
}

async function initGoogleAuth() {
  console.log('trying init goog auth');

  try {
    await doc.useServiceAccountAuth({
      client_email: SERVICE_ACC_EMAIL,
      private_key: PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
  } catch(err) {
    console.log('initGoogleAuth messed up!!!', err);
  }
  
}

async function loadSheetInfo() {
  try {
    console.log('trying to load sheet information...');
    await doc.loadInfo();
    console.log('Document title:', doc.title);
    const sheet = doc.sheetsById[SHEET_ID];
    console.log('Number of reported rows:', sheet.rowCount);
    return sheet;
  } catch(err) {
    console.log('loadSheetInfo messed up!!!', err);
  }
}

async function loadCellInfo(sheet) {
  try {
    await sheet.loadCells('A2:M50');
    console.log('cell stats:', sheet.cellStats);
  } catch(err) {
    console.log('loadCellInfo messed up!!!', err);
  }
}

module.exports = {
  handleInventoryGet: handleInventoryGet
}