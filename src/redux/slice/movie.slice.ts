import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovieState} from "../../interfaces";
import {moviesService} from "../../services";


const initialState: IMovieState = {
    movies: [],
    status: null,
    error: null,
}

const getAllMovies = createAsyncThunk(
    'movieSlice/getAllMovies',
    async (page: number, {rejectWithValue}) => {
        try {
            const movies = await moviesService.getAll(page);
            return movies.data.results;
        } catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.message);
        }
    }
)

const getAllMoviesByGenre = createAsyncThunk(
    'movieSlice/getAllMoviesByGenre',
    async ({id, currentPage}: {id: number, currentPage: number}, {rejectWithValue}) => {
        try {
            const movies = await moviesService.getByGenre(id, currentPage);
            return movies.data.results;
        } catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.message);
        }
    }
)

const getMoviesWithActor = createAsyncThunk(
    'movieSlice/getMoviesWithActor',
    async ({actorId, currentPage}: {actorId: number, currentPage: number}, {rejectWithValue}) => {
        try {
            const movies = await moviesService.getByActor(actorId, currentPage);
            return movies.data.results;
        } catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.message);
        }
    }
)

const getMoviesByQuery = createAsyncThunk(
    'movieSlice/getMoviesByQuery',
    async ({query, currentPage}: {query: string, currentPage: number}, {rejectWithValue}) => {
        try {
            const movies = await moviesService.getByQuery(query, currentPage);
            return movies.data.results;
        } catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.message);
        }
    }
)


const movieSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {
        clearMovies: (state, action: PayloadAction<[]>) => {
            state.movies = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.movies = action.payload;
            })
            .addCase(getAllMovies.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(getAllMoviesByGenre.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.movies = action.payload;
            })
            .addCase(getAllMoviesByGenre.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(getMoviesWithActor.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.movies = action.payload;
                if(state.movies&&state.movies.length===0){
                    state.status = '';
                }
            })
            .addCase(getMoviesWithActor.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(getMoviesByQuery.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.movies = action.payload;
            })
            .addCase(getMoviesByQuery.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

    }
})

const movieReducer = movieSlice.reducer;

const {clearMovies} = movieSlice.actions;

export {
    movieReducer,
    getAllMovies,
    getAllMoviesByGenre,
    getMoviesWithActor,
    getMoviesByQuery,
    clearMovies
};