import {IMovieDetails} from "./movieDetails.interface";
import {IActor} from "./actors.interface";

export interface IMovieDetailsState {
    "movieDetails": IMovieDetails | null | undefined,
    "cast": IActor[] | undefined,
    "status": string | null,
    "error": string | null | undefined
}