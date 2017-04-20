// Get active Chrome tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Augment numbers for better readability
    function enhance(float) {
        return (100 * float).toFixed(2);
    }
	function hello (a,b,c,d,e) {
		CanvasJS.addColorSet("Shades",
                [

                "#CB4B16",
                "#1F8261",
                "#8a2be2",
                "#FFA500",
                "#1789D4"                
                ]);
			var chart = new CanvasJS.Chart("chartContainer", {
				colorSet: "Shades",
				
				title: {
					text: "Basic Column Chart"
				},
				data: [{
					type: "column",
					dataPoints: [
						{ y: a, label: "ANGER" },
						{ y: b, label: "DISGUST" },
						{ y: c, label: "FEAR" },
						{ y: d, label: "JOY" },
						{ y: e, label: "SADNESS"},
				
				]
				}]
			});
			chart.render();
		}
		
    var url = tabs[0].url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    // Get name of current website
    var site = tabs[0].url.split("/")[2];s
    var sourceURL = encodeURIComponent(url);
    var req = new XMLHttpRequest();

    // AlchemyAPI Settings
    var endpoint = "https://gateway-a.watsonplatform.net/calls/url/URLGetEmotion?";
    // Daily transactions are limited for free API
    // Get API key here: http://www.alchemyapi.com/api/register.html
    var apikey = "a96d998f23db44023ef3c840c60258ff5e96618b";////*****************change api*******************	
    var outputMode = "json";
    var sourceText = "cleaned_or_raw";
    var feelsChart = null;

    req.open("GET", endpoint + "url=" + sourceURL + "&apikey=" + apikey
              + "&outputMode=" + outputMode + "&sourceText" + sourceText, true);

    req.addEventListener("load", function(){
        if (!(req.status >= 200 && req.status < 400)) {
            console.log("Error in network request" + req.statusText);
        } else {
            var response = JSON.parse(req.responseText);

            if(response.status == "ERROR"){
                console.log(response.statusInfo);
				alert(response.statusInfo);//*****************inseted by me*******************	
            }
            else {
                var angerF = parseFloat(enhance(parseFloat(response.docEmotions.anger)));
                var disgustF = parseFloat(enhance(parseFloat(response.docEmotions.disgust)));
                var fearF = parseFloat(enhance(parseFloat(response.docEmotions.fear)));
                var joyF = parseFloat(enhance(parseFloat(response.docEmotions.joy)));
                var sadnessF = parseFloat(enhance(parseFloat(response.docEmotions.sadness)));
			
                document.getElementById("site").textContent = site;
                document.getElementById("anger").textContent = angerF;
                document.getElementById("disgust").textContent = disgustF;
                document.getElementById("fear").textContent = fearF;
                document.getElementById("joy").textContent = joyF;
                document.getElementById("sadness").textContent = sadnessF;
				alert(angerF);	//*****************inseted by me*******************			
				hello(angerF,disgustF,fearF,joyF,sadnessF);
				
}}});
    req.send(null);
});



