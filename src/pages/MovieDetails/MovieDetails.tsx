import {FC, useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import StarRatings from "react-star-ratings";

import {Actor} from "../../components";
import {useCustomDispatch, useCustomSelector} from "../../hooks";
import css from "./MovieDetails.module.css";
import {getCast, getMovieDetails} from "../../redux";
import {smallImageBaseURL} from "../../constants";
import empty from '../../components/images/empty.jpg'


const MovieDetailed: FC = () => {
    const {movieDetails, cast} = useCustomSelector(state => state['movieDetailsReducer']);
    const dispatch = useCustomDispatch();
    const {id: movieId} = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(getMovieDetails(movieId));
        dispatch(getCast(movieId));
        window.scrollTo(0, 0);
    }, [dispatch, movieId])

    return (
        <div>
            {movieDetails &&
                <div className={css.details_wrapper}>
                    {
                        <img className={css.img} src={movieDetails.poster_path===null?empty:`${smallImageBaseURL}${movieDetails.poster_path}`} alt="MovieList poster"/>}
                    <h1>{movieDetails.original_title}</h1>
                    <p>{movieDetails.overview}</p>
                    <div className={css.flex}>
                        <h3>Rating:</h3>
                        <StarRatings
                            rating={movieDetails.vote_average}
                            numberOfStars={10}
                            starRatedColor="gold"
                            name="rating"
                        />
                        <h4>Genres:</h4>
                        <div className={css.genres}>
                            {movieDetails.genres.map(genre => <NavLink to={`/genres/${genre.id}`} key={genre.id}
                                                                       state={genre}>
                                <p className={css.genre_badge}>{genre.name}</p></NavLink>)}
                        </div>
                        <p>Release date: {movieDetails.release_date}</p>
                        <p>Duration: {movieDetails.runtime} min</p>
                        {cast?.length!==0 && <h4>Main cast:</h4>}
                    </div>
                    <div className={css.actor_catalogue}>
                        {cast && cast.slice(0, 15).map(actor => <Actor key={actor.id} actor={actor}/>)}
                    </div>
                </div>}
        </div>
    );
};

export {MovieDetailed};