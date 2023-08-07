var express = require("express");
var router = express.Router();
const { google } = require("googleapis");

router.post("/sheet", async (req, res) => {
  const {
    certificate,
    university,
    name,
    mothername,
    fathername,
    mobile,
    email,
    alternate,
    dob,
    course,
    subcourse,
    enrollment,
    passingyear,
    house,
    city,
    zipcode,
    postoffice,
    country,
  } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "target.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1E0NnuOfCeo3xUFYLesZKMJVIxJ0PbgSjS166wDA0nhE";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A1:R1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          certificate,
          university,
          name,
          mothername,
          fathername,
          mobile,
          email,
          alternate,
          dob,
          course,
          subcourse,
          enrollment,
          passingyear,
          house,
          city,
          zipcode,
          postoffice,
          country,
        ],
      ],
    },
  });

  res.send("Successfully submitted! Thank you!");
});

module.exports = router;
