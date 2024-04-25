/* eslint-disable indent */
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popconfirm, message } from 'antd';

import { deleteArticle, articlesAdd, unLikeArticle, likeArticle } from '../../store/articlesAddGet';
import like from '../../image/LIke.svg';
import likeRed from '../../image/LikeRed.svg';

import classes from './oneArticle.module.css';

export default function OneArticle() {
  const item = useLoaderData();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.signUp.username);
  const navigate = useNavigate();
  const page = useSelector((state) => state.articles.page);

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

  const confirm = async () => {
    message.success('Click on Yes');
    const req = await dispatch(deleteArticle(item.article.slug));
    if (req.meta.requestStatus === 'fulfilled') {
      dispatch(articlesAdd(page));
      return navigate('/');
    }
    return null;
  };
  const cancel = () => {
    message.error('Click on No');
  };

  const likeBtn = async () => {
    const token = localStorage.getItem('user');
    if (token) {
      if (!item.article.favorited) {
        const req = await dispatch(likeArticle(item.article.slug));
        if (req.meta.requestStatus === 'fulfilled') {
          navigate(0);
          dispatch(articlesAdd(page));
        }
      }
      if (item.article.favorited) {
        const req = await dispatch(unLikeArticle(item.article.slug));
        if (req.meta.requestStatus === 'fulfilled') {
          navigate(0);
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
            <button type="button" onClick={goBack} className={classes.title}>
              {item.article.title}
            </button>
            <div className={classes.blockLike}>
              <button type="button" onClick={likeBtn} className={classes.buttonLike}>
                {item.article.favorited ? <img alt="Like" src={likeRed} /> : <img alt="Like" src={like} />}
              </button>
              <span className={classes.likeText}>{item.article.favoritesCount}</span>
            </div>
          </div>
          <div className={classes.blockTags}>
            {item.article.tagList.length > 0
              ? item.article.tagList.map((i) => (
                  <div key={`i${Math.random()}`} className={classes.tag}>
                    {i}
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className={classes.blockRight}>
          <div className={classes.name}>{item.article.author.username}</div>
          <div className={classes.data}>{date()}</div>
          <div className={classes.avatar}>
            <img alt="Аватарка" src={item.article.author.image} width="46px" height="46px" />
          </div>
        </div>
      </div>
      <div className={classes.blockForBut}>
        {item.article.author.username === userName ? (
          <>
            <div className={classes.blockTwo}>{item.article.description}</div>
            <div className={classes.blockArt}>
              <Popconfirm
                title="Delete the article"
                description="Are you sure to delete this article?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger className={classes.deleteBTN}>
                  Delete
                </Button>
              </Popconfirm>
              <Link to={`/articles/${item.article.slug}/edit`} className={classes.editButton}>
                Edit
              </Link>
            </div>
          </>
        ) : (
          <div className={classes.blockTwo}>{item.article.description}</div>
        )}
      </div>
      <div className={classes.text}>
        <Markdown>{item.article.body}</Markdown>
      </div>
    </div>
  );
}

export const oneLoader = async ({ params }) => {
  const { id } = params;
  const token = localStorage.getItem('user');
  if (token) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return res.json();
  }
  const res = await fetch(`https://blog.kata.academy/api/articles/${id}`);
  return res.json();
};
