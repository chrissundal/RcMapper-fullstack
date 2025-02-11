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
    console.log(User.id);
    let newLoc = {
        locationId: null,
        userId: User.id,
        latitude: lat,
        longitude: long,
        title: window.newTitle,
        description: window.description,
        createdAt: null,
        category: window.category
    };
    await handlePostNewLocation(newLoc);
};

export default extracted;

