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

let activeLayer = 1;

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
    addScreenTimeLayer();
    addGamersLayer();
    addSmokingLayer();
    addAirPollutionLayer();
    addDiabetesPrevalenceLayer();

    overlays['Age-std prevalence of all vision loss by country 2020'] = visionLayer;
    overlays['Screen Time Statistics'] = screenTimeLayer;
    overlays['Number of Gamers as a Proportion of Total Population'] = gamersLayer;
    overlays['Smoking Rates by Country 2022'] = smokingLayer;
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
    // console.log(str);
    return str;
}

let getScreenTimeLegend = function(){
    let labels = [];
    let from, to;
    str = '<h4 align="center">Screen Time <br><span style="text-align: center; font-size: smaller">(hours)</span></h4>';
    for (var i = 0; i < screenTimeLegendValues.length; i++) {
        from = screenTimeLegendValues[i];
        to = screenTimeLegendValues[i + 1];

        labels.push(
            '<i style="background:' + screenTimeColor(from) + '"></i> ' +
            from + '' + (to ? ' &ndash; ' + to + '' : '+'));
    }
    str += labels.join('<br>');
    // console.log(str);
    return str;
}

let getGamersLegend = function(){
    let labels = [];
    let from, to;
    str = '<h4 align="center">Gamers</h4>';
    for (var i = 0; i < gamersLegendValues.length; i++) {
        from = gamersLegendValues[i];
        to = gamersLegendValues[i + 1];
        labels.push(
            '<i style="background:' + gamersColor(from + 1) + '"></i> ' +
            from + '%' + (to ? ' &ndash; ' + to + '%' : '+'));
    }
    str += labels.join('<br>');
    return str;
}
let getSmokingLegend = function(){
    let labels = [];
    let from, to;
    str = '<h4 align="center">Smoking Rates</h4>';
    for (var i = 0; i < smokingLegendValues.length; i++) {
        from = smokingLegendValues[i];
        to = smokingLegendValues[i + 1];
        labels.push(
            '<i style="background:' + smokingColor(from + 1) + '"></i> ' +
            from + '%' + (to ? ' &ndash; ' + to + '%' : '+'));
    }
    str += labels.join('<br>');
    return str;
}
let getAirPollutionLegend = function(){
    let labels = [];
    let from, to;
    str = '<h4 align="center">Air Pollution</h4>';
    str += '<p align="center">(micrograms of particles per cubic meter)</p>';
    for (var i = 0; i < airPollutionStyleLegendValues.length; i++) {
        from = airPollutionStyleLegendValues[i];
        to = airPollutionStyleLegendValues[i + 1];
        labels.push(
            '<i style="background:' + airPollutionColor(from + 1) + '"></i> ' +
            from + '' + (to ? ' &ndash; ' + to + '' : '+'));
    }
    str += labels.join('<br>');
    return str;
}

let getDiabetesLegend = function(){
    let labels = [];
    let from, to;
    str = '<h4 align="center">Diabetes Prevalence</h4>';
    for (var i = 0; i < diabetesLegendValues.length; i++) {
        from = diabetesLegendValues[i];
        to = diabetesLegendValues[i + 1];
        labels.push(
            '<i style="background:' + diabetesColor(from + 1) + '"></i> ' +
            from + '%' + (to ? ' &ndash; ' + to + '%' : '+'));
    }
    str += labels.join('<br>');
    return str;
}


legend.update = function (props) {
    let str = '';
    if(activeLayer==1){
        str += getVisionLegend();
    }else if(activeLayer == 2){
        str += getScreenTimeLegend();
    }else if(activeLayer == 3){
        str += getGamersLegend();
    }else if(activeLayer == 4){
        str += getSmokingLegend();
    }else if(activeLayer == 5){
        str += getAirPollutionLegend();
    }else if(activeLayer == 6){
        str += getDiabetesLegend();
    }


    this._div.innerHTML = str;
};

legend.addTo(map);

map.on('baselayerchange', function (e) {
    // console.log(e.name);
    // console.log(e.layer);
    if(e.name=='Age-std prevalence of all vision loss by country 2020'){
        activeLayer = 1;
    }else if(e.name=='Screen Time Statistics'){
        activeLayer = 2;
    }else if(e.name=='Number of Gamers as a Proportion of Total Population'){
        activeLayer = 3;
    }else if(e.name=='Smoking Rates by Country 2022'){
        activeLayer = 4;
    }else if(e.name=='Air Pollution'){
        activeLayer = 5;
    }else if(e.name=='Diabetes Prevalence'){
        activeLayer = 6;
    }

    legend.update();
});
