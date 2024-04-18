import { Link } from 'react-router-dom';

import like from '../../../image/LIke.svg';

import classes from './articlle.module.css';

export default function Article({ item }) {
  const date = () => {
    const obj = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };
    const fullDate = new Date(item.createdAt);
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth();
    const day = fullDate.getDate();
    return `${obj[month]} ${day}, ${year}`;
  };

  const text = (t, count) => {
    let items = 0;
    const array = [];
    for (let i = 0; i < t.length; i += 1) {
      if (items < count) {
        items += 1;
        array.push(t[i]);
      }
    }
    array.push('...');
    return array.join('');
  };

  return (
    <div className={classes.article}>
      <div className={classes.blockOne}>
        <div className={classes.blockLeft}>
          <Link to={`articles/${item.slug}`} className={classes.title}>
            {text(item.title, 80)}
          </Link>
          <div className={classes.blockLike}>
            <button type="button" className={classes.buttonLike}>
              <img alt="Like" src={like} />
            </button>
            <span className={classes.likeText}>{item.favoritesCount}</span>
          </div>
          <div className={classes.blockTags}>
            {item.tagList.length > 0 ? item.tagList.map((i) => <div className={classes.tag}>{i}</div>) : null}
          </div>
        </div>
        <div className={classes.blockRight}>
          <div className={classes.name}>{item.author.username}</div>
          <div className={classes.data}>{date()}</div>
          <div className={classes.avatar}>
            <img alt="Аватарка" src={item.author.image} width="46px" height="46px" />
          </div>
        </div>
      </div>
      <div className={classes.blockTwo}>{text(item.description, 350)}</div>
    </div>
  );
}
