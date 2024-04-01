import avatar from '../../../image/2bf7cbea0e8e0ac709ec6af74b5bc3fa.png';
import like from '../../../image/LIke.svg';

import classes from './articlle.module.css';

export default function Article() {
  return (
    <div className={classes.article}>
      <div className={classes.blockOne}>
        <div className={classes.blockLeft}>
          <div className={classes.title}>Some article title</div>
          <div className={classes.blockLike}>
            <button type="button" className={classes.buttonLike}>
              <img alt="Like" src={like} />
            </button>
            <span className={classes.likeText}>10</span>
          </div>
          <div className={classes.tag}>Tag1</div>
        </div>
        <div className={classes.blockRight}>
          <div className={classes.name}>John Doe</div>
          <div className={classes.data}>March 5, 2020 </div>
          <div className={classes.avatar}>
            <img alt="Аватарка" src={avatar} width="46px" height="46px" />
          </div>
        </div>
      </div>
      <div className={classes.blockTwo}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </div>
    </div>
  );
}
