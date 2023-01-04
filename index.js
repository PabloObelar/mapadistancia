let map = L.map("map").setView([-33.29501, -66.33563], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var provincia = [];

fetch(
  "https://raw.githubusercontent.com/leandroni1983/REST-API-Provincias-Argentinas/master/datasets/provincias.json"
)
  .then((response) => response.json())
  .then((data) => {
    for (prov of data) {
      if (
        prov.nombre.toLowerCase() === "jujuy" ||
        prov.nombre.toLowerCase() === "chubut"
      ) {
        provincia.push([prov.nombre, prov.centroide.lat, prov.centroide.lon]);
      }
    }
  })
  .then((data) => {
    console.log(provincia);
    createMarker(provincia);
  });

function createMarker(provincia) {
  let markerFrom = L.circleMarker([provincia[0][1], provincia[0][2]], {
    color: "#000eee",
    radius: 10,
  });
  let markerTo = L.circleMarker([provincia[1][1], provincia[1][2]], {
    color: "#F00",
    radius: 10,
  });
  var from = markerFrom.getLatLng();
  var to = markerTo.getLatLng();
  markerFrom.bindPopup(provincia[0][0] + from.toString());
  markerTo.bindPopup(provincia[1][0] + to.toString());
  map.addLayer(markerTo);
  map.addLayer(markerFrom);
  getDistance(from, to);
}

function getDistance(from, to) {
  var container = document.getElementById("distancia");
  container.innerHTML =
    "Distancia entre las provincias:  " +
    from.distanceTo(to).toFixed(0) / 1000 +
    " km";
}
