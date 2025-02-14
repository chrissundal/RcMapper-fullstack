import getCityName from "@/components/fetch/fetchCity.js";

let lat;
let long;
let User;

function extracted(e, user) {
    let newTitle = '';
    let description = '';
    let category = '';

    lat = e.latlng.lat;
    long = e.latlng.lng;
    User = user;

    let content = `
    <form class="new-location" onsubmit="postNewLocation(event)">
      <input oninput="window.newTitle=this.value" type="text" placeholder="Skriv inn en tittel..." minlength="4" required>
      <input oninput="window.description=this.value" type="text" placeholder="Skriv inn en beskrivelse..." minlength="20" required>
      <div>
          Velg kategori:  <select onchange="window.category=this.value" required>
            <option></option>
            <option value="Car">Bil</option>
            <option value="Crawler">Crawler</option>
            <option value="Plane">Fly</option>
            <option value="Drone">Drone</option>
            <option value="Quad">Quad</option>
          </select>
    </div>
      <button type="submit"">Lagre</button>
    </form>
  `;
    return content;
}

window.postNewLocation = async (event) => {
    event.preventDefault();
    let city = await getCityName(lat, long);
    let newLoc = {
        locationId: null,
        userId: User.id,
        latitude: lat,
        longitude: long,
        title: window.newTitle,
        description: window.description,
        createdAt: new Date(),
        category: window.category,
        city: city,
    };
    await handlePostNewLocation(newLoc);
};

export default extracted;

