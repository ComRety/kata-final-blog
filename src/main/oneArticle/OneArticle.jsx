import Markdown from 'markdown-to-jsx';

import like from '../../image/LIke.svg';

import classes from './oneArticle.module.css';

export default function OneArticle() {
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
            <img alt="Аватарка" width="46px" height="46px" />
          </div>
        </div>
      </div>
      <div className={classes.blockTwo}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </div>
      <div className={classes.text}>
        <Markdown>### Hello world!</Markdown>
      </div>
    </div>
  );
}
