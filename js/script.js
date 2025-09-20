let cypressDetails = {};

const fetchCypressDetails = async () => {
    //const response = await fetch('https://mountains-lets-gooo-api.onrender.com/api/cypress-data');
    //cypressDetails = await response.json();
    cypressDetails = cypressDataJson;
    updateUI();
}

const updateUI = () => {
    // Set background color based on weather type
    const body = document.body;
    switch (cypressDetails.currentWeather.type) {
        case 'clear-day':
            body.style.backgroundColor = 'yellow';
            break;
        case 'clear-night':
        case 'partly-cloudy-night':
            body.style.backgroundColor = 'black';
            break;            
        case 'partly-cloudy-day':
            body.style.backgroundColor = 'lightblue';
            break;
        case 'rain':
        case 'sleet':
            body.style.backgroundColor = 'white';
            break;
        case 'cloudy':
        case 'snow':            
        case 'wind':
        case 'fog':
            body.style.backgroundColor = 'lightgray';
            break;
        default:
            body.style.backgroundColor = 'lightblue'; // Default background
    }
};

fetchCypressDetails();