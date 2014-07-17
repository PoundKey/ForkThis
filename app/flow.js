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
	
	// ubc restaurant data explicit definition
	
var ubc_restaurants = {
   "locations":[
      {
         "rating":3.8999999999999999,
         "name":"One More Sushi",
         "reference":"CnRwAAAAPHeMTa2ziYVeiTMnKYp1uMFk_ArX5zT7HXHaHoK3ZTKhLqFcsGYZefuOBk5expbgGPut2X41p2ALKaAOEUTDL6JnSL7P8uEKXfWnqZ02qIJC7_Ck7DyyXA3GmrmKM3LqOK37uuad7IFYCeZJhaS58hIQyXyuTZs4fQ0tGr1ynCqGbRoUcXz5BWPHpUQaCl6f8EAivwdKjN0",
         "geometry":{
            "location":{
               "lat":49.266334000000001,
               "lng":-123.24223499999999
            }
         },
         "vicinity":"2155 Allison Rd, Vancouver",
         "id":"72e5f2932001cbc76c0eebfc463609e28e754de0",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "rating":2.7999999999999998,
         "name":"Mahony & Sons Public House - UBC",
         "reference":"CpQBgwAAAJ-kWn4R6Yx7mV1W3mPjx2KLBGnxbBxGbPD2tLW3pfhziBCzijw394X05QwdiJoaE-i3H8o7m-9IA7zK_K_0yux-qI7pz5tCjM1ep8s0C5tXVwePrXxpdoW9Mrg8gVgtMiQmwLE78IR1dHe3Sbla4a4AaL3-oqngQoH6PzqhdNhQztt8nSAVhBolzCezUJPuNxIQaE2Iwa3gZf4HegsE8lwwRxoUZX1PVt4RmPZ0DSb-Oe4wSYbLNhY",
         "geometry":{
            "location":{
               "lat":49.265954999999998,
               "lng":-123.246759
            }
         },
         "vicinity":"5990 University Blvd, Vancouver",
         "photos":[
            {
               "photo_reference":"CnRnAAAAMuDJMOTbto2wVFQUJ3YqbGmwWLpIfBE5PZMH0XbUipNkddQb19wDJLxgUw70hYjKQAaDn0tgLyrpVXVA4RkabtaAu_sQVw9VsRetDLzSZ1V0H3IkUhXeV4BDJv0N8sd33LVqNrN8TSskWlMRsdZuoRIQTwFVtV04XO9tWAVpWBeC8BoUzpoC4TQrl_AB8-Uw66cq0JZkcsQ",
               "width":489,
               "html_attributions":[

               ],
               "height":452
            }
         ],
         "id":"6eec32ea89136d44ac45af07319d8dd3113565ab",
         "types":[
            "bar",
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png"
      },
      {
         "rating":3.6000000000000001,
         "name":"Vera's Burger Shack",
         "reference":"CoQBdgAAALnoLnTcEWAfg0eGBpNxmWnUNdLizCVwpirLObaL6fwpZe9c7ENHpx2dh1-dokw30xegF1XF6hyetKEDaWPUJqilWdA6cIvdxETFaTfjJT9hZFDQ-_9cy1OeK6gmYqc44Zx96NLwfy2_l7aSe6Bz8EPtbIah1nCNJnQDF8sixuCzEhCzSvER8mYEWpIt4oaa8Yv-GhSvbkpl14riFZaepCeOWy8pyjMvTQ",
         "geometry":{
            "location":{
               "lat":49.265765999999999,
               "lng":-123.243246
            }
         },
         "vicinity":"2188 Western Pkwy, Vancouver",
         "photos":[
            {
               "photo_reference":"CnRnAAAAsjWgqc-pfVM0Qe3cgOxtEZpglwBwDQBqJ_RVOCqhjC5ac72ht3t5fKTlpR80Y6Lt1ojpnvuJ13yTESWotwVp6lJVGXDgNRUZkjpJg0rxDDRHP4K44-9YegZSYBZx-QHGWUdMAOeGvqpHF8fsKtbrIxIQVNcwrd022T1-AyrSA88voRoU_-VUjh1qyMxa1Q2jokNhMW7lAbw",
               "width":160,
               "html_attributions":[

               ],
               "height":181
            }
         ],
         "id":"e62cceabef1fe7ca6f7e08a37b2c3744ad776da7",
         "types":[
            "bar",
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png"
      },
      {
         "name":"Sage Bistro",
         "reference":"CnRtAAAA_IhWr47zTkb1_OY78FY5M0mr5-iX9UXYGinC2xaL0Zda5OhRIzJWn_v2gfXBAoigVjz7nhfATTIKqiP32j1xdltTTwy6fVnJ_jpzyI_vJBIDM1h86Te5cIZpoLCcJD5RFqiboeUMAPfC5X0k_RtYyRIQQzyVik4-ZsZJr-qB07b-dhoUjaAGI6hSmEhWmkFWiG25X_TkRP0",
         "geometry":{
            "location":{
               "lat":49.268768999999999,
               "lng":-123.257026
            }
         },
         "vicinity":"6331 Crescent Rd, Vancouver",
         "id":"3ba4c34af3944d8c9160b74cf6b1edf0dcc52b6e",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "rating":2.7000000000000002,
         "name":"The Point Grill",
         "reference":"CoQBcQAAAM7K68Bgui2Np2AzWS7vUZ2lVHgT1ZBlL8nc53XKvI5axCdIIN2vhOhMlyjcjqxfAJFP8e9No9yOUeEFBX2XNGJYVteNq0MrFPdiC7LAw13fF1-h_C-A5gZlB8K1DA8CkCjvPlFQXJyJT6VrAH_A2wP4OSCZj5k9nbMdZS81Ja6SEhCjdAA5-RaPQGb287JbeWwTGhT2nvLSODMoINcelB6YldWt_fF9Pw",
         "geometry":{
            "location":{
               "lat":49.261723000000003,
               "lng":-123.25514699999999
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"2205 Lower Mall, Greater Vancouver A",
         "id":"ef5806d1bdbdb3a303f680af111a787b0f470de3",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "rating":3.2999999999999998,
         "name":"McDonald's",
         "reference":"CnRtAAAAwiWx2cNuX13AgSJXg7BwTlEGvnx1wGYuvAHwwo0uKL5ZnvzMdSRLMiEkTpttAXXj3vr_c7ItTnN83jp-2k-R9UVc3D6_j71NzrRxGYKZN89CR6yvq2Vl47g5Vcj6F4sGXoBIMgj6Vk9oN-UNTZ1tTBIQXklArRTquDZgZ74Jt5-TXhoUETfhoV-dXp1_WBYIH_4gHtXr_W0",
         "price_level":1,
         "geometry":{
            "location":{
               "lat":49.266575000000003,
               "lng":-123.24279300000001
            }
         },
         "opening_hours":{
            "open_now":true
         },
         "vicinity":"5728 University Blvd, Vancouver",
         "id":"06f675bcd19afdbfcf5bc471daed8468b0349719",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "rating":3.2999999999999998,
         "name":"Red Burrito",
         "reference":"CnRuAAAApdrAO-t34GwHIdPcZ6cEdJE-QE9TXhu3dxR2wfrPYUsM69t_zAaL0amn5MYmUlkK8e4yeuXZDLG8hHuX_PurKGDz8o2eXgRYMx2xixDodYAY3cz9uOeFw1zlhItCjNnDjET-tLWSFHi0oC7WUq_4KBIQ97WY4y4CtnPzGaBPUqTrNxoU7TjVgq9iVbsJ2KamD4JvnMTA_GM",
         "geometry":{
            "location":{
               "lat":49.265802999999998,
               "lng":-123.24327599999999
            }
         },
         "vicinity":"2192 Western Pkwy, Vancouver",
         "id":"d501004f808e4143ddc0cb658b51c27337b0ab3e",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Osaka Sushi",
         "reference":"CnRuAAAAog1BO6EAoMIfNj8B_hx7CeaiReTPNwAgYKL1ulBr2qFQAA5V0o8doORiTA9J1fLcbrFJkJTBIduVyxPiWlxn5uexzDuSE4TIkmwaUr9hnj5vHzZUQiWMOwC34MUgTTTCp261EhrRzfSJ3LiCpHrdixIQ6k1zQidSo9BnoAD5DjB5oxoUFehmVW_dFsPmZ_LvzDCCzXyYTig",
         "geometry":{
            "location":{
               "lat":49.266663000000001,
               "lng":-123.242726
            }
         },
         "vicinity":"5728 University Blvd, Vancouver",
         "id":"14e9399462d8119285b35a10f60ecbf12d07e878",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Tim Hortons",
         "reference":"CnRuAAAAyHw6sxvryjkL7jXnvySwpNa6fgI0ijCgXvCWcw4qImg7ZZP0UTPcNczg121bbBpSEB8RClZYynWObeiKwUFcFm46xV2ihtPJXcSnEX22Vusr32k1exhX7wrN5emF4lcwbuXKPy2Nx89k8SrMRR49kBIQ_XL8PZ_6c53y6JdiZU2fzxoUF653xQEWCDdcBaWTs_1YJOhsV5U",
         "price_level":1,
         "geometry":{
            "location":{
               "lat":49.260078,
               "lng":-123.248554
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"2424 Main Mall, Vancouver",
         "photos":[
            {
               "photo_reference":"CnRqAAAAomFAiSH-qkX4cvGNqkDdNEw0U0hpapvGcEqXvszB4QlKmSY9TWKic3pAzMnYKLcSNhOGWhyhEH8F8peSVazi1ke71zQJx3Mbepda_yVPAzqt1Eh9gjwYsA_4SQLXhWc-BiVfiQbqUGoMN-uecgxVwRIQBSCNTyQ8L9_32bTtxhJoRBoUoL9J60-MljUIPAPg4mBejPx3tew",
               "width":950,
               "html_attributions":[

               ],
               "height":950
            }
         ],
         "id":"5fa0d8e0847efea21f480b5394e7cc101c8a71c1",
         "types":[
            "cafe",
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png"
      },
      {
         "name":"Pacific Spirit Place",
         "reference":"CoQBdwAAALcetky9bmn-6dGmtrQV0OvX1PFNKZHrW2MhshEXlef5pD79d4riUwsyucj5ydqibBRyJV-Zshw7fyNWP0gl6MGe7PLq_ZpRS9Hur-V4766VqvNwA8k6oeZVv9wqs5dJRmO5xNYp-wbUczC9Ae2BmjFbfjsI8fcNt1GeR18M3JjlEhCO-MMob5Fz4TQl1PIPG4LvGhSdBSAw05AjufkKFJGQ7hPxFqDGrQ",
         "geometry":{
            "location":{
               "lat":49.267601999999997,
               "lng":-123.249629
            }
         },
         "vicinity":"6138 Student Union Blvd. (Student Union Building, Main Floor) Vancouver,",
         "id":"35e1fe34eac23fc70c8f3db9b7ed791da21dd2d5",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Freshslice Pizza",
         "reference":"CoQBcgAAABz46EEKY90TjEEIh_hBajabVuwCuMrX0ORTJGMTj9hfXvX1SMcJwTKRpfobefNCka8V1xEMqEaOobF6KeGjB5LoM-UziW5vSaf-mwm8Y2qM6I4jgyTyaXKGGEYkHl-i1MSx53_GyIN4SJ22vMSeoSrenophiTynaikpW6DNJqJYEhDGEjInOW_BMAY2-ADAoia6GhRNci_AWGSJ0dhOZ-VA_wujavJ88w",
         "geometry":{
            "location":{
               "lat":49.266039999999997,
               "lng":-123.24272499999999
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"2166 Western Pkwy, Vancouver West",
         "photos":[
            {
               "photo_reference":"CoQBcwAAAIYQX_cvQA5-_dfeCs1CniNu5FYyNk669Kr89OwJEERIU4QIQ5c1Hxe_h5PtvLWJh3Pknh97ElFrU_dgfy8be_XDKmXJkvUjsSA8xlaf9-JySpmU5JmXn6yjLKr1QT8-sv7H5_5sGGTZyYnEyqJqr09kHv12gtFbdmsTJD4Yl9liEhDhO97zaHrky8Hvm0beVEt1GhSCYBUuU8m7vgKJtm77GkIPVGPgHA",
               "width":200,
               "html_attributions":[

               ],
               "height":198
            }
         ],
         "id":"8dc81c13f8bad8a3ce39f36fe626c79daeb9a925",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "rating":3.2999999999999998,
         "name":"Pita Pit at Ubc",
         "reference":"CoQBcgAAAEg86o1lJ6zebob9eVQLVU5_y-BqpX32BJsg_6kBR5qgEANuyV7WLsdFcY5ypoPwEI5xeClCKlrlU271JFu8uaPKHI6jH4LoY8Bhkrbnl2B02w0NylhcvEO20qDGc-qo6jknwCYHG28JGDwgT7tkkd3AE-m7FDK_LcMGAqnFA4l8EhB6VHM2IMBgAlRmrYxeyJLhGhThng7xLxhGBvXAGodhh7VGP3Jtdg",
         "geometry":{
            "location":{
               "lat":49.266145999999999,
               "lng":-123.24216300000001
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"5717 Dalhousie Rd, Vancouver",
         "id":"9581526a42ddeb0a40a2ab81e49b1e705c83693c",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Food Services-Administration",
         "reference":"CoQBfgAAAPgvwcYYQbTE0iAVi29bkSTOZh33HzL9tq9N2-Z671dG9NLvE-YbEyLuWNOqtTYhgkzomiv4UTTHXH_PwKYrUft6GEuzc_ZoLqloKXPd0iEf7mqRgJtoUY8z_ueA8PE2KwIZLjSlw2gHkNLsyFqyWy2OkyCGogOL_C6wq20pd6cpEhA3E9EesKaajMhXhLz5X3rTGhSzHd-Ihuprh8iqUxgPXsov-ksWKQ",
         "geometry":{
            "location":{
               "lat":49.264108999999998,
               "lng":-123.255126
            }
         },
         "vicinity":"2071 West Mall, Vancouver",
         "id":"df6ee55660264891c877ba232ba66ba7e911c8b7",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Vanier's",
         "reference":"CnRrAAAAjIWF-9wsmi-zkPOCce63xmlkCuCm7tr5xPyU2Cbpk7dSSNAfszHYY2Jv04FpyItcCdChW0q8O0IK7k6wk5XgrPNNYGJj9DEfsgM6HQ_-XWkh8xxPBHwTBLm297_EWichJrqhPDISsi18C9l8B-HYPRIQNRmRLj6yGIPWnR56tQqJ0RoU6x2LBDVZGVxsj7c2ovIWe7xoW34",
         "geometry":{
            "location":{
               "lat":49.264847000000003,
               "lng":-123.25846199999999
            }
         },
         "vicinity":"1935 Lower Mall, Vancouver",
         "id":"45ecfb52c381c5e08dea77f7dea0e0a836b0725c",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Gallery Lounge",
         "reference":"CoQBcQAAACUvO0-qSVr0zIOovyjcSM5zXdAHYGMIZOZBxZ-pLlUMtlb-EtOr8W8sTbdNt2uy0-tL0b2zyBEcDHF5jkSFT87_1XlNZvJqEUmklotRgCW4L4SB14sT75_7rFZOtvY5ij4h9Xn8ks2hH8tfgUp2zq6W9d4yCbPXCeP8wZrbc8WvEhDUNnKXCdfnbskDsMFoUgPXGhQwpcqrac5tD32iAoMEkdF708ix0A",
         "geometry":{
            "location":{
               "lat":49.267454000000001,
               "lng":-123.249972
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"Goddess Of Democracy, UBC Sub Plaza, 2090 E Mall, Vancouver",
         "id":"c3b5db62b872b191865d75137a64c5848c705ba9",
         "types":[
            "bar",
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png"
      },
      {
         "name":"Only U Cafe",
         "reference":"CnRtAAAAntQxNWlbfVQvFHswBpNVqTA3EZM-6Kft0dDu3VISPJaaQTFjMXp9MQflKJwQV-U3SrVr7IWBzjyFI0gCkkVOUrxXSZeGHyH91oZUE2krk86ifSlSR0uZ0g9PQwMG4Y3ZyzOV-6aj8IbI1wzf2z82dhIQ8sVn_ZSwNgpITqLb_uf3VBoUawomhOY4l-O7Ya3_fZk6MtewhZQ",
         "geometry":{
            "location":{
               "lat":49.266297999999999,
               "lng":-123.241112
            }
         },
         "vicinity":"5737 Dalhousie Rd, Vancouver",
         "id":"24c914d3e6ce6a5c3b7baab6773e36baeea85637",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Subway Vancouver",
         "reference":"CoQBcgAAAFE5gG_M04vV33B3ieXHOZ6k52_YcuTWEgWnMSyPySs0N6hlY2cvKlFATIeAP1Rh0joNs8vNn4FdnGobz9SOomACGGWmlPVmohhvbjhluMSGwMpXzwanMHNoqCjM_ClnI6hN22xrNIzM397_lJF3cPdU0dyvLIeHTfPtQl6fkyraEhCAsewJZvUAxzfPirWGD5gZGhSeFvAFhoc1W0f8NveWyeo1nDHehw",
         "price_level":1,
         "geometry":{
            "location":{
               "lat":49.268256999999998,
               "lng":-123.250522
            }
         },
         "vicinity":"6138 Student Union Blvd, Greater Vancouver A",
         "id":"01b8bd662418d84dd8fed65e93df50a8b444273b",
         "types":[
            "meal_takeaway",
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Well Cafe The",
         "reference":"CnRwAAAAVGSavBX2X5tcE57R20qpUwLQWNdKYJqfs5CyxIUo6xNVsZKKkac0Ye1PmjImsMjv3knsdB5LT79d9zVrlUYnzcsoUk8ypjHZeSXr5SSqzFQBhm8GGp9Bb2KxEFHqT-HGlVGRO5WqMpA5fnMoI_3AEhIQb-CA5Wa_lstaU6otr3BLERoUtrsju_dT6QGSkovoNU2Jznv8_mo",
         "geometry":{
            "location":{
               "lat":49.265647999999999,
               "lng":-123.24409300000001
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"5800 University Blvd, Vancouver",
         "id":"06dbf40ca3dc5d0e004c6bbf3aedc127e20c936c",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Bernoulli's Bagel",
         "reference":"CoQBcwAAAHUDQKFOx_Hh6jmYZcf8zk70gqgHmANKJ3tj1zNC1Yqz2F-8VehlBih_WgyvzZnLsZwfVWCamRGuHm6uv0iLU9t3JOs8RTYzuAGF4XaW9wNkBjGQRGR5JgwHW9vCRlXi7MX5j5PvGr6enJyOc_hNv7gBnlQ4UnG2z9c9X8RCVU4PEhBUGBldP36v7zyLuyLxOsDtGhSFWkliPbtaWGBBbT3QzAApsdpSzw",
         "geometry":{
            "location":{
               "lat":49.267904000000001,
               "lng":-123.24979999999999
            }
         },
         "vicinity":"6100 Student Union Blvd, Greater Vancouver A",
         "id":"955d7d20c01d6efc3516b1dd6c5341d092f4c287",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Great Dane Coffee",
         "reference":"CoQBcwAAAPuGWBznfy0wTCat4pfB0Y6dMNXYBqRfoINjlJMixbBmVb0uqmjZ1QxW36NSCmInFSnKcZTm8olHQ5bNjKkoR9PekSseslKpD3JKL7k9WZE7AZAA9NDoHt3W-8fRHFEu-kostWVkKuDCgnOAZPD2kO6kFEXB2S0x_pByFhOzhr8iEhAHBH3Z8bBdTHtIrInAchB2GhQzoEkExRJt_4xKDgjJX0YxlXYi5A",
         "geometry":{
            "location":{
               "lat":49.270059000000003,
               "lng":-123.25078000000001
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"6011 Walter Gage Rd, Vancouver",
         "photos":[
            {
               "photo_reference":"CnRnAAAAbXr0ExfyQIWeErfqG6e2OZmc8cHMtlceGEUSOFYjnFSm4a45LNu5zFNmNE93yIUWHV1NlJn_2BsCfl2W823WUYtH4TzN4qHc-3r0I6Hyci-Nngi0dICjXQKqGy_1LMLvS802vRo9qPZHEV9U6ABhfxIQRYA2bqcACRY3rqM2EsGn5xoUfZ9mYL36sO8qpyXuYfYnm1F7w2g",
               "width":640,
               "html_attributions":[

               ],
               "height":960
            }
         ],
         "id":"9bb10b37671c0c3de152282d1b08d23dbca8bcf8",
         "types":[
            "cafe",
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png"
      },
      {
         "name":"IRC Snack Bar",
         "reference":"CnRvAAAAwayDmUG2V5NM4I0dQqo6sQAIEuPulp-7EdOlFdQwaUxXyavV1IeCtW4NZoG1QeDDQji5vZu1Y9yKh2ui_CCswSFfyEzPmkBygQPVYqnudppvzdOgO2K5Ah0Y5VkMtZzAcEQCmc6vD2-TbLJBzzMh9xIQM9O9cRV7QGYO51tGS7MaCxoU1uI8BUJFtggJBm0RKSWuiPNxIm8",
         "geometry":{
            "location":{
               "lat":49.264961999999997,
               "lng":-123.246855
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"2194 Health Sciences Mall (Instructional Resources Center, Main Floor). Vancouver,",
         "id":"53dcd8287cfd4508e36fb22a072009c5d122fdf4",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Little Tea Shop The",
         "reference":"CoQBdQAAAGvtHWn7JxUQ1i8OKilq7VW-H83aGT4Mh9ztCmRYh2ltYEaaQ128Jybi5sipiWqVDxH8F8BrH9x5AbpZs1dT0Skbu6POwAXxtupoYOd-0tr4J4ZkBA3n7fshR7K5J_eys2lJCAXxqebSsHOXCvmeYQqvk3yDDVErs86-fA8GVprPEhDrImpvFulRxnBJtXgbiaM5GhSAsYlM4OlYIgc_wFmVSMfOW78Azw",
         "geometry":{
            "location":{
               "lat":49.268256999999998,
               "lng":-123.250522
            }
         },
         "vicinity":"6138 Student Union Blvd, Vancouver",
         "id":"cf19da67fc36c9781e331ff8eb9bd319c627e3ce",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Caffe Perugia",
         "reference":"CnRuAAAAi0o0Knewv4NpAfagAuZSFmEMRGoH6PpNEmRPi8ME2lmb55DXi0DA9LTUT2zVoyRceUrBz7GLLfsI4DGdl2VEfeMB7VjDTUdEATH7r0InBVDTnXeLDySpW5nTlc9_exaEBqfQNjtFm7DM9Nrsfeo5phIQbZKKRyA_BbPISMT3Cvo6wBoUMUkoVjgT6ZvkCQlag0uNP3dDCtI",
         "geometry":{
            "location":{
               "lat":49.262360999999999,
               "lng":-123.244944
            }
         },
         "vicinity":"2350 Health Sciences Mall, Vancouver",
         "id":"198a59229fa0910e20140e27ed68e7b1bf20f38a",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Stir It Up Cafe",
         "reference":"CnRwAAAAK2tBFh5rLE2m5DXhYeZ_cq-vn5qYHa53vzIjSUziYCvdK-dNgtdWgXGBeVH6VGEinUoXbL2ZUQNhIlHQtr33aNyG4GooL-vCPHUWkCtQHpyt-lz8HcuRF_m_yfBdDr1Eu1VgIPGoKGcNwxPhDRZMghIQNdpsgcjj7hH9VvU0EScVERoUFUFpmOBEsz_dyvRSw6r84PTl6Xg",
         "geometry":{
            "location":{
               "lat":49.268548000000003,
               "lng":-123.25487
            }
         },
         "vicinity":"1866 Main Mall, Vancouver",
         "id":"756607d0dbcbfcbf0df5f701466de39625d0746c",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Triple O'S (Ubc)",
         "reference":"CoQBcQAAANJbHtJA7wBs3rs9i1iezmzPRBgRDuZYj_eeYbHG0yW1t0fUx4VcjW7xIjy1MTRhjG65v8sgSqthpfdudbdMjQFdNfFVJ7fUscT00QfZgLP8yqA91YqCs6P_wahY0FBWVN9dN-86bgIdKvWEzV_fJIcjtjtspBz0-uqq1wFoVmLEEhCGgX5BAxZOxMufI-LyJebEGhTNQESjyeS26kAgj6iBS3WJVrYoZA",
         "geometry":{
            "location":{
               "lat":49.266198000000003,
               "lng":-123.253991
            }
         },
         "vicinity":"2015 Main Mall, Vancouver",
         "id":"8d933aaf2147db8f550adfeced19041cea4fa644",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Starbucks",
         "reference":"CnRrAAAAF2f6vqMtSUVWwMhK5iEEouQdpKjHd9ugEJDOx9ow1X0Ux0bGAm8aoBapS79RmAYeb33D3GjQQeswqsPDmBw-Cr8FQigKVZrjqnkkHR_6pXG5fBEwyFvEOkgvQJLgyMqXqkW_9FYaxrjKBDvPnoZ6YRIQLGyf0niYyRAQWjoZdJ14-BoU4sMoCh1a78L3R4bJmkwYlE1jiUM",
         "price_level":2,
         "geometry":{
            "location":{
               "lat":49.262220999999997,
               "lng":-123.24993600000001
            }
         },
         "vicinity":"2332 Main Mall, Vancouver",
         "id":"40a3592750e7abce588678dcde6dcd18cee79649",
         "types":[
            "cafe",
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png"
      },
      {
         "name":"The Loop Cafe at CIRS",
         "reference":"CoQBdQAAAAiM1BeUEwMveDbgtS4lC5gwGIcWhgnpJZqHeTfv60PzPBORDTA5R65C8SQ8HaMYRQz4yg75JlZj0iHN9nJSijz7WdKIXzR0JijyK3sjNC6bquAmnlbwIUo58mQugU9HplfXhV3OrbZDnI45jvlMp_UhG6tgSmD7o6ZlIXA92UJ2EhBTmH8T2yKEs7tjtarsflL4GhSz3HipWRe3nljx9DnRceIrstfBcg",
         "geometry":{
            "location":{
               "lat":49.261726000000003,
               "lng":-123.253292
            }
         },
         "vicinity":"2260 W Mall, Vancouver",
         "id":"ff5aa0494d4f56c6ecce0e8e352546eebcd632ae",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Suga Sushi Japanese Restaurant",
         "reference":"CoQBgAAAANXRhzkA8OLRo5EKElwlj9imvfC_0QVWT45zJBOhF7ofjVPlM6Dxrn2Nze5kX3XidWeZQE4bgUQk36cDcjymY13IZ9FzDvCrgWift88aHK9_RV0TefjtD7NeuwtFLzNKhxs-Ue2MIfu4r2YuxE7sfWXJpveWyCQ-Yw1-mc7FHy94EhCoUIxrH_rh3nQK3D56vQoRGhQOzP3mOSc2RFwHgL25vSkyu8HJUQ",
         "geometry":{
            "location":{
               "lat":49.266711000000001,
               "lng":-123.242929
            }
         },
         "vicinity":"5728 University Blvd, Suite 201, Vancouver",
         "id":"ba3d0c4d98faaadfdd811854c745eb929736ba37",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Omio Japan Restaurant",
         "reference":"CoQBdwAAADGrT35Tww83TKVHw4CkSo7YhRWtDke-SP2sUVXzR6TKCRjKicO1H8q3x3gqpItvg3ssz2ARARueAU44Oh70XxR-KhGZaiw0KkWm91t5UEr00ANVgUvGmXJvRI4sYndANfMdWv12J47Jn993SK4lbE8Jt_F10__2UVb6MEkRto1cEhBG0r9sGgdz4JjxU9I8obFmGhTihdt6Z9dPto1FoyorL7CgeWu7-A",
         "geometry":{
            "location":{
               "lat":49.266297999999999,
               "lng":-123.241112
            }
         },
         "vicinity":"Suite 115-5743 Dalhousie Rd, Vancouver",
         "id":"8a274fbe1776bb7f08a7c15275d84169140a8f62",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Place Vanier Dining",
         "reference":"CoQBdQAAADh_A0YETtxa9GZnN4NB-FZiLD8iZAG1aqFD9QHkxgq8SCRwRoK4wwirRr5xyU_U5H00QbI6sxnnx8Ex44hk0zaIsmcz_tSb_1uukzkVeG8QMns7rgLPbfsssfDXU_GCUmSWnfLFrjogFzFKDOic8xsBuh_CYJ8El1mmRvmHZWWFEhBFkuF57v_zAr91G9qyM_CjGhQUQfBV3o3Xzzr8huAQTLUT8yjhww",
         "geometry":{
            "location":{
               "lat":49.264702999999997,
               "lng":-123.258684
            }
         },
         "vicinity":"1935 Lower Mall, Place Vanier (Gordon Shrum Common Block, Dining Room) Vancouver,",
         "id":"18416902dd036beeff9063ce048972c126e002cf",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"SaveRally | Save at restaurants near UBC",
         "reference":"CpQBiQAAAGB5yO_1CRcYkv7CztdszNM9Qsaa0pXWH8-5Zp0q9ElkGaoBUpji6dB6lzb6ArEkqPHfWj8ZmUT0gURfZbC-dCnNyWYfZm0rfM3opvIFEhJB880F8kr6v5shcVDthB8Ym0B2err6AKoAWT0EcH_JNK7uqvptWWdRV6s0zPW79_pCxCAH_hJGrO41E_kqbYKLyBIQmhejn2pz3uo5Kss4-bnLkhoU0_-z1x8IjLoCYTJd-pVX1bxNvRM",
         "geometry":{
            "location":{
               "lat":49.267611000000002,
               "lng":-123.25049199999999
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"6138 Student Union Blvd, Vancouver",
         "photos":[
            {
               "photo_reference":"CnRnAAAAwaC8ks2umkL1mO_8Dom9QVwPaRZm88d_TO0c7n81Qm9xEQzt4T1svGr9asJdcD61rO7bYNBrmdSOuXuPKADEr8u9ia5C6AUz3bGe997tROtiFdcD_t6Ji92KOoMeebxsxTY8ZzeT-GKDqFL7xMHf9RIQ_LvgZgDLfYfv4ytbzTSNbBoUh_Wlk-xCEWTj4nAZ88ggyrHOKCI",
               "width":676,
               "html_attributions":[

               ],
               "height":481
            }
         ],
         "id":"3794bab48d8095fd92f1f250422d1b31aeed62a6",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Delicious Foods Ltd",
         "reference":"CoQBdAAAAKIwCfq8llbsoHYgkK2vcb7ZFaYpSx0eF4R5bbPFPEt1sN7oaCaC60LnpcVeX1mVJvCKricr4Y94ldj_qfNq4TVIzg1lY6i5lv9CuIBWYH_zQ1-bxOQMyvhnvttmfvP-DVealxIwAHDV9cv4c6PKyk--TmYb268HH9QJrk1Ii06ZEhANVFrxN4fTAnIjspOwtgjVGhQW1JwqC62buXV3Dv2mJuLRXzLAMA",
         "geometry":{
            "location":{
               "lat":49.263879000000003,
               "lng":-123.255646
            }
         },
         "vicinity":"2-5728 University Blvd, Vancouver",
         "id":"56972d7dfca6eafeb77a52ca5c02e1bf2dcaac57",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Subway",
         "reference":"CnRoAAAAYp7imQoorNlJwMMyHFlj4biaz040no2CjPBBdlTisJ3Xu_x9J5sik9ILuJn2ZvlD4ixjn3UIFvsVLzoCXFn4ht5vyBJ3Ni7m738YflOcwyPkiUm4t4Z9nZoeIiOre-IU_EXFi4bshNmiB9iYIL5xMRIQbXlSATklcCvS-1-8gEgtxxoUh-PSQSYQ1HHNIJe_R_LdXmxoxyo",
         "price_level":1,
         "geometry":{
            "location":{
               "lat":49.265785999999999,
               "lng":-123.243262
            }
         },
         "vicinity":"Western Pkwy",
         "id":"4e098970cee436f3452b131f63d21cbd063bfd89",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Timpo Mongolian BBQ",
         "reference":"CoQBdQAAAFqyph_aEaXQoxRhNYSncxuVJ-WxgBz_n9I9r_cK9liZFPhE1iRpsUDER3B5fr9RJy7-5ozsIVr543ZPLWxf_K9HNdWZjhKv7foDpMRvg1JL5HJ9dTLGrkE3zo4htX0qw_5S3cv3tZUJL3DDiq-Y8OYoh8mh44V_6olNv_dWwl5dEhBo6xTRUOQKIKXDlG3Uw4ZuGhTABnEePRCIhiE7Sr8pfJxVmyoEpQ",
         "geometry":{
            "location":{
               "lat":49.266624,
               "lng":-123.24300100000001
            }
         },
         "vicinity":"5728 University Blvd, Greater Vancouver A",
         "id":"0a52c571d8d4a5b9dbd6490876786cceb48e815d",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"My Home Cuisine",
         "reference":"CnRwAAAAuIgZKWFinzUiascFAq42mdRFjQVoBMN3-iHt5m-bRqdRJLKxzf2UOMahEMfLgjytWfybHGqiBk5no4hXRZu7mGCWuMRMZi3TuLyFcL45YwWIXEg0f95JrhdJEqFkG4iw6BkQkbS77GMrsIQp_UVkFhIQuEiTuOKz3eL5LI8QbgGVVhoUTowt0thuFBHQUp4gMPSTI_jrNRI",
         "geometry":{
            "location":{
               "lat":49.266686999999997,
               "lng":-123.24260099999999
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"B9-5728 University Blvd, Vancouver",
         "id":"6ddd9350f88c1e5db2767269dba3f63df91cd0c0",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Combo Express",
         "reference":"CnRvAAAAser70s9JtZlaS22K5qj32cgO2iu_7jElo53IjmN_xIyhlRq4eQ_U7I-pgxRQIbPIuY43R_qprTTY3FBvar2wkBw0wFchK7NHCCxFoTUJ2rmVys-vL2dfzoVRgbkzDF3EP4DzMbTjtVmuZJQj32c14BIQsfu3mvPRnra61Gk1Yz5qTxoUYJdZcf2_ZhKR3wzqrLaKUGpKnJk",
         "geometry":{
            "location":{
               "lat":49.263773999999998,
               "lng":-123.255471
            }
         },
         "vicinity":"5728 University Blvd, Vancouver",
         "id":"20aa63f80518d669a3d13e109831f2e9cd9b090e",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Leona Fast Food",
         "reference":"CoQBcQAAANi3zrcTQj0ER-9PTWFWIMazjref3uMqOZpwQqoznkpESWNVG-RpSnYXPRJnihyY7VSEcel0Cm_-K1XNFwjacSsrHXtQoMELyJh5m6pJGDFQ0l9riNTqUBe-RzIv9mZHz4Hw3hNZISxWK597EQnSGekHBvSRSGiGpmZ_oZVOKtjEEhDQaL3bAsWIWDGLlAzIBIdaGhSmmb7bzXeqev9kj7trj-9BHKk6uw",
         "geometry":{
            "location":{
               "lat":49.263879000000003,
               "lng":-123.255646
            }
         },
         "vicinity":"Suite B3-5728 University Blvd, Vancouver",
         "id":"93881d78d4c52108b3c8c70c3c4d448421d0f147",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Starbucks",
         "reference":"CnRrAAAA8OEY0ikKRN91BGPeqeyd30hjRR1Els2VC2qG8ycnbpsKh5werw9T60gnPEd4j3R8CLvzHxD91FMvUxpsmRSXbqlKx2AOvwsjZLyJVA_DtEftjo1p4DYxlw6dajFTsAWVAdKfMCUhoIQSG3uoTQogNRIQbVXI3Q8Yi4dlyEQIDJ0qgRoUpUMyeTkqz76ZkPa3cm7tIj6szGo",
         "price_level":2,
         "geometry":{
            "location":{
               "lat":49.267502999999998,
               "lng":-123.25044699999999
            }
         },
         "vicinity":"6138 Student Union Blvd, Vancouver",
         "id":"d79bc53bfde4b198aa8d544f8fd0098f588b8684",
         "types":[
            "cafe",
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png"
      },
      {
         "name":"Chinese Food Hong Kong",
         "reference":"CoQBeAAAAEwtoRTyGIP2hWyUzxittHZHCyddqyN7FXd7EliiCZHbCni_X4jj5vR9BPl8DUeLdhTe2vRCQe0duQsAx-rLKaL_SOnW3lzy3JvMfClf7NUAPUsnWt-NOCdd-IU3HBY54Z6mrOYJ2tff1tiUsNKuS_22l7mXER6XwAba3vznkwUmEhB-h9ZdSuUTCTCBVAmv9ebFGhQm8YCeTvdwmiZ6iR7Ef6DKmf2qZg",
         "geometry":{
            "location":{
               "lat":49.266570000000002,
               "lng":-123.24408
            }
         },
         "vicinity":"5728 University Blvd, Suite B7, Vancouver",
         "id":"483c64c259e01367c75a42f69a2f188e9320d26d",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"IRC Snack Bar",
         "reference":"CnRuAAAApoW2GFN3NUkDcfjvJfAPVyTF02MDtEEdOoXxnMG7rJKNzaLI12JNa--JMj00lBm-_qovz7hJcWd3D86tv-vsc5xTDCqNB0cgIv7J3uQCBp3yM601hNLWJ-Hwl8FkK6wz7PHICeNqDqvtVNfaq9bVLRIQF02RTCtiMEzL_t1xZuzfyxoUB3e8e4bkmB0PSKYytWN8k-q0CUk",
         "geometry":{
            "location":{
               "lat":49.264780000000002,
               "lng":-123.24673199999999
            }
         },
         "opening_hours":{
            "open_now":false
         },
         "vicinity":"2194 Health Sciences Mall, Vancouver",
         "id":"6b42be1bef30d35d29d41da6521b6e0ef7bd0bc1",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Donair Town",
         "reference":"CnRtAAAA45ynyMq0X2_unLsELY25q3BFE8oXRCUkp0ZhlCgakCEamSQKvJljHrI7ZT287S4YMq9wvlbkDGp-kJ6Btjf3trFQWnl8sKGH_zaxgfQuIXd4TzhJjRwyH2S98Xz_rHZnCCb4H-7-_KTr7WswYiwfBxIQKTtVczqZ9WRNsps0bReUuxoUWnyscHVLdXKQ2-J_-7-TB6kWEmM",
         "geometry":{
            "location":{
               "lat":49.266606000000003,
               "lng":-123.24291100000001
            }
         },
         "vicinity":"5728 University Blvd B1, Vancouver",
         "id":"7a591feb0f088e82bab84ccefd238b3e99e8ef0d",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Pizza Garden",
         "reference":"CnRuAAAAFsyKTBzHB9pBFg1G4z43YIfSrKECUSibxfvcc-reuyaLuy89hnFYERV5UeDgIx7ESvFC_SVsvU-mMhl9mZEH_eoSzlVGpNi4LNcw1bDkL6KLOLLDBRVj6IVZcNda59bv-uOXS5OyTXC2l8XkkpUcCxIQwn0hIfLQLizqwrsnXyqW2BoUHf2aer7CneLEU69w2r_jdwvwfRM",
         "geometry":{
            "location":{
               "lat":49.266598000000002,
               "lng":-123.243645
            }
         },
         "opening_hours":{
            "open_now":true
         },
         "vicinity":"5780 University Blvd, Vancouver",
         "photos":[
            {
               "photo_reference":"CnRnAAAAwCFh96UlyXxit6SGaRL0KYhzb4WxJ6fOMyx2igkoUQmZAMaYLL6Sco7qrOD8w8yEaJzEmviZPEOl39A6mqoilgD44RSZI0OlwOTusiVbYiQPbc5BD-0uCdGJyjzQWNhAD5OsgMnrIT_xoMLA7_G6QxIQGZ28HnZ5Bd0004Q5FRyKZRoUWkTU6qxHT8rS_erATMVX4K4hxgw",
               "width":960,
               "html_attributions":[

               ],
               "height":635
            }
         ],
         "id":"82a14b085c22d38f01c318d77310cba7d3db9af7",
         "types":[
            "meal_takeaway",
            "restaurant",
            "meal_delivery",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      },
      {
         "name":"Seedlings",
         "reference":"CnRqAAAArGzmMtxvYUDEbuVbJP1PmbrOy6T863f2RC1m4n3t4Yq6tZoSy4JbfaI47pwFIaHT8WMufVyv6b1A19TfmqUXz1ioGa_esm5UVPBJLedTLmms5PzhW9jal5uZp4n--Tg0VNN4O1ayzAcc1XlEeM-ZZhIQmEma2yMfil86LVm0-4ziSRoUm9bSBSV-azQrr-nJls7dqUroVTk",
         "geometry":{
            "location":{
               "lat":49.268484000000001,
               "lng":-123.25803999999999
            }
         },
         "vicinity":"W Mall",
         "photos":[
            {
               "photo_reference":"CnRoAAAAuA5TnBDrLhBKX3rRE8OGUIydZaeenfHLYQoN82XpUUlm1f_iNW28M9CIpFaBFOfDR1_GHwv-cYSfKZud77HuOo4Nq-HnNDOYyLmV5eV_j45ScL74e7JcH8jGwcN_uMIQ0AK8-eZjpm-CROCaBpe8TBIQkj6s9iWT7NYhr6iTPmnjnRoUJZDFVr8i6R8_UthFq2z27iOcG_4",
               "width":512,
               "html_attributions":[
                  "From a Google User"
               ],
               "height":384
            }
         ],
         "id":"74aac4f9f88ab8a9f4f9edadea904a69b86144a4",
         "types":[
            "restaurant",
            "food",
            "establishment"
         ],
         "icon":"http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
      }
   ]
}
 
