import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NewsCategories from "./components/NewsCategories";
import NewsCategory from "./components/NewsCategory";
import News from "./components/News";
import PageNotFound from "./PageNotFound";
import "./styles/style.scss";

function App() {
  return (
    <main className="main">
      <NewsCategories />
      <Switch>
        <Route exact path="/">
          <div className='main-start'><h3>Для просмотра новостей выберите категорию</h3></div>
        </Route>
        <Route exact path="/news_categories">
          <Redirect to="/" />
        </Route>
        <Route
          exact
          path="/news_categories/:id(\d{1,2})/:pagenum(page[1-9]\d*)?"
        >
          <NewsCategory />
        </Route>
        <Route exact path="/news/:id(\d+)">
          <News />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
