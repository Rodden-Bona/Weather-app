# **Applied Project: Weather Dashboard Using jQuery, Axios, and Lodash**

## **Objective**
In this project, you will create a **Weather Dashboard** that fetches and displays real-time weather data using the OpenWeatherMap API. You will integrate three JavaScript libraries—**jQuery, Axios, and Lodash**—to enhance functionality, simplify API requests, and optimize performance.  

This project will help you practice **DOM manipulation, API integration, and data handling** using modern JavaScript libraries.

---

## **Project Requirements**
- Use **jQuery** for DOM manipulation and event handling.
- Use **Axios** to fetch weather data from the OpenWeatherMap API.
- Use **Lodash** to optimize API calls (e.g., debounce search queries).
- Store **recent searches** in `localStorage` and display them.
- Allow users to **search for a city** and view:
  - Temperature  
  - Wind speed  
  - Humidity  
- Display the last **5 searched cities** as clickable history items.

---

## **Starter Code**
Below is the **starter template** to help you begin.

---

### 📂 **Project Structure**
```
/weather-dashboard
│── index.html       # UI Layout
│── style.css        # Basic Styling
│── script.js        # JavaScript Logic (jQuery, Axios, Lodash)
```

---

### **📝 `index.html` (HTML UI Layout)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash/lodash.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Weather Dashboard</h1>
        <div class="search-box">
            <input type="text" id="cityInput" placeholder="Enter city name">
            <button id="searchBtn">Search</button>
        </div>
        <div id="weatherInfo"></div>
        <h2>Recent Searches</h2>
        <ul id="searchHistory"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

---

### **🎨 `style.css` (Basic Styling)**
```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
}

.container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    background: white;
    box-shadow: 0px 0px 10px gray;
    border-radius: 10px;
}

.search-box {
    margin-bottom: 20px;
}

input {
    padding: 8px;
    width: 70%;
}

button {
    padding: 8px;
    cursor: pointer;
}

#weatherInfo {
    margin-top: 20px;
    font-size: 18px;
}

#searchHistory {
    list-style: none;
    padding: 0;
}

#searchHistory li {
    background: #ddd;
    margin: 5px 0;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
}
```

---

### **📝 `script.js` (JavaScript Logic with jQuery, Axios & Lodash)**
```js
$(document).ready(function () {
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
    const weatherInfo = $("#weatherInfo");
    const searchHistoryEl = $("#searchHistory");

    // Load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    updateSearchHistory();

    // Function to fetch weather data
    const fetchWeather = _.debounce(async (city) => {
        if (!city) return;
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = response.data;
            
            weatherInfo.html(`
                <h2>${data.name}</h2>
                <p>🌡 Temperature: ${data.main.temp}°C</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `);

            // Store the city in search history
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

    // Update search history UI
    function updateSearchHistory() {
        searchHistoryEl.html("");
        searchHistory.forEach(city => {
            searchHistoryEl.append(`<li>${city}</li>`);
        });
    }
});
```

---

## **🎯 Assignment Tasks**
1. ✅ **Implement the starter template** and ensure it works.  
2. 🔄 **Extend functionality**:
   - Show a **5-day weather forecast**.
   - Add a **toggle button** to switch between **Celsius and Fahrenheit**.
   - Implement a **"Favorites" feature** to save frequently searched cities.  
4. 📝 **Write a README.md** explaining:
   - How the project works.
   - How **jQuery, Axios, and Lodash** are used.
   - Any additional features you implemented.

---

## **Grading Rubric**
| Criteria | Points |
|----------|--------|
| Implements **jQuery** for DOM manipulation | 25 |
| Uses **Axios** for API requests | 25 |
| Utilizes **Lodash** for data processing | 25 |
| Code quality, documentation, and creativity | 25 |
| **Total** | **100** |

---

## **Challenge**
- Integrate **GeoLocation API** to auto-detect the user’s city.

---

## **Submission Instructions**
- Submit a **GitHub repository link** with your completed project.
- Include a **README.md** file explaining the project.

---

This project offers hands-on experience in working with **popular JavaScript libraries** while building a real-world application.