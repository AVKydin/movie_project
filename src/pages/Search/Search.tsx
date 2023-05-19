import {FC, useEffect, useState} from "react";

import {MovieList, Pagination, SearchForm} from "../../components";
import {useCustomDispatch, useCustomSelector} from "../../hooks";
import {getMoviesByQuery} from "../../redux";
import css from "../Movies/Movies.module.css";

const Search: FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [query, setQuery] = useState<string>('');
    const {movies, status} = useCustomSelector(state => state['movieReducer'])
    const dispatch = useCustomDispatch();

    const updateQuery = (query: string): void => {
        setQuery(query);
    }

    useEffect(() => {
        if (query) {
            dispatch(getMoviesByQuery({query, currentPage}));
            window.scrollTo(0, 0);
        }
    }, [dispatch, currentPage, query])


    const changePage = (value: number): void => {
        if (currentPage !== 1 || value !== -1) {
            setCurrentPage(currentPage + value);
        }
    }


    return (
        <div className={css.movies_page}>
            <SearchForm updateQuery={updateQuery}/>
            <div className={css.movies_catalogue}>
                {movies && movies.map(movie => <MovieList key={movie.id} movie={movie}/>)}
            </div>
            {movies?.length ? <Pagination changePage={changePage} currentPage={currentPage} status={status}/> : <h2 className={css.h2}>Упс! Нічого не знайдено.</h2>}
        </div>
    );
};

export {Search};