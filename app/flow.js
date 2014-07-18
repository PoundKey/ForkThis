 var viewID = 'ga:88333904';
 var clientID = '23918834101-ih85vv30san2hmuhjhngcipthk5vfbqg.apps.googleusercontent.com';
 var apiKey = 'AIzaSyDAgoKWE19GzanrYGxE6E2uFLw7oS5PosU';
 var scopes = 'https://www.googleapis.com/auth/analytics.readonly';
 var today;
 var week;
 var month;
 
 function trafficCollector(){
	 alert("Page hits for today: " + today + " \nPage hits this week: " + week + "\nPage hits this month: " + month); 
 }
 
 function handleToday(results) {
	 if (!results.error) {
		 today = results.totalsForAllResults['ga:pageviews'];
		 makeApiCallWeek();
	 } else {
		 alert("Error: " + results.message);
		 alert("Code: " + results.code);
	 }
 }
 
 function handleWeek(results) {
	 if (!results.error) {
		 week = results.totalsForAllResults['ga:pageviews'];
		 makeApiCallMonth();
	 } else {
		 alert("Error: " + results.message);
		 alert("Code: " + results.code);
	 }
 }
 
 function handleMonth(results) {
	 if (!results.error) {
		 month = results.totalsForAllResults['ga:pageviews'];
		 trafficCollector();
	 } else {
		 alert("Error: " + results.message);
		 alert("Code: " + results.code);
	 }
 }
 
 function makeApiCallToday() { //this is today
	 date = new Date();
	 var year = date.getUTCFullYear();
	 var month = ("0" + (date.getMonth() + 1)).slice(-2);
	 var day = ("0" + date.getDate()).slice(-2);
	 var today = year + '-' + month + '-' + day;
	 gapi.client.analytics.data.ga.get({
		 'ids': viewID,
		 'start-date': today,
		 'end-date': today,
		 'metrics': 'ga:pageviews',
		 'access_token': gapi.auth.getToken()
	 }).execute(handleToday);
 }
 
 function makeApiCallWeek() {
	 date = new Date();
	 var year = date.getUTCFullYear();
	 var month = ("0" + (date.getMonth() + 1)).slice(-2);
	 var day = date.getDate();
	 var dayOfWeek = date.getDay();
	 var startD;
	 if (day > 6) { //if day of the month is less than 7, subtracting dayOfWeek can create 0 or a negative number
		 day = day - dayOfWeek;
		 day = ("0" + day).slice(-2);
		 startD = year + '-' + month + '-' + day;
	 } else { //day of month is the 6th or less
		 startD = year + '-' + month + '-' + '01';
	 }
	 var endD = year + '-' + month + '-' + ("0" + date.getDate()).slice(-2);
	 gapi.client.analytics.data.ga.get({
		 'ids': viewID,
		 'start-date': startD,
		 'end-date': endD,
		 'metrics': 'ga:pageviews',
		 'access_token': gapi.auth.getToken()
	 }).execute(handleWeek);
 }
 
 function makeApiCallMonth() {
	 date = new Date();
	 var year = date.getUTCFullYear();
	 var month = ("0" + (date.getMonth() + 1)).slice(-2);
	 var day = ("0" + date.getDate()).slice(-2);
	 var endD = year + '-' + month + '-' + day;
	 var startD = year + '-' + month + '-01';
	 gapi.client.analytics.data.ga.get({
		 'ids': viewID,
		 'start-date': startD,
		 'end-date': endD,
		 'metrics': 'ga:pageviews',
		 'access_token': gapi.auth.getToken()
	 }).execute(handleMonth);
 }
 
 function handleAuthClick(event) {
	 gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
	 return false;
}
 
 function handleUnAuthorized() {
	 var authorizeButton = document.getElementById('authorize-button');
	 var makeApiCallButton = document.getElementById('make-api-call-button');

	 makeApiCallButton.style.visibility = 'hidden';
	 authorizeButton.style.visibility = '';
	 authorizeButton.onclick = handleAuthClick;
 }
 
 function handleAuthorized() { //ADDING HERE
	 makeApiCallToday();
 }
 
 function loadAnalyticsClient() {
	 gapi.client.load('analytics', 'v3', handleAuthorized);
 }
 
 function handleAuthResult(authResult) {
	 if(authResult) {
		 loadAnalyticsClient();
	 } else {
		 alert("Unauthorized");
		 handleUnAuthorized();
	 }
 }
 
 function checkAuth() {
	 gapi.auth.authorize({client_id: clientID, scope: scopes, immediate:false}, handleAuthResult);
 }
 
 var handleClientLoad = function() {
 	 gapi.client.setApiKey(apiKey);
 	 window.setTimeout(checkAuth,1);
 	 
  }
	
	
