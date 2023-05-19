import {axiosService} from "./axios.service";
import {baseURL, keyApi} from "../constants";
import {IGenres} from "../interfaces";
import {IRes} from "../types";

export const genreService = {
    getAll: (): IRes<IGenres> => axiosService.get(`${baseURL}/genre/movie/list?api_key=${keyApi}`)
}
