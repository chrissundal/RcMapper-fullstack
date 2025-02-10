import { state } from '@/components/user.js';
import postLocation from './post/postLocation.js';
import fetchLocations from "./fetch/locationsFetch.js";

let lat;
let long;
let newMap;
let newPopup;

function extracted(e, map, popup) {
    let newTitle = '';
    let description = '';
    let category = '';

    lat = e.latlng.lat;
    long = e.latlng.lng;
    newMap = map;
    newPopup = popup;

    let content = `
    <div class="new-location">
      <input oninput="window.newTitle=this.value" type="text" placeholder="Title">
      <input oninput="window.description=this.value" type="text" placeholder="Description">
      <select onchange="window.category=this.value">
        <option></option>
        <option value="Car">Car</option>
        <option value="Crawler">Crawler</option>
        <option value="Drone">Drone</option>
        <option value="Plane">Plane</option>
        <option value="Quad">Quad</option>
      </select>
      <button onclick="postNewLocation()">Lagre</button>
    </div>
  `;

    return content;
}

window.postNewLocation = async () => {
    let newLoc = {
        locationId: null,
        userId: state.userId,
        latitude: lat,
        longitude: long,
        title: window.newTitle,
        description: window.description,
        createdAt: null,
        category: window.category
    };
    await postLocation(newLoc);
    fetchLocations(newMap);
    newPopup.close();
};

export default extracted;
