Prog 2700
Explamation readme

1. how the project works

The Search: Once the user inputs a valid city name into the search bar. The
city name is put through the fetchWeather function with the use of
OpenWeatherAPI in the script.js file. Which produces a view of the current 
ongoing weather for the inputed area, as well as a 5-day weather forecast 
for the said area as well.

The Recent Searches: Each search that is made by the user gets saved nto 
localStorage and put into a list that can be seen in the "Recent Searches"
section of the page. It can have the 5 most recent searches at one time
and each entry also has a button next to them that adds that entry into
the favorites tab below

Favorites Tab: Add the enteries of cities from the recent searches tab.
Once you click that "Add to favorites" butons it gets added to the below tab in
localStorage. In favorites it has a delete button that will then remove
it from the favorites.

Fahrenheit to Celcius Switch: A simple button. Once it's clicked. It redoes
the fetching of the weather of the entered city, but now in Fahrenheit
(Celcius is the default)


How does jquery, axios, and lodash function in the program

Jquery: Mainly is used for DOM manipulation in the weather app. 
such as searchHistoryEl.append which is for adding new items to
the search history tab. It's also used for event handling like
a listener for the searching functionallity

Axios: Makes requests to external apis. This is mainly used for
fetching all of the weather data from OpenWeatherAPI

Lodash: Is a utility library that has some useful functions for working
with arrays. An example can be "const fetchWeather = _.debounce(async (city) => { ... }, 500);"
it uses the debounce function. Which limits the number of times 
that the featchWeather function can be called while someone is
typing in the search box
