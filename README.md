## Company Data App
* A React Native application that allows users to search, sort, and filter an in-memory dataset of companies.

# 1.Setup instructions
```
npm install
npm expo start
```
You can run the app using Expo Go on a mobile device or with an iOS/Android emulator

# 2.Description of architecture and logic choices
## 2.1 Search Logic
The search bar is the main entry point for the search flow, extra logic is added, so:
* Search only triggers after 3 characters are entered
* Input is debounced to prevent the logic from re-running on every keystroke while the user is typing

## 2.2 Custom Search
The search checks for: name, industry, CEO name ..etc. It searches for all fields simultaneously. Included extras are:
* Case-insensitivity for all fields
* Numeric queries such as founded_year > 2010

## 2.3 Filtering
The app uses AND logic for filtering, a company must match all selected criteria to be displayed. Supported filters include:
* Industry
* Minimum Revenue
* Company size

If no results match the active search and filters, a No results found message is shown.

## 2.4 Sorting
Users can toggle the sort order (ascending/descending) for company name, founded year, and revenue. 

## 2.5 Performance Optimization
The search, filter, and sort flow is wrapped in a useMemo hook to ensure the derived results are only recalculated when the relevant search or filter values change,

# Notes about any extra features or bonus challenges
* Custom Icon: Built using react-native-svg for the filter
* Integrated @react-native-community/slider and react-native-element-dropdown for an improved mobile-optimized experience





  






  

