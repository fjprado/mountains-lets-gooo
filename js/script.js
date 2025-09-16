let cypressDetails = {};

const fetchCypressDetails = async () => {    
    const apiResponse = await fetch('https://www.onthesnow.com/_next/data/2.8.5_en-US/british-columbia/cypress-mountain/ski-resort.json?region=british-columbia&resort=cypress-mountain');
    cypressData = (await apiResponse.json()).pageProps.fullResort;

    cypressDetails = {
        image: cypressData.smallImage,
        video: "https://www.youtube.com/embed/OSKgIDnBwwQ", 
        snow: {
            last24: 0,
            last48: 0,
            last72: 0
        },
        runsOpen: cypressData.runs.open,  
        runsOpenPercent: cypressData.runs.openPercent, 
        openingDate: cypressData.status.openingDate,
        daysForOpening: (Date.now() - new Date(cypressData.status.openingDate).getTime()) > 0 ? 0 : Math.ceil((new Date(cypressData.status.openingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        closingDate: cypressData.status.closingDate,
        lastUpdate: cypressData.updatedAt,
        currentWeather: {
            wind: cypressData.currentWeather.wind,
            snow: cypressData.currentWeather.snow,
            baseTemperature: 
                { 
                    min: cypressData.currentWeather.base.min, 
                    max: cypressData.currentWeather.base.max
                },
            type: cypressData.currentWeather.type,
        },
        forecast: cypressData.forecast.map(day => ({
            date: day.date, 
            snow: day.snow,
        }))
    };
}

fetchCypressDetails();