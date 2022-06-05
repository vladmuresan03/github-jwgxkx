'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
var isOpen = false;
var markerclusterer_1 = require('@googlemaps/markerclusterer');
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: { lat: 46.774821, lng: 23.603592 },
  });
  var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };
  var eventDTOs = [];
  var image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  getJSON('https://treloc.com/events', function (err, data) {
    if (err !== null) {
      alert('Something went wrong: ' + err);
    } else {
      data.map(function (o) {
        return eventDTOs.push(o);
      });
      var markers = eventDTOs.map(function (eventDTO, i) {
        // const label = labels[i % labels.length];
        var marker = new google.maps.Marker({
          position: { lat: eventDTO.latitude, lng: eventDTO.longitude },
          // label: label,
          icon: image,
        });
        var infowindow = new google.maps.InfoWindow({});
        marker.addListener('click', function () {
          infowindow.setContent(eventDTO.data),
            infowindow.open({
              anchor: marker,
              map: map,
              shouldFocus: false,
            });
        });
        return marker;
      });
      // Add a marker clusterer to manage the markers.
      new markerclusterer_1.MarkerClusterer({ markers: markers, map: map });
    }
  });
}
window.initMap = initMap;
