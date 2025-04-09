$(document).ready(function () {

    const apiKey = "2094f9f8d9175dbb1d6f94a9a34a3f75";
    const weatherInfo = $("#weatherInfo");
    const searchHistoryEl = $("#searchHistory");
    const favoritesListEl = $("#favoritesList");
    const toggleUnitBtn = $("#toggleUnitBtn");

    // Load search history and favorites from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let isCelsius = true; // Default unit is Celsius
    updateSearchHistory();
    updateFavoritesList();

    // Function to fetch weather data
    const fetchWeather = _.debounce(async (city) => {
        if (!city) return;
        
        try {
            // Fetch 5-day forecast data
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${isCelsius ? 'metric' : 'imperial'}`);
            const data = response.data;
            
            // Current weather data
            const currentWeather = data.list[0];

            // Display current weather
            weatherInfo.html(`
                <h2>${data.city.name}</h2>
                <p>🌡 Temperature: ${currentWeather.main.temp}°${isCelsius ? 'C' : 'F'}</p>
                <p>💨 Wind Speed: ${currentWeather.wind.speed} m/s</p>
                <p>💧 Humidity: ${currentWeather.main.humidity}%</p>
            `);

            // Display 5-day forecast
            let forecastHTML = '<h3>5-Day Forecast</h3><ul>';
            data.list.forEach((forecast, index) => {
                if (index % 8 === 0) {  // Data every 3 hours, so we pick 5 data points
                    forecastHTML += `
                        <li>
                            <strong>${new Date(forecast.dt * 1000).toLocaleDateString()}</strong><br>
                            Temp: ${forecast.main.temp}°${isCelsius ? 'C' : 'F'}<br>
                            Wind Speed: ${forecast.wind.speed} m/s
                        </li>
                    `;
                }
            });
            forecastHTML += '</ul>';
            weatherInfo.append(forecastHTML);

            // Save the city in search history
            if (!searchHistory.includes(city)) {
                searchHistory.push(city);
                if (searchHistory.length > 5) searchHistory.shift(); // Keep only last 5
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                updateSearchHistory();
            }

        } catch (error) {
            weatherInfo.html("<p style='color:red;'>City not found. Try again.</p>");
        }
    }, 500); // Debounce to avoid excessive API calls

    // Event Listener for Search Button
    $("#searchBtn").click(() => {
        const city = $("#cityInput").val().trim();
        fetchWeather(city);
    });

    // Click on a history item to re-fetch weather
    searchHistoryEl.on("click", "li", function () {
        fetchWeather($(this).text());
    });

    // Add city to favorites
    favoritesListEl.on("click", "li", function () {
        fetchWeather($(this).text());
    });

    // Event Listener for Toggle Unit Button
    toggleUnitBtn.click(() => {
        isCelsius = !isCelsius; // Toggle the unit
        const unitText = isCelsius ? 'Celsius' : 'Fahrenheit';
        toggleUnitBtn.text(`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`);
        
        // Re-fetch weather for the current city to update the unit
        const currentCity = $("#cityInput").val().trim();
        if (currentCity) {
            fetchWeather(currentCity);
        }
    });

    // Event listener for adding city to favorites
    function addToFavorites(city) {
        if (!favorites.includes(city)) {
            favorites.push(city);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateFavoritesList();
        }
    }

    // Click to add a city from the history to favorites
    searchHistoryEl.on("click", "li .add-to-favorites", function (e) {
        e.stopPropagation();
        const city = $(this).parent().text();
        addToFavorites(city);
    });

    // Update search history UI
    function updateSearchHistory() {
        searchHistoryEl.html("");
        searchHistory.forEach(city => {
            searchHistoryEl.append(`
                <li>${city} <button class="add-to-favorites">Add to Favorites</button></li>
            `);
        });
    }

    // Update favorites UI
    function updateFavoritesList() {
        favoritesListEl.html("");
        favorites.forEach(city => {
            favoritesListEl.append(`
                <li>
                    ${city} 
                    <button class="delete-favorite">Delete</button>
                </li>
            `);
        });
    }

    // Event listener for deleting a favorite city
    favoritesListEl.on("click", "li .delete-favorite", function (e) {
        e.stopPropagation();  // Prevent triggering the click on the list item
        
        const city = $(this).parent().text().replace(" Delete", "").trim();  // Extract city name
        // Remove the city from the favorites array
        favorites = favorites.filter(fav => fav !== city);
        localStorage.setItem("favorites", JSON.stringify(favorites));  // Save updated favorites list to localStorage
        updateFavoritesList();  // Re-render the favorites list
    });
});