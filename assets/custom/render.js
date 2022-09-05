function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 3,
        color: '#22FFEE',
        fillOpacity: .5,
        fillColor: '#f22a77'
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

// ------------------- 1. Vision ----------------------------

function resetVisionHighlight(e) {
    visionLayer.resetStyle(e.target);
}

function onEachVision(feature, layer) {
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetVisionHighlight,
    });
    
    if(feature.properties.vision_age_std_prevalence != null){
        var popup = L.popup();
        let strContent = '<h4 style="text-align: center; border-bottom:1px solid; padding-bottom:5px">' + feature.properties.ADMIN + '</h4><span class="text-center" >Age-Standardised prevalence of all vision loss: <b>' + feature.properties.vision_age_std_prevalence + '%</b></span>';
        popup.setContent(strContent);
        layer.bindPopup(popup, popupOptions);    
    }
    layer.on('mouseover', function (e) {
        if(e.sourceTarget.feature.properties.vision_age_std_prevalence!=null){
            var popup = e.target.getPopup();
            popup.setLatLng(e.latlng).openOn(map);
        }
    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });

}

// ---------------------- 2. Screen Time ------------------------

function resetScreenTimeHighlight(e) {
    screenTimeLayer.resetStyle(e.target);
}

function onEachScreenTime(feature, layer) {
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetScreenTimeHighlight,
    });
    
    if(feature.properties.screen_time != null){
        var popup = L.popup();
        let strContent = '<h4 style="text-align: center; border-bottom:1px solid; padding-bottom:5px">' + feature.properties.ADMIN + '</h4><span class="text-center" >Screen Time: <b>' + feature.properties.screen_time + ' hours</b></span>';
        popup.setContent(strContent);
        layer.bindPopup(popup, popupOptions);    
    }
    layer.on('mouseover', function (e) {
        if(e.sourceTarget.feature.properties.screen_time!=null){
            var popup = e.target.getPopup();
            popup.setLatLng(e.latlng).openOn(map);
        }
    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });

}

// ---------------------- 3. Gamers ------------------------

function resetGamersHighlight(e) {
    gamersLayer.resetStyle(e.target);
}

function onEachGamers(feature, layer) {
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetGamersHighlight,
    });
    
    if(feature.properties.gamers_percent != null){
        var popup = L.popup();
        let strContent = '<h4 style="text-align: center; border-bottom:1px solid; padding-bottom:5px">' + feature.properties.ADMIN + '</h4><span class="text-center" >Number of Gamers as a Proportion of Total Population: <b>' + feature.properties.gamers_percent + '%</b></span>';
        popup.setContent(strContent);
        layer.bindPopup(popup, popupOptions);    
    }
    layer.on('mouseover', function (e) {
        if(e.sourceTarget.feature.properties.gamers_percent!=null){
            var popup = e.target.getPopup();
            popup.setLatLng(e.latlng).openOn(map);
        }
    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });

}
// ---------------------- 4. smoking ------------------------

function resetSmokingHighlight(e) {
    smokingLayer.resetStyle(e.target);
}

function onEachsmoking(feature, layer) {
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetSmokingHighlight,
    });
    
    var popup = L.popup();
    let strContent = '<h4 style="text-align: center; border-bottom:1px solid; padding-bottom:5px">' + feature.properties.ADMIN + '</h4>' + 
                    '<span class="text-center" >Total Smoking Rate: <b>' + feature.properties.smoking_rate_both + '%</b><br>'+
                    'Male Smoking Rate: <b>' + feature.properties.smoking_rate_male + '%</b><br>'+
                    'Female Smoking Rate: <b>' + feature.properties.smoking_rate_female + '%</b>'+
                    '</span>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}
// ---------------------- 5. Air Pollution ------------------------

function resetAirPollutionHighlight(e) {
    airPollutionLayer.resetStyle(e.target);
}

function onEachAirPollution(feature, layer) {
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetAirPollutionHighlight,
    });
    
    var popup = L.popup();
    let strContent = '<h4 style="text-align: center; border-bottom:1px solid; padding-bottom:5px">' + feature.properties.ADMIN + '</h4>' + 
                    '<span class="text-center" >Annual median concentration of particulate air pollution: <b>' + feature.properties.air_pollution_mgpcm + '</b> (micrograms of particles per cubic meter)'+
                    '</span>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}
// ---------------------- 6. Diabetes ------------------------

function resetDiabetesHighlight(e) {
    diabetesLayer.resetStyle(e.target);
}

function onEachDiabetes(feature, layer) {
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetDiabetesHighlight,
    });
    
    var popup = L.popup();
    let strContent = '<h4 style="text-align: center; border-bottom:1px solid; padding-bottom:5px">' + feature.properties.ADMIN + '</h4>' + 
                    '<span class="text-center" ><b>' + feature.properties.diabetes_prevalence_percent + '%</b> of population ages 20 to 79 in 2021'+
                    '</span>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}
