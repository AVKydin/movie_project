import {FC, useEffect, useState} from "react";

import {MovieList, Pagination} from "../../components";
import {useCustomDispatch, useCustomLocation, useCustomSelector} from "../../hooks";
import {getAllMoviesByGenre} from "../../redux";
import css from "../Movies/Movies.module.css";

const MoviesByGenre: FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {movies, status} = useCustomSelector(state => state['movieReducer']);
    const dispatch = useCustomDispatch();
    const {state: {id, name}} = useCustomLocation();

    useEffect(() => {
        dispatch(getAllMoviesByGenre({id, currentPage}));
        window.scrollTo(0, 0);
    }, [currentPage, dispatch, id])

    const changePage = (value: number): void => {
        if (currentPage !== 1 || value !== -1) {
            setCurrentPage(currentPage + value)
        }
    }

    return (
        <div className={css.movies_page}>
            <h1 className={css.page_header}>{name}</h1>
            <div className={css.movies_catalogue}>
                {movies && movies.map(movie => <MovieList key={movie.id} movie={movie}/>)}</div>
            <Pagination changePage={changePage} currentPage={currentPage} status={status}/>
        </div>
    );
};

export {MoviesByGenre};