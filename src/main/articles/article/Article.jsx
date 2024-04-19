/* eslint-disable indent */
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { likeArticle, articlesAdd, unLikeArticle } from '../../../store/articlesAddGet';
import like from '../../../image/LIke.svg';
import likeRed from '../../../image/LikeRed.svg';

import classes from './articlle.module.css';

export default function Article({ item }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.articles.page);

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
    if (!t) {
      return null;
    }
    let items = 0;
    const array = [];
    for (let i = 0; i < t.length; i += 1) {
      if (items < count) {
        items += 1;
        array.push(t[i]);
      }
    }
    if (array.length >= count) {
      array.push('...');
    }

    return array.join('');
  };

  const likeBtn = async () => {
    const token = localStorage.getItem('user');
    if (token) {
      if (!item.favorited) {
        const req = await dispatch(likeArticle(item.slug));
        if (req.meta.requestStatus === 'fulfilled') {
          dispatch(articlesAdd(page));
        }
      }
      if (item.favorited) {
        const req = await dispatch(unLikeArticle(item.slug));
        if (req.meta.requestStatus === 'fulfilled') {
          dispatch(articlesAdd(page));
        }
      }
    }
  };

  return (
    <div className={classes.article}>
      <div className={classes.blockOne}>
        <div className={classes.blockLeft}>
          <div className={classes.overBlock}>
            <Link to={`articles/${item.slug}`} className={classes.title}>
              {text(item.title, 80)}
            </Link>
            <div className={classes.blockLike}>
              <button type="button" className={classes.buttonLike} onClick={likeBtn}>
                {item.favorited ? <img alt="Like" src={likeRed} /> : <img alt="Like" src={like} />}
              </button>
              <span className={classes.likeText}>{item.favoritesCount}</span>
            </div>
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
