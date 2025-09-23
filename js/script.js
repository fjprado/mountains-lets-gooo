let cypressDetails = null;
const fullDateStyle = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};
const shortDateStyle = { year: 'numeric', month: 'long', day: 'numeric' };

document.getElementById('refresh-button').addEventListener('click', function () {
    const icon = document.getElementById('refresh-button-icon');
    icon.classList.add('animate-spin');
    setTimeout(() => {
        icon.classList.remove('animate-spin');
    }, 1000);
});

const fetchCypressDetails = async () => {
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await fetch('https://mountain-lets-gooo-api.azurewebsites.net/api/CypressData');

            document.getElementById('loading-screen').style.opacity = '0';

            if (response.ok) {
                cypressDetails = await response.json();
                document.getElementById('content').style.display = 'block';
                return;
            }
        } catch (e) { }

        if (attempt < 3) {
            await new Promise(res => setTimeout(res, 500)); // wait before retry
        } else {
            document.getElementById('fail-screen').style.display = 'flex';
        }
    }

    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 500);

    document.getElementById('last-update').textContent = cypressDetails?.lastUpdate ?? 'N/A';
}

const updateUI = () => {
    // Opening Countdown
    if (cypressDetails.daysForOpening <= 0) {
        document.getElementById('countdown').style.display = 'none';
    }
    document.getElementById('opening-date').textContent = new Date(cypressDetails.openingDate).toLocaleDateString('en-US', shortDateStyle);
    document.getElementById('days-for-opening').textContent = cypressDetails.daysForOpening;

    // Current Weather
    document.getElementById('current-weather-icon').src = cypressDetails.currentWeather.icon;
    document.getElementById('current-weather-summary').textContent = cypressDetails.currentWeather.conditionsSummary + ', ' + cypressDetails.currentWeather.temperature + '°C';
    document.getElementById('current-weather-wind').textContent = "Wind: " + cypressDetails.currentWeather.wind + ' km/h';
    document.getElementById('current-weather-wind').textContent = "Wind: " + cypressDetails.currentWeather.wind + ' km/h';
    document.getElementById('uphill-status').textContent = cypressDetails.operations.uphillStatus;
    if (cypressDetails.operations.uphillStatus == "Open") {
        document.getElementById('uphill-status-banner').classList.remove('bg-red-100', 'text-red-800');
        document.getElementById('uphill-status-banner').classList.add('bg-green-100', 'text-green-800');
    }

    // Runs Open
    document.getElementById('open-run-percentage').textContent = cypressDetails.runsOpenPercent;
    document.getElementById('open-run').textContent = cypressDetails.runsOpen;
    document.getElementById('open-run-percentage-bar').style.width = cypressDetails.runsOpenPercent + '%';

    // Snow Stats
    document.getElementById('snow-overnight').textContent = cypressDetails.snow.overnight;
    document.getElementById('snow-24hr').textContent = cypressDetails.snow.last24;
    document.getElementById('snow-48hr').textContent = cypressDetails.snow.last48;
    document.getElementById('snow-72hr').textContent = cypressDetails.snow.last72;

    // Forecast
    for (let i = 0; i < 6; i++) {
        const forecast = cypressDetails.forecast[i];
        document.getElementById(`forecast-day-${i + 1}-icon`).src = forecast.icon;
        document.getElementById(`forecast-day-${i + 1}-icon`).alt = forecast.conditionsSummary;
        if (document.getElementById(`forecast-day-${i + 1}-weekday`)) {
            document.getElementById(`forecast-day-${i + 1}-weekday`).textContent = forecast.date ? new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'short' }) : '';
        }
        document.getElementById(`forecast-day-${i + 1}-summary`).textContent = forecast.conditionsSummary;
        document.getElementById(`forecast-day-${i + 1}-temp`).textContent = `${forecast.high}° / ${forecast.low}°`;
        document.getElementById(`forecast-day-${i + 1}-precip`).textContent = `${forecast.precipitation}% precip`;
    }

    document.getElementById('opening-date-footer').textContent = new Date(cypressDetails.openingDate).toLocaleDateString('en-US', shortDateStyle);
    document.getElementById('closing-date-footer').textContent = new Date(cypressDetails.closingDate).toLocaleDateString('en-US', shortDateStyle);
}

const initializePage = async () => {
    await fetchCypressDetails();

    if (cypressDetails) {
        document.getElementById('last-update').textContent = new Date(cypressDetails.lastUpdate).toLocaleDateString('en-US', fullDateStyle);
        updateUI();
    }
}

initializePage();