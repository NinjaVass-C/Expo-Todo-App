# Expo Todo app

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

This app makes use of an external bun api, found in https://github.com/NinjaVass-C/Expo-Todo-App-Api, please ensure you have the api
running prior to starting the app for an optional experience

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Setup your .env by coying .env.example, and then set the api url to your local ipv4 address (or whatever works for your expo configuration)


## Project Features

- Ability to create, read, update, and delete todo with responsiveness on the front end
- Full authentication system with session timeouts (set to 7 days), allowing multiple users to use the application.
- Ability to filter todos by completion status
- Local caching to prevent having to call api repeatedly
- Graceful error handling on both front and back end, ensuring application does not crash and informs user of what is happening.

