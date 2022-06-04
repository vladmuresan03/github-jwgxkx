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

  const infoWindow = new google.maps.InfoWindow({
    content: '',
    disableAutoPan: true,
  });

  // Create an array of alphabetical characters used to label the markers.
  const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
      position,
      label,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener('click', () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });

    return marker;
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map });
}

const locations = [
  { lat: 46.774821, lng: 23.603592 }
];

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
