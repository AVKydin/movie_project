import {combineReducers, configureStore} from "@reduxjs/toolkit";


import movieDetailsReducer from "./slice/movieDetails.slice";
import genreReducer from "./slice/genre.slice";
import {movieReducer} from "./slice";

const rootReducer = combineReducers({
    movieReducer,
    genreReducer,
    movieDetailsReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer
})

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}