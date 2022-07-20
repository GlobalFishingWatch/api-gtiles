const nsLabelsLanguages = ['en', 'es', 'fr', 'pt', 'id'];

const nsLabelsStyles = [
  {
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#85bbd5' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#052555' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#85bbd5' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#001538' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#85bbd5' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#001538' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#85bbd5' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#001538' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8abbc7' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#001538' }],
  },
];

const tilesets = {
  sat: {
    mapType: 'satellite',
    language: 'en-US',
    region: 'us',
    scale: 'scaleFactor2x',
    highDpi: true,
  },
  ns: {
    mapType: 'roadmap',
    language: 'en-US',
    region: 'us',
    layerTypes: ['layerRoadmap'],
    scale: 'scaleFactor2x',
    highDpi: true,
    styles: [{ elementType: 'geometry', stylers: [{ color: '#001436' }] },
      { elementType: 'labels', stylers: [{ visibility: 'off' }] },
      { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#153d7e' }] },
      { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#153d7e' }, { weight: 1 }] },
      { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#153d7e' }, { weight: 1 }] },
      { featureType: 'poi', stylers: [{ visibility: 'off' }] },
      { featureType: 'road', stylers: [{ visibility: 'off' }] },
      { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#85bbd5' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
      { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#00265c' }] },
      { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#0088cc' }] }],
  },
  nslabels: {
    mapType: 'roadmap',
    language: 'en-US',
    region: 'us',
    layerTypes: ['layerRoadmap'],
    scale: 'scaleFactor2x',
    highDpi: true,
    overlay: 'true',
    styles: nsLabelsStyles,
  },
};

nsLabelsLanguages.forEach((language) => {
  tilesets[`nslabels_${language}`] = {
    ...tilesets.nslabels,
    language,
  };
});

module.exports = tilesets;
