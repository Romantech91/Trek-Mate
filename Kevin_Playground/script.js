// Initialize map
let map;
let markers = []; // Array to keep track of markers

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
  });
}

// Function to fetch park data based on state code and add markers
async function fetchAndDisplayTrails(stateCode) {
  const apiKey = "HfOQ2etycKeP0ifqPT1n1ItZKA72HkGjLgtNQPgL";
  const apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch trail data.");
    }

    const data = await response.json();
    const trails = data.data;

    // Clear existing markers and reset bounds
    clearMarkers();
    const bounds = new google.maps.LatLngBounds();

    // Loop through trails and add markers
    trails.forEach((trail) => {
      if (trail.latLong) {
        const [lat, lng] = trail.latLong
          .replace("lat:", "")
          .replace("long:", "")
          .split(",")
          .map((coord) => parseFloat(coord.trim()));

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: trail.fullName,
        });

        // Store marker in the array
        markers.push(marker);

        // Extend bounds to include each marker's position
        bounds.extend({ lat, lng });

        // Add info window for each marker
        const infoWindow = new google.maps.InfoWindow({
          content: `<h3>${trail.fullName}</h3><p>${trail.description}</p><a href="${trail.url}" target="_blank">More Info</a>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    });

    // Adjust the map to fit all markers
    map.fitBounds(bounds);
  } catch (error) {
    console.error("Error fetching trail data:", error);
    alert("Unable to load trails. Please try again later.");
  }
}

// Function to clear all existing markers
function clearMarkers() {
  markers.forEach((marker) => {
    marker.setMap(null); // Remove marker from map
  });
  markers = []; // Reset markers array
}

// Add event listener to input
document.getElementById("stateInput").addEventListener("change", (event) => {
  const stateCode = event.target.value.toUpperCase();
  fetchAndDisplayTrails(stateCode);
});

