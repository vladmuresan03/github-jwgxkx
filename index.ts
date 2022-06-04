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

  // Create an array of alphabetical characters used to label the markers.
  const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  // Add some markers to the map.
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
      position: position,
      label: label,
      title: "Hello World!",
      icon: image
    });

    marker.addListener("click", () => {
      // invowindow.setContent("")
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  

  //   // markers can only be keyboard focusable when they have click listeners
  //   // open info window when marker is clicked
  //   marker.addListener('click', () => {
  //     infoWindow.setContent(label);
  //     infoWindow.open(map, marker);
  //   });

    return marker;
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map });
}

const locations = [
  { lat: 46.774821, lng: 23.603592 },
  { lat: 46.774821, lng: 23.623592 }
];

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};