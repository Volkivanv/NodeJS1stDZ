const fs = require("fs");
function saveJSON(filePath, jsonData){
  const jsonString = JSON.stringify(jsonData, null, 2);
  try {
    fs.writeFileSync(filePath, jsonString);
    console.log("JSON data saved to file successfully.");
  } catch (error) {
    console.error("Error writing JSON data to file:", error);
  }
};

module.exports = {saveJSON};