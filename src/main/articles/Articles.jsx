import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { articlesAdd, updatePage } from '../../store/articlesAddGet';

import clasess from './articles.module.css';
import Article from './article/Article';

export default function Articles() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const count = useSelector((state) => state.articles.count);
  const pages = useSelector((state) => state.articles.page);

  return (
    <main>
      <div className={clasess.articles}>
        {articles.map((item) => (
          <Article item={item} key={item.slug} />
        ))}
      </div>
      <Pagination
        defaultCurrent={pages}
        total={Math.floor(count / 5) * 10}
        onChange={(page) => {
          dispatch(updatePage(page));
          dispatch(articlesAdd(page));
        }}
        className={clasess.pagination}
      />
    </main>
  );
}
