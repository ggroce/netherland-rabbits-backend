const { GoogleSpreadsheet } = require('google-spreadsheet');

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACC_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

// const spreadSheetData = {
//   rows: [{}]
// }

const handleInventoryGet = (req, res) => {
  (async function () {
    await initGoogleAuth();
    const mySheet = await loadSheetInfo();
    const spreadSheetData = await populateSpreadSheetData(mySheet);
    res.json(spreadSheetData);
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
    const sheet = doc.sheetsById[SHEET_ID];
    return sheet;
  } catch(err) {
    console.log('loadSheetInfo messed up!!!', err);
  }
}

async function populateSpreadSheetData(mySheet) {
  try {
    const rows = await mySheet.getRows();
    const rowCount = rows[0].rowcount;
    await mySheet.loadCells('B1:B50');
    const spreadSheetArray = rows.map((row) => {
      // console.log('row?', row);
      const imageCell = mySheet.getCellByA1(`B${row._rowNumber}`);
      // console.log('Row number: ', row._rowNumber - 1);
      // console.log('image data? ', imageCell.formula);
      // console.log('formula maybe? ', row.image.valueType)
      const record = {
        name: row.name, 
        image: imageCell.formula, 
        type: row.type, 
        DOB: row.DOB, 
        status: row.status, 
        awards: row.awards, 
        sex: row.sex,
      }
      return record;
    });
    
    console.log('row datas: ', spreadSheetArray);
    console.log('rowCount: ', rowCount);
    return spreadSheetArray;
  } catch(err) {
    console.log('populateSpreadSheetData messed up!!!', err);
  }
}

//currently unused /////////////////////////////////////////////////////
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