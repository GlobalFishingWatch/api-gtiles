const nsLabelsLanguages = ['en', 'es', 'fr', 'pt', 'id']

const nsLabelsStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#001436"
      },
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#153d7e"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#85bbd5"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#001538"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#153d7e"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#85bbd5"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#001538"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#153d7e"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#85bbd5"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#001538"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8abbc7"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#001538"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b"
      }
    ]
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#00265c"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#0088cc"
      }
    ]
  }
]
const tilesets = {
  sat: {
    mapType: "satellite",
    language: "en-US",
    region: "us",
    scale: "scaleFactor2x",
    highDpi: true
  },
  ns: {
    mapType: "roadmap",
    language: "en-US",
    region: "us",
    layerTypes: ["layerRoadmap"],
    scale: "scaleFactor2x",
    highDpi: true,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#001436"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#153d7e"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#153d7e"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#153d7e"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#00265c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#0088cc"
          }
        ]
      }
    ]
  },
  nslabels: {
    mapType: "roadmap",
    language: "en-US",
    region: "us",
    layerTypes: ["layerRoadmap"],
    scale: "scaleFactor2x",
    highDpi: true,
    overlay: "true",
    styles: nsLabelsStyles
  }
};

nsLabelsLanguages.forEach((language) => {
  tilesets[`nslabels_${language}`] = {
    ...tilesets.nslabels,
    language,
  }
})

module.exports = tilesets;
