import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {IMovieDetails, IMovieResponse, IActors} from "../interfaces";
import {keyApi, baseURL} from "../constants";


export const moviesService = {
    getAll: (page:number): IRes<IMovieResponse> =>
        axiosService.get(`${baseURL}/discover/movie?api_key=${keyApi}&page=${page}`),
    getByActor: (actorId: number, page: number): IRes<IMovieResponse> =>
        axiosService.get(`${baseURL}/discover/movie?api_key=${keyApi}&with_people=${actorId}&page=${page}`),
    getByGenre: (genreId: number, page: number): IRes<IMovieResponse> =>
        axiosService.get(`${baseURL}/discover/movie?api_key=${keyApi}&with_genres=${genreId}&page=${page}`),
    getById: (id: string | undefined): IRes<IMovieDetails> =>
        axiosService.get(`${baseURL}/movie/${id}?api_key=${keyApi}`),
    getCast: (id: string | undefined): IRes<IActors> =>
        axiosService.get(`${baseURL}/movie/${id}/credits?api_key=${keyApi}`),
    getByQuery:(query: string, page:number): IRes<IMovieResponse> =>
        axiosService.get(`${baseURL}/search/movie?api_key=${keyApi}&query=${query}&page=${page}`),
}

