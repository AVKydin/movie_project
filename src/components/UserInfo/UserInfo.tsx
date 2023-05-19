import {FC} from "react";

import css from "./UserInfo.module.css";
import movie_buff from '../images/movie_buff.png'
const UserInfo:FC = () => {
    return (
        <div className={css.user_logo} title={'user'}>
            <img className={css.img} src={movie_buff} alt={'logoUser'}/>
            <p className={css.p}>Movie buff</p>
        </div>
    );
};

export {
    UserInfo
};