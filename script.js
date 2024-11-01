document.getElementById("cityForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const city = document.getElementById("city").value;
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            document.getElementById("results").innerHTML = "<p>Oops! Couldn’t find anything!</p>";
            console.error("Error:", error);
        });
});

function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (results && results.length > 0) {
        results.forEach(location => {
            const locationInfo = document.createElement("p");
            locationInfo.textContent = `📍 City: ${location.name}, Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
            resultsDiv.appendChild(locationInfo);
        });
    } else {
        resultsDiv.innerHTML = "<p>No results found 🌸</p>";
    }
}
