import { useLoaderData, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import like from '../../image/LIke.svg';

import classes from './oneArticle.module.css';

export default function OneArticle() {
  const item = useLoaderData();

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

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
    const fullDate = new Date(item.article.createdAt);
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth();
    const day = fullDate.getDate();
    return `${obj[month]} ${day}, ${year}`;
  };

  return (
    <div className={classes.article}>
      <div className={classes.blockOne}>
        <div className={classes.blockLeft}>
          <button type="button" onClick={goBack} className={classes.title}>
            {item.article.title}
          </button>
          <div className={classes.blockLike}>
            <button type="button" className={classes.buttonLike}>
              <img alt="Like" src={like} />
            </button>
            <span className={classes.likeText}>{item.article.favoritesCount}</span>
          </div>
          <div className={classes.tag}>Tag1</div>
        </div>
        <div className={classes.blockRight}>
          <div className={classes.name}>{item.article.author.username}</div>
          <div className={classes.data}>{date()}</div>
          <div className={classes.avatar}>
            <img alt="Аватарка" src={item.article.author.image} width="46px" height="46px" />
          </div>
        </div>
      </div>
      <div className={classes.blockTwo}>{item.article.description}</div>
      <div className={classes.text}>
        <Markdown>{item.article.body}</Markdown>
      </div>
    </div>
  );
}

export const oneLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`https://blog.kata.academy/api/articles/${id}`);
  return res.json();
};
