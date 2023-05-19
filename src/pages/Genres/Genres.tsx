import {FC, useEffect} from "react";


import {Genre} from "../../components";
import {useCustomDispatch, useCustomSelector} from "../../hooks";
import css from "./Genres.module.css";
import {getAllGenres} from "../../redux";

const Genres:FC = () => {
    const {genres} = useCustomSelector(state => state['genreReducer']);
    const dispatch = useCustomDispatch();

    useEffect(()=> {
        dispatch(getAllGenres());
    }, [dispatch])

    return (
        <div>
            <div className={css.genre_catalogue}>
                {genres && genres.map(genre => <Genre key={genre.id} genre={genre}/>)}

            </div>
        </div>
    );
};

export {Genres};