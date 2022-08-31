
var styleAoi = {
    weight: 1,
    color: "#FF10F0",
    opacity: 1,
    fillColor: "#F7CCAC",
    fillOpacity: 0
}

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
                                    d > visionLegendValues[1] ? '#307ab9' : '#00447f'; // 3% - 6% : 0% - 3%
}

function visionStyle(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: visionColor(feature.properties.vision_age_std_prevalence) //  "#d3d3d3"
    };
}

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