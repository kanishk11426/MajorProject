// const Listing = require("../../models/listings");

console.info("Map script loaded.");

const mapContainer = document.getElementById("map");
const mapStatus = document.getElementById("map-status");
const mapToken = mapContainer?.dataset.mapToken;
const locationName = mapContainer?.dataset.mapLocation;
let coordinates;

try {
  coordinates = JSON.parse(mapContainer?.dataset.mapCoordinates || "[]");
} catch (error) {
  console.error("Listing map coordinates are invalid.", error);
}

if (!mapContainer || !mapStatus) {
  console.error("Map container or status element is missing.");
} else if (!mapToken) {
  mapStatus.textContent = "Map unavailable: the Mapbox access token is not configured.";
} else if (
  !Array.isArray(coordinates) ||
  coordinates.length !== 2 ||
  !coordinates.every(Number.isFinite) ||
  Math.abs(coordinates[0]) > 180 ||
  Math.abs(coordinates[1]) > 90
) {
  mapStatus.textContent = "Map unavailable: this listing does not have valid location coordinates.";
} else if (!window.mapboxgl) {
  mapStatus.textContent = "Map unavailable: the Mapbox library could not be loaded.";
} else {
  const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: mapContainer,
    style: "mapbox://styles/mapbox/satellite-streets-v12",
    center: coordinates,
    zoom: 6,
  });

  map.on("load", () => {
    console.info("Map loaded successfully.");
    mapStatus.textContent = "";
  });

  map.on("error", (event) => {
    console.error("Mapbox map error:", event.error);
    mapStatus.textContent = "The map could not be loaded. Check the Mapbox access token and network connection.";
  });

  const popupContent = document.createElement("div");
  const popupTitle = document.createElement("h4");
  popupTitle.textContent = locationName || "Listing location";
  const popupDescription = document.createElement("p");
  popupDescription.textContent = "Exact location will be provided after booking";
  popupContent.append(popupTitle, popupDescription);

  new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25, className: "my-class" })
        .setDOMContent(popupContent)
    )
    .addTo(map);
}