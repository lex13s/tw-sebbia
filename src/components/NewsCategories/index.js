import React, * as react from "react";
import { NavLink } from "react-router-dom";
import newsAPI from "../../utils/newsApi";
import Preloader from "../UI/Preloader";

function NewsCategories() {
  const [newsLinks, setNewsLinks] = react.useState({ list: null, error: null });
  react.useEffect(() => {
    const url = "categories";
    newsAPI(url)
      .then(result => {
        setNewsLinks({list: result.list});
      })
      .catch( err=> {
        setNewsLinks( {error: err})
      });
  }, []);

  const links = newsLinks.list;

  return newsLinks.error ? <div>{newsLinks.error.message}</div> :
    !links ? (
    <Preloader isLoading={true} />
    ) : (
    <nav className="header-news">
      {links.map(link => {
        return (
          <section className="header-news__item" key={link.id}>
            <ul>
              <li>
                <NavLink
                  id={link.id}
                  to={`/news_categories/${link.id}`}
                  activeClassName="selected"
                >
                  {link.name}
                </NavLink>
              </li>
            </ul>
          </section>
        );
      })}
    </nav>
  );
}

export default NewsCategories;
