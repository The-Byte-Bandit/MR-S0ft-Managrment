import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { thunk } from 'redux-thunk'; // Correct import for thunk
import rootReducer from './reducers'; // Your combined reducers
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// redux-persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with thunk middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk), // Add thunk middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});


export const persistor = persistStore(store);

export default store;





// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import rootReducer from './reducers'; // Your combined reducers
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// // redux-persist configuration
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user', 'questions'], // Specify which reducers to persist
// };

// // Wrap your rootReducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store with the persisted reducer and redux-thunk middleware
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(thunk), // Adding redux-thunk middleware here
//   devTools: process.env.NODE_ENV !== 'production',
// });

// // Create the persistor
// export const persistor = persistStore(store);

// export default store;
