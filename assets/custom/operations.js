const csvUrl = 'assets/data/data.csv';

const fetchText = async (url) => {
    const response = await fetch(url);
    return await response.text();
}

let addVisionLayer = function(){
    visionLayer = L.geoJson(countries, {
        style: visionStyle,
        onEachFeature: onEachVision,
        attribution: 'Source: Data from VLEG/GBD 2020 model, accessed via the IAPB Vision Atlas',
    }).addTo(map);  
}

let addScreenTimeLayer = function(){
    screenTimeLayer = L.geoJson(countries, {
        style: screenTimeStyle,
        onEachFeature: onEachScreenTime,
        attribution: 'Source: Comparitech',
    });
}
let addGamersLayer = function(){
    gamersLayer = L.geoJson(countries, {
        style: gamersStyle,
        onEachFeature: onEachGamers,
        attribution: 'Source: Newzoo Global Games Market Report, 2019',
    });
}
let addSmokingLayer = function(){
    smokingLayer = L.geoJson(countries, {
        // style: smokingStyle,
        // onEachFeature: onEachsmoking,
        attribution: 'Source: World Health Organization (WHO)',
    });
}
