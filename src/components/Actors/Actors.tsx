import {FC} from "react";
import {NavLink} from "react-router-dom";


import {IActor} from "../../interfaces/";
import {smallImageBaseURL} from "../../constants";
import empty from '../images/empty.jpg';
import css from './Actors.module.css'

interface IProps {
    actor: IActor
}

const Actor: FC<IProps> = ({actor}) => {
    return (
        <NavLink to={`/movies/actor/${actor.id}`} state={actor}>
            { <img className={css.img} src={actor.profile_path?`${smallImageBaseURL}${actor.profile_path}`:empty } alt={actor.name}/>}
            <h3>{actor.name}</h3>
        </NavLink>

    );
};

export {
    Actor
};