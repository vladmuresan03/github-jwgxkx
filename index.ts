/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { MarkerClusterer } from '@googlemaps/markerclusterer';

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 12,
      center: { lat: 46.774821, lng: 23.603592 },
    }
  );

  

  ////
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
  var res;
  var eventDTOs: MyInterface[] = [];

  const image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  getJSON('https://treloc.com/events', function (err, data) {
    // alert('r');
    if (err !== null) {
      alert('Something went wrong: ' + err);
    } else {
      data.map((o) => eventDTOs.push(o as MyInterface));

      const markers = eventDTOs.map((eventDTO, i) => {
        // const label = labels[i % labels.length];
        const marker = new google.maps.Marker({
          position: { lat: eventDTO.latitude, lng: eventDTO.longitude },
          // label: label,
          icon: image,
        });

        
  const infowindow = new google.maps.InfoWindow({});
        marker.addListener('click', () => {
          infowindow.setContent(eventDTO.data),
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
        });

        return marker;
      });

      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({ markers, map });
    }
  });
}


declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
