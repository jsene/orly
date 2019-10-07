
/////////////////////////////// Fonctions liées à JSON
function logResult(result) {
  debugConsoleLog(result);
}
function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}
function readResponseAsJSONP(response) {
  return response.jsonp();
}
function readResponseAsText(response) {
  return response.text();
}
function readResponseAsBlob(response) {
  return response.blob();
}

 // USAGE : 
/*
function fetchJSON(url) {
  debugConsoleLog("Fetching " + url );
  fetch(url) // 1
    .then(validateResponse) // 2
    .then(readResponseAsText) // 3
    .then(logResult) // 4
    .catch(logError);
}
*/
