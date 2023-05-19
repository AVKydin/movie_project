import {FC, useEffect, useState} from "react";

import {MovieList, Pagination} from "../../components";
import {useCustomDispatch, useCustomSelector, useCustomLocation} from "../../hooks";
import css from "../Movies/Movies.module.css";
import {getMoviesWithActor} from "../../redux";


const MoviesWithActor:FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {movies, status} = useCustomSelector(state => state['movieReducer']);
    const dispatch = useCustomDispatch();
    const {state: {id: actorId, name}} = useCustomLocation();

    useEffect(() => {
        dispatch(getMoviesWithActor({actorId, currentPage}));
        window.scrollTo(0, 0);
    }, [actorId, currentPage, dispatch])

    const changePage = (value: number): void => {
        if(status===''){
            setCurrentPage(0)
        }
        if (currentPage !== 1 || value !== -1) {
            setCurrentPage(currentPage + value);
        }
    }

    return (
        <div className={css.movies_page}>
            <h1 className={css.page_header}>{name}'s movies</h1>
            <div className={css.movies_catalogue}>
                {movies && movies.map(movie => <MovieList key={movie.id} movie={movie}/>)}
            </div>
            < Pagination changePage={changePage} currentPage={currentPage} status={status}/>
        </div>
    );
};

export {MoviesWithActor};