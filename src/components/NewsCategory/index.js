import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import newsApi from "../../utils/newsApi";
import SimplePager from "../UI/SimplePager";
import Preloader from "../UI/Preloader";
import NewsCardList from "../NewsCardList";

const MAX_NEWS_PER_PAGE = 10;

function getPageNumber(pagenum = "page1") {
  return Number(pagenum.slice(4));
}

function NewsCategory() {
  const history = useHistory();
  const params = useParams();
  const [newsData, setNewsData] = useState({ loaded: "", list: null, error: null });
  const categoryId = Number(params.id);
  const pageNumber = getPageNumber(params.pagenum);

  useEffect(() => {
    const url = `categories/${categoryId}/news?page=${pageNumber - 1}`;
    newsApi(url)
      .then(result => {
        const newsList = result.list;
        setNewsData({ loaded: `${categoryId},${pageNumber}`, list: newsList });
      })
      .catch(err => {
        setNewsData({ loaded: `${categoryId},${pageNumber}`, error: err });
      });
  }, [categoryId, pageNumber]);

  const basePath = `/news_categories/${categoryId}`;

  function moveToPage(delta) {
    const targetPageNumber = pageNumber + delta;
    const path =
      targetPageNumber <= 1 ? basePath : `${basePath}/page${targetPageNumber}`;
    history.push(path);
  }

  const leftBtnHandler = e => {
    e.stopPropagation();
    moveToPage(-1);
  };
  const rightBtnHandler = e => {
    e.stopPropagation();
    moveToPage(1);
  };

  const isLoaded = newsData.loaded === `${categoryId},${pageNumber}`;
  const news = newsData.list;
  const error = newsData.error;

  return !isLoaded ? (
    <Preloader isLoading={!isLoaded} />
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <article className="news-wrap">
      <section className="news-pager">
        <SimplePager
          pageNumber={pageNumber}
          leftBtnHandler={pageNumber > 1 ? leftBtnHandler : undefined}
          rightBtnHandler={
            news.length === MAX_NEWS_PER_PAGE ? rightBtnHandler : undefined
          }
        />
      </section>
      <NewsCardList news={news} />
    </article>
  );
}

export default NewsCategory;
