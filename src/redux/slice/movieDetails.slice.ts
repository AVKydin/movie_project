import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovieDetailsState} from "../../interfaces";
import {moviesService} from "../../services";

const initialState: IMovieDetailsState = {
    movieDetails: null,
    cast: [],
    status: null,
    error: null,
}

export const getMovieDetails = createAsyncThunk(
    'movieDetailsSlice/getMovieDetails',
    async (movieId: string | undefined, {rejectWithValue}) => {
        try {
            const movieDetails = await moviesService.getById(movieId);
            return movieDetails.data
        } catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.message);
        }
    }
)

export const getCast = createAsyncThunk(
    'movieDetailsSlice/getCast',
    async (movieId: string | undefined, {rejectWithValue}) => {
        try {
            const cast = await moviesService.getCast(movieId);
            return cast.data.cast;
        } catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.message);
        }
    }
)

const movieDetailsSlice = createSlice({
    name: "movieDetailsSlice",
    initialState,
    reducers: {
        clearMovieDetails: (state, action: PayloadAction<null>) => {
            state.movieDetails = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovieDetails.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.movieDetails = action.payload;
            })
            .addCase(getMovieDetails.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(getCast.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.cast = action.payload;
            })
            .addCase(getCast.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

    }
})

const movieDetailsReducer = movieDetailsSlice.reducer;

export const {clearMovieDetails} = movieDetailsSlice.actions;

export default movieDetailsReducer;