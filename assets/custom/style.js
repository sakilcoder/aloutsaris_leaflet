
var styleAoi = {
    weight: 1,
    color: "#FF10F0",
    opacity: 1,
    fillColor: "#F7CCAC",
    fillOpacity: 0
}

// ------------------ 1. Vision Style -----------------------------

visionLegendValues = [
    0, 3, 6, 9, 12, 15, 18, 21, 24, 27
]

function visionColor(d) {
    return d > visionLegendValues[9] ? '#e56140' : // 27% +
        d > visionLegendValues[8] ? '#ff975a' : // 24% - 27%
            d > visionLegendValues[7] ? '#ffb613' : // 21% - 24%
                d > visionLegendValues[6] ? '#ffeab1' : // 18% - 21%
                    d > visionLegendValues[5] ? '#d8e8e8' : // 15% - 18%
                        d > visionLegendValues[4] ? '#b9dbe8' : // 12% - 15%
                            d > visionLegendValues[3] ? '#7ab9d6' : // 9% - 12%
                                d > visionLegendValues[2] ? '#61a4c9' : // 6% - 9%
                                    d > visionLegendValues[1] ? '#307ab9' : // 3% - 6%
                                        d > visionLegendValues[0] ? '#00447f' : '#fff'; // 0% - 3% : null
}

function visionStyle(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: visionColor(feature.properties.vision_age_std_prevalence)
    };
}

// ------------------ 2. Screen Time Style -----------------------------

screenTimeColorValues = [
    260, 320, 360, 400, 440, 480, 520, 560, 600, 646
]
screenTimeLegendValues = [
    '04:25', '05:20', '06:00', '06:40', '07:20', '08:00', '08:40', '09:20', '10:00', '10:46'
]

function screenTimeColor(time) {
    let d = getTimeToSeconds(time);
    return d > screenTimeColorValues[9] ? '#003665' : // 27% +
        d > screenTimeColorValues[8] ? '#003d72' : // 24% - 27%
            d > screenTimeColorValues[7] ? '#00447f' : // 21% - 24%
                d > screenTimeColorValues[6] ? '#19568b' : // 18% - 21%
                    d > screenTimeColorValues[5] ? '#326998' : // 15% - 18%
                        d > screenTimeColorValues[4] ? '#4c7ca5' : // 12% - 15%
                            d > screenTimeColorValues[3] ? '#668eb2' : // 9% - 12%
                                d > screenTimeColorValues[2] ? '#7fa1bf' : // 6% - 9%
                                    d > screenTimeColorValues[1] ? '#99b4cb' :
                                        d > screenTimeColorValues[0] ? '#b2c6d8' : '#fff'; // 0% - 3% : null
}

function screenTimeStyle(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: screenTimeColor(feature.properties.screen_time+'')
    };
}


// ------------------ 3. Gamers percentage -----------------------------

gamersLegendValues = [
    0, 25, 40, 50
]

function gamersColor(d) {
    return d > gamersLegendValues[3] ? '#163053' : // 27% +
            d > gamersLegendValues[2] ? '#004e78' : // 6% - 9%
                d > gamersLegendValues[1] ? '#0075a8' : // 3% - 6%
                    d > gamersLegendValues[0] ? '#00a1c3' : '#fff'; // 0% - 3% : null
}

function gamersStyle(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: gamersColor(feature.properties.gamers_percent)
    };
}

// ------------------ 4. Smoking -----------------------------

gamersLegendValues = [
    0, 25, 40, 50
]

function gamersColor(d) {
    return d > gamersLegendValues[3] ? '#163053' : // 27% +
            d > gamersLegendValues[2] ? '#004e78' : // 6% - 9%
                d > gamersLegendValues[1] ? '#0075a8' : // 3% - 6%
                    d > gamersLegendValues[0] ? '#00a1c3' : '#fff'; // 0% - 3% : null
}

function gamersStyle(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: gamersColor(feature.properties.gamers_percent)
    };
}



// ----------------------------------

let GoogleIcon = function (html) {
    return L.divIcon({
        html: html,
        iconSize: [16, 16],
        className: 'my-google-icon'
    });
}

let pngIconStyle = L.Icon.extend({
    options: {
       iconSize: [16, 25]
    }
});

let pngIcon = function (url) {
    return new pngIconStyle({
        iconUrl: url
    })
}