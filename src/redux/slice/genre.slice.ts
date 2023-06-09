import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {genreService} from "../../services";
import {IGenreState} from "../../interfaces";

const initialState: IGenreState = {
    genres: [],
    status: null,
    error: null
}

export const getAllGenres = createAsyncThunk(
    'genreSlice/getAllGenres',
    async (_, {rejectWithValue}) => {
        try {
            const genres = await genreService.getAll();
            return genres.data.genres;
        } catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.message);
        }
    }
)

const genreSlice = createSlice({
    name: "genreSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllGenres.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.genres = action.payload;
        });
        builder.addCase(getAllGenres.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        });

    }
})

const genreReducer = genreSlice.reducer;

export default genreReducer;