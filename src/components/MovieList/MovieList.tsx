import {FC} from "react";
import {NavLink} from "react-router-dom";
import StarRatings from "react-star-ratings";

import {IMovie} from "../../interfaces";
import css from "./MovieList.module.css";
import {smallImageBaseURL} from "../../constants";
import empty from '../images/empty.jpg';

interface IProps {
    movie: IMovie
}

const MovieList: FC<IProps> = ({movie}) => {
    return (
        <NavLink to={`/movies/${movie.id}`}>
            <div className={css.movie_card}>
                {<img className={css.img} src={!movie.poster_path?empty:`${smallImageBaseURL}${movie.poster_path}`} alt='MovieList poster'/>}

                <h2>{movie.original_title}</h2>
                <StarRatings
                    rating={movie.vote_average}
                    numberOfStars={10}
                    starEmptyColor="grey"
                    starRatedColor="gold"
                    name="rating"
                    starDimension={"20px"}
                    starSpacing={"1px"}
                />
            </div>
        </NavLink>
    );
};

export {
    MovieList
}