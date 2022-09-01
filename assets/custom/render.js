function highlightVision(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 3,
        color: '#22FFEE',
        fillOpacity: .5,
        fillColor: '#f22a77' // getLegendColor(feature.properties.AveragePerState)
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

function resetVisionHighlight(e) {
    visionLayer.resetStyle(e.target);
}

function onEachVision(feature, layer) {
    
    layer.on({
        mouseover: highlightVision,
        mouseout: resetVisionHighlight,
    });
    
    var popup = L.popup();
    // let strContent = '<div class="panel panel-default"><div class="panel-heading">' + feature.properties.ADMIN + '</div><div class="panel-body">Age-Standardised prevalence of all vision loss: ' + feature.properties.vision_age_std_prevalence + '%</div></div>';
    let strContent = '<h4 style="text-align: center; border-bottom:1px solid; padding-bottom:5px">' + feature.properties.ADMIN + '</h4><span class="text-center" >Age-Standardised prevalence of all vision loss: <b>' + feature.properties.vision_age_std_prevalence + '%</b></span>';
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