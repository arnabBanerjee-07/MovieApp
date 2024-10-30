# MovieApp
Movie App is a React Native app that fetches data from The Movie Database (TMDB) API, allowing users to explore popular movies, view detailed information, and bookmark favorites. The app also offers customizable settings, including dark/light theme switching and language options for a personalized experience.

# System Environment
Node.js: Version 18.17.0
NPM: Version 9.6.7
Java Development Kit (JDK): Version 17.0.6

# Installation Instructions
git clone -b "App" https://github.com/arnabBanerjee-07/MovieApp.git

cd App

# install Dependencies
npm install

# Start Metro Server
npx react-native start

# Run the Project
npx react-native run-android (For Android)
npx react-native run-ios (for iOS)

# APK Build Instructions
cd android
./ gradlew assembleRelease

# Key Features
Signup & Login - Users can create up to 15 accounts for a personalized experience, with account data stored locally.

Home Screen - Browse popular, now-playing, upcoming, and top-rated movies fetched from the TMDB API. Bookmark movies to save them to favorites.

Movie Details Screen -Detailed information about each movie, including an overview, release date, rating, and genres.

Search Screen - Search movies by title with paginated results for a smoother browsing experience.

Settings Screen- Appearance options to toggle between dark and light themes.

Language selection between English and Spanish for multilingual support.

# Technologies Used
React Native for mobile application development,
React Navigation for screen navigation,
TMDB API for movie data,
Local Storage for authentication and favorites,
i18n for multilingual support,
Dark/Light Themes for a customizable user experience,
Pagination for seamless search results browsing

