import L from "leaflet";

const icons = {
  Drone: L.icon({
    iconUrl: '/icons/drone.png',
    iconSize: [25, 25],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Crawler: L.icon({
    iconUrl: '/icons/crawler.png',
    iconSize: [25, 25],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Plane: L.icon({
    iconUrl: '/icons/plane.png',
    iconSize: [25, 25],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Quad: L.icon({
    iconUrl: '/icons/quad.png',
    iconSize: [25, 25],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Car: L.icon({
    iconUrl: '/icons/car.png',
    iconSize: [25, 25],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};
export default icons;
