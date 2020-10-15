var http = require('http')
var https = require('https')

RETURN_DATA = '';

function loadData() {
	https.get('https://api.giro-e.de/static/chargepoints/deswu.geojson', (resp) => {
	let data = '';

	resp.on('data', (chunk) => {
		data += chunk;
	});

	// The whole response has been received. Print out the result.
	resp.on('end', () => {
		console.log(resp)
		if (resp.statusCode == 200){
			refreshData(data);
		} else {
			console.log("Request Data Error: " + resp.statusCode + " " + resp.statusMessage);
			console.log(data);
		}
	});

	}).on("error", (err) => {
		console.log("Request Data Error: " + err.message);
	});
}

function refreshData(rawdata){
	console.log("start parse Data")
	let geojson = JSON.parse(rawdata);

	let SvgChargingStationAvailable = `<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;">
		<g id="Page-1" transform="matrix(0.484641,0,0,0.484641,9.77094,9.5283)">
			<path id="Rectangle-1" d="M417,94C417,80.754 406.246,70 393,70L94,70C80.754,70 70,80.754 70,94L70,395C70,408.246 80.754,419 94,419L393,419C406.246,419 417,408.246 417,395L417,94Z" style="fill:rgb(0,29,188);fill-opacity:1;stroke:rgb(151,151,151);stroke-width:1px;"/>
			<path id="Shape" d="M271,351L111,351C106.58,351 103,354.58 103,359L103,375C103,379.42 106.58,383 111,383L271,383C275.42,383 279,379.42 279,375L279,359C279,354.58 275.42,351 271,351ZM375,191L375,167C375,162.58 371.42,159 367,159C362.58,159 359,162.58 359,167L359,191L343,191L343,167C343,162.58 339.42,159 335,159C330.58,159 327,162.58 327,167L327,191L319,191C314.58,191 311,194.58 311,199L311,215C311,232.88 322.81,247.845 339,252.965L339,312.21C339,319.185 334.25,325.67 327.37,326.805C318.61,328.25 311,321.495 311,313L311,299C311,274.7 291.3,255 267,255L263,255L263,159C263,141.325 248.675,127 231,127L151,127C133.325,127 119,141.325 119,159L119,335L263,335L263,279L267,279C278.045,279 287,287.955 287,299L287,311.305C287,331.14 301.46,348.885 321.205,350.81C343.855,353.025 363,335.205 363,313L363,252.965C379.19,247.845 391,232.88 391,215L391,199C391,194.58 387.42,191 383,191L375,191ZM233.045,214.88L186.195,284.38C185.095,286.045 183.09,287 181,287C177.165,287 174.265,283.86 175.165,280.54L186.675,239L157,239C153.375,239 150.575,236.205 151.055,233.055L159.055,179.555C159.45,176.95 161.99,175 165,175L199,175C202.94,175 205.81,178.27 204.8,181.605L199,207L227.85,207C232.47,207 235.355,211.39 233.045,214.88Z" style="fill:white;"/>
		</g>
	</svg>`

	let SvgChargingStationUnavailable = `<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;">
		<g id="Page-1" transform="matrix(0.484641,0,0,0.484641,9.77094,9.5283)">
			<path id="Rectangle-1" d="M417,94C417,80.754 406.246,70 393,70L94,70C80.754,70 70,80.754 70,94L70,395C70,408.246 80.754,419 94,419L393,419C406.246,419 417,408.246 417,395L417,94Z" style="fill:rgb(97,97,97);fill-opacity:1;stroke:rgb(151,151,151);stroke-width:1px;"/>
			<path id="Shape" d="M271,351L111,351C106.58,351 103,354.58 103,359L103,375C103,379.42 106.58,383 111,383L271,383C275.42,383 279,379.42 279,375L279,359C279,354.58 275.42,351 271,351ZM375,191L375,167C375,162.58 371.42,159 367,159C362.58,159 359,162.58 359,167L359,191L343,191L343,167C343,162.58 339.42,159 335,159C330.58,159 327,162.58 327,167L327,191L319,191C314.58,191 311,194.58 311,199L311,215C311,232.88 322.81,247.845 339,252.965L339,312.21C339,319.185 334.25,325.67 327.37,326.805C318.61,328.25 311,321.495 311,313L311,299C311,274.7 291.3,255 267,255L263,255L263,159C263,141.325 248.675,127 231,127L151,127C133.325,127 119,141.325 119,159L119,335L263,335L263,279L267,279C278.045,279 287,287.955 287,299L287,311.305C287,331.14 301.46,348.885 321.205,350.81C343.855,353.025 363,335.205 363,313L363,252.965C379.19,247.845 391,232.88 391,215L391,199C391,194.58 387.42,191 383,191L375,191ZM233.045,214.88L186.195,284.38C185.095,286.045 183.09,287 181,287C177.165,287 174.265,283.86 175.165,280.54L186.675,239L157,239C153.375,239 150.575,236.205 151.055,233.055L159.055,179.555C159.45,176.95 161.99,175 165,175L199,175C202.94,175 205.81,178.27 204.8,181.605L199,207L227.85,207C232.47,207 235.355,211.39 233.045,214.88Z" style="fill:white;"/>
		</g>
	</svg>`

	chargingStationUnavailableIconInserted = false;
	chargingStationAvailableIconInserted = false;

	geojson.features.forEach((feature)=>{
		console.log(feature.properties)
		let availableUnits = 0
		feature.properties.units.forEach((unit)=>{
			if (unit.status === 'available' && unit.generalStatus === 'operative'){
				availableUnits++;
			}
		})
		let name = (feature.properties.name === feature.properties.address) ? feature.properties.name : `${feature.properties.name}, ${feature.properties.address}`
		let popUpContent = `
			<div>
				<span class="h4">Ladestation</span><br>
				<b>${name}</b><br>
				${availableUnits} von ${feature.properties.units.length} Ladeplätze verfügbar
			</div>
		`
		delete feature.properties.address
		feature.properties.name = `Ladesäule ${name}`
		feature.properties.name_en = "Charging Station"
		feature.properties.address = `${availableUnits} von ${feature.properties.units.length} Ladeplätze verfügbar`
		feature.properties.textOnly = false
		feature.properties.popupContent = popUpContent
		feature.properties.icon = {}

		if (availableUnits>0) {
			feature.properties.icon.id = "charging-station-available"
			if (!chargingStationAvailableIconInserted) {
				feature.properties.icon.svg = SvgChargingStationAvailable;
				chargingStationAvailableIconInserted = true
			}
		} else {
			feature.properties.icon.id = "charging-station-unavailable"
			if (!chargingStationUnavailableIconInserted) {
				feature.properties.icon.svg = SvgChargingStationUnavailable;
				chargingStationUnavailableIconInserted = true
			}
		}
	})


	RETURN_DATA = JSON.stringify(geojson)
}

function startServer() {
	var server = http.createServer(function (req, res) {
		res.writeHead(200, { 'content-type': 'application/json' })

		if (req.method == "GET"){
			res.end(RETURN_DATA + "\n")
		} else {
			res.end("\n")
		}
		
	})

	server.listen(Number(process.argv[2]))
}

loadData()
setInterval(loadData, 5 * 60 * 1000)
startServer()
