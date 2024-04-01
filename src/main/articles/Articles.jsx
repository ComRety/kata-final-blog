import { Pagination } from 'antd';

import clasess from './articles.module.css';
import Article from './article/Article';

export default function Articles() {
  return (
    <main>
      <div className={clasess.articles}>
        <Article />
      </div>
      <Pagination defaultCurrent={1} total={50} />
    </main>
  );
}
