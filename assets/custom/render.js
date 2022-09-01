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