let cypressDetails = {};
const fullDateStyle = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};
const shortDateStyle = { year: 'numeric', month: 'long', day: 'numeric' };

const fetchCypressDetails = async () => {
    //const response = await fetch('https://mountains-lets-gooo-api.onrender.com/api/cypress-data');
    //cypressDetails = await response.json();
    cypressDetails = cypressDataJson;
    if (cypressDetails) {
        document.getElementById('loading-screen').style.opacity = '0';
        document.getElementById('content').style.display = 'block';
        setTimeout(function () {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
        document.getElementById('last-update').textContent = cypressDetails.lastUpdate
    }
}

const initializePage = async () => {
    await fetchCypressDetails();
    if (cypressDetails) {
        document.getElementById('last-update').textContent = new Date(cypressDetails.lastUpdate).toLocaleDateString('en-US', fullDateStyle);
        document.getElementById('opening-date').textContent = new Date(cypressDetails.openingDate).toLocaleDateString('en-US', shortDateStyle);
        document.getElementById('days-for-opening').textContent = cypressDetails.daysForOpening;
        document.getElementById('current-weather-icon').src = cypressDetails.currentWeather.icon;
        document.getElementById('current-weather-summary').textContent = cypressDetails.currentWeather.conditionsSummary + ', ' + cypressDetails.currentWeather.temperature + '°C';
        document.getElementById('current-weather-wind').textContent = "Wind: " + cypressDetails.currentWeather.wind + ' km/h';
        document.getElementById('current-weather-wind').textContent = "Wind: " + cypressDetails.currentWeather.wind + ' km/h';
        document.getElementById('uphill-status').textContent = cypressDetails.operations.uphillStatus;
        document.getElementById('open-run-percentage').textContent = cypressDetails.runsOpen;
        document.getElementById('open-run').textContent = cypressDetails.runsOpenPercent;
    }
}



initializePage();