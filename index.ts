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

  // const infoWindow = new google.maps.InfoWindow({
  //   content: '',
  //   disableAutoPan: true,
  // });

  // // Create an array of alphabetical characters used to label the markers.
  // const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>';

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

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
  var resp: MyInterface [] = [];
  getJSON('https://treloc.com/events', function (err, data) {
    // alert('r');
    if (err !== null) {
      alert('Something went wrong: ' + err);
      res = err;
    } else {
      // alert('Your query count: ' + data);
      // res = data;
      data.map(o => resp.push(o as MyInterface));
      
      // alert("ff" + resp.length)
      // resp.push(data[0] as MyInterface)


      const image =
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    const markers = data.map((event, i) => {
      alert("ff ")
      // const label = labels[i % labels.length];
      const marker = new google.maps.Marker({
        position: {lat: event.latitude, lng: event.longitude},
        // label: label,
        icon: image,
      });
  
      marker.addListener('click', () => {
        infowindow.setContent('ffff' + res + myObject[0].latitude),
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

const locations = [
  { lat: 46.774821, lng: 23.603592 },
  { lat: 46.774821, lng: 23.623592 },
];


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


interface MyInterface {
  latitude: number;
  longitude: number
}
var myObject: MyInterface [] = [];
  getJSON('https://treloc.com/events', function (err, data) {
    // alert('r');
    if (err !== null) {
      alert('Something went wrong: ' + err);
      // res = err;
    } else {
      // alert('Your query count: ' + data);
      // res = data;
      myObject.push(data[0] as MyInterface)
    }
  });


declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
