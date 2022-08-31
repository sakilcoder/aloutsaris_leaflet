// 1. vision
// 2. screen time
// 3. gamers percentage
// 4. Smoking
// 5. Air pollution
// 6. diabetes prevalence

let visionLayer = L.layerGroup();
let screenTimeLayer = L.layerGroup();
let gamersLayer = L.layerGroup();
let smokingLayer = L.layerGroup();
let airPollutionLayer = L.layerGroup();
let diabetesLayer = L.layerGroup();

var map = L.map('map', {
    layers: [noBasemap, visionLayer],
}).setView([45, 0], 2);
map.options.minZoom = 2;
map.options.maxZoom = 8;

// basemapCarto.addTo(map);

L.easyButton('fa-home fa-lg', function () {
    map.setView([45, 0], 2);
}).addTo(map);

var baseLayers = {
    'No Basemap': noBasemap,
    'Carto': basemapCarto,
    'Google': googleTerrain,
    'OSM': OpenStreetMap_Mapnik,
    'Satellite': Esri_WorldImagery,
};

let overlays ={};

fetchText(csvUrl).then(text => {
    let data = d3.csvParse(text);
    // console.log(data);
    // console.log(countries.features.length);

    for (i = 0; i < countries.features.length; i++) {
        let cid = countries.features[i].properties.cid;
        adata = _.where(data, {cid: cid.toString()})
        // console.log(adata);
        if(adata.length>0){
            countries.features[i].properties.vision_age_std_prevalence = adata[0].vision_age_std_prevalence;
            countries.features[i].properties.vision_crude_revalence = adata[0].vision_crude_revalence;
            countries.features[i].properties.vision_population = adata[0].vision_population;
            countries.features[i].properties.screen_time = adata[0].screen_time;
            countries.features[i].properties.gamers_percent = adata[0].gamers_percent;
            countries.features[i].properties.smoking_rate_both = adata[0].smoking_rate_both;
            countries.features[i].properties.smoking_rate_female = adata[0].smoking_rate_female;
            countries.features[i].properties.smoking_rate_male = adata[0].smoking_rate_male;
            countries.features[i].properties.air_pollution_mgpcm = adata[0].air_pollution_mgpcm;
            countries.features[i].properties.diabetes_prevalence_percent = adata[0].diabetes_prevalence_percent;
        }
    }
    // console.log(countries);

    addVisionLayer();

    overlays['Vision'] = visionLayer;
    overlays['Screen Time'] = screenTimeLayer;
    overlays['Gamers Percentage'] = gamersLayer;
    overlays['Smoking'] = smokingLayer;
    overlays['Air Pollution'] = airPollutionLayer;
    overlays['Diabetes Prevalence'] = diabetesLayer;

    var layerControl = L.control.layers(overlays).addTo(map);

});

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info legend');
    this.update();
    return this._div;
};

let getVisionLegend = function(){
    let labels = [];
    let from, to;
    str = '<h4 align="center">Vision</h4>';
    for (var i = 0; i < visionLegendValues.length; i++) {
        from = visionLegendValues[i];
        to = visionLegendValues[i + 1];

        labels.push(
            '<i style="background:' + visionColor(from + 1) + '"></i> ' +
            from + '%' + (to ? ' &ndash; ' + to + '%' : '+'));
    }
    str += labels.join('<br>');
    console.log(str);
    return str;
}

legend.update = function (props) {
    let str = '';
    if(visionLayer){
        str += getVisionLegend();
    }
    this._div.innerHTML = str;
};

legend.addTo(map);

map.on('baselayerchange', function (e) {
    console.log(e.name);
    console.log(e.layer);
});

