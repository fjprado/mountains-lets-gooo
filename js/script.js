let cypressDetails = null;
const fullDateStyle = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};
const shortDateStyle = { year: 'numeric', month: 'long', day: 'numeric' };
const dateHourStyle = {
    hour: '2-digit',
    minute: '2-digit'
};

document.getElementById('refresh-button').addEventListener('click', async function () {
    const icon = document.getElementById('refresh-button-icon');
    icon.classList.add('animate-spin');
    await initializePage();
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
                document.getElementById('loading-screen').style.display = 'none';
                return;
            }
        } catch (e) { }

        if (attempt < 3) {
            await new Promise(res => setTimeout(res, 500));
        } else {
            document.getElementById('fail-screen').style.display = 'flex';
            document.getElementById('loading-screen').style.display = 'none';
        }
    }
}

const updateUI = () => {
    // Opening Countdown
    let openingDate = new Date(cypressDetails.openingDate);
    openingDate.setDate(openingDate.getDate()+1);

    if (cypressDetails.daysForOpening > 0) {
        document.getElementById('countdown').style.display = 'flex';        
        document.getElementById('opening-date').textContent = openingDate.toLocaleDateString('en-US', shortDateStyle);
        document.getElementById('days-for-opening').textContent = cypressDetails.daysForOpening;
    }else{
        let openTime = new Date(cypressDetails.operations.openTime);
        let closeTime = new Date(cypressDetails.operations.closeTime);
        let openNightTime = new Date(cypressDetails.operations.nightOpenTime);
        let closeNightTime = new Date(cypressDetails.operations.nightCloseTime);
        document.getElementById('operation-hours').style.display = 'flex';        
        document.getElementById('operation-hours-open-time').textContent = openTime.toLocaleTimeString('en-US', dateHourStyle);
        document.getElementById('operation-hours-close-time').textContent = closeTime.toLocaleTimeString('en-US', dateHourStyle);
        document.getElementById('operation-hours-night-open-time').textContent = openNightTime.toLocaleTimeString('en-US', dateHourStyle);
        document.getElementById('operation-hours-night-close-time').textContent = closeNightTime.toLocaleTimeString('en-US', dateHourStyle);
    }

    // Current Weather
    document.getElementById('current-weather-icon').src = cypressDetails.currentWeather.icon;
    document.getElementById('current-weather-temperature').textContent = cypressDetails.currentWeather.temperature + '°C';
    document.getElementById('current-weather-summary').textContent = cypressDetails.currentWeather.conditionsSummary;
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
    document.getElementById('snow-overnight').textContent = cypressDetails.snowMidMountain.overnight > 300 ? `${cypressDetails.snowMidMountain.overnight / 100} mts` : `${cypressDetails.snowMidMountain.overnight} cm`;
    document.getElementById('snow-24hr').textContent = cypressDetails.snowMidMountain.last24 > 300 ? `${cypressDetails.snowMidMountain.last24 / 100} mts` : `${cypressDetails.snowMidMountain.last24} cm`;
    document.getElementById('snow-48hr').textContent = cypressDetails.snowMidMountain.last48 > 300 ? `${cypressDetails.snowMidMountain.last48 / 100} mts` : `${cypressDetails.snowMidMountain.last48} cm`;
    document.getElementById('snow-72hr').textContent = cypressDetails.snowMidMountain.last72 > 300 ? `${cypressDetails.snowMidMountain.last72 / 100} mts` : `${cypressDetails.snowMidMountain.last72} cm`;
    document.getElementById('snow-total').textContent = cypressDetails.snowMidMountain.seasonTotal > 300 ? `${cypressDetails.snowMidMountain.seasonTotal / 100} mts` : `${cypressDetails.snowMidMountain.seasonTotal} cm`;

    // Forecast
    for (let i = 0; i < 6; i++) {
        const forecast = cypressDetails.forecast[i];
        document.getElementById(`forecast-day-${i + 1}-icon`).src = forecast.icon;
        document.getElementById(`forecast-day-${i + 1}-icon`).alt = forecast.conditionsSummary;
        if (document.getElementById(`forecast-day-${i + 1}-weekday`)) {
            document.getElementById(`forecast-day-${i + 1}-weekday`).textContent = new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'short' });
        }
        document.getElementById(`forecast-day-${i + 1}-summary`).textContent = forecast.conditionsSummary;
        document.getElementById(`forecast-day-${i + 1}-temp`).textContent = `${forecast.high}° / ${forecast.low}°`;
        document.getElementById(`forecast-day-${i + 1}-precip`).textContent = `${forecast.precipitation}% precip`;
    }

    let closingDate = new Date(cypressDetails.closingDate);
    closingDate.setDate(closingDate.getDate()+1);
    document.getElementById('opening-date-footer').textContent = openingDate.toLocaleDateString('en-US', shortDateStyle);
    document.getElementById('closing-date-footer').textContent = closingDate.toLocaleDateString('en-US', shortDateStyle);
}

document.addEventListener("DOMContentLoaded", () => {
    const videos = [
        { title: "Mountain View", url: "https://www.youtube.com/embed/OSKgIDnBwwQ" },
        { title: "Eagle Chair Cam", url: "https://www.youtube.com/embed/GTQQdQ8VVKI" },
        { title: "Lions Chair Cam", url: "https://www.youtube.com/embed/3l314gixvh4" }
    ];

    let currentIndex = 0;

    const titleElement = document.getElementById("carousel-title");
    const videoElement = document.getElementById("carousel-video");
    const leftButton = document.getElementById("carousel-left");
    const rightButton = document.getElementById("carousel-right");

    const updateCarousel = () => {
        titleElement.textContent = videos[currentIndex].title;
        videoElement.src = videos[currentIndex].url;
    };

    leftButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        updateCarousel();
    });

    rightButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % videos.length;
        updateCarousel();
    });

    updateCarousel();
});

const initializePage = async () => {
    await fetchCypressDetails();

    if (cypressDetails) {
        document.getElementById('last-update').textContent = cypressDetails?.lastUpdate ? new Date(cypressDetails.lastUpdate).toLocaleDateString('en-US', fullDateStyle) : 'N/A';
        updateUI();
        AOS.refresh();
    }
}

AOS.init();
feather.replace();
initializePage();