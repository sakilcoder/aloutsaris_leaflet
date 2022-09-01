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
