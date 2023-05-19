import {FC, useEffect, useState} from "react";

import {MovieList, Pagination} from "../../components";
import {useCustomDispatch, useCustomSelector} from "../../hooks";
import {getAllMovies} from "../../redux";
import css from "./Movies.module.css";


const Movies: FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {movies, status} = useCustomSelector(state => state['movieReducer']);
    const dispatch = useCustomDispatch();
    useEffect(() => {
        dispatch(getAllMovies(currentPage));
        window.scrollTo(0, 0);
    }, [currentPage, dispatch])

    const changePage = (value: number): void => {
        console.log(movies?.length.valueOf()!==20)
        if(movies?.length.valueOf()!==20){
            setCurrentPage(-1)
        }
        if(value===-1 || value===1){
            setCurrentPage(currentPage+value)
        }
    }

    return (
        <div className={css.movies_page}>
            <div className={css.movies_catalogue}>
                {movies && movies.map(movie => <MovieList key={movie.id} movie={movie} />)}
            </div>
            <Pagination changePage={changePage} currentPage={currentPage} status={status}/>
        </div>
    );
};

export {Movies};