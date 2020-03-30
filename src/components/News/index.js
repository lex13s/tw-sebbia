import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NewsApi from "../../utils/newsApi";
import Preloader from "../UI/Preloader";
import formatTimestamp from "../../utils/timestamp";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

function News() {
  const location = useLocation();
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const [currentNewsFromServer, setCurrentNewsFromServer] = useState({
    loaded: "",
    news: null
  });

  useEffect(() => {
    const url = `details?id=${id}`;
    NewsApi(url)
      .then(result => {
        setCurrentNewsFromServer({loaded: id, news: result.news});
      })
      .catch( err=> {
        setCurrentNewsFromServer( {loaded: id, error: err})
      });
  }, [id]);

  const detailsNewsHandler = () => {
    history.goBack();
  };

  function innerHTML(news) {
    return { __html: news };
  }

  const isLoaded = id === currentNewsFromServer.loaded;

  const news =
      currentNewsFromServer.news || (location.state && location.state.news);

  return (
    !isLoaded  ? <Preloader isLoading={!isLoaded} /> :
    news && (
      <section className="news-card">
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {news.title}
                  </Typography>
                  <Typography
                    style={{ textAlign: "right", paddingBottom: "20px" }}
                  >
                    {formatTimestamp(new Date(news.date))}
                  </Typography>
                  <Typography>{news.shortDescription}</Typography>
                  <hr />
                  {!isLoaded ? (
                    <div className="news-card__preloader">
                      <Preloader isLoading={!isLoaded} />
                    </div>
                  ) : (
                    <div className="news-card__preloader-wrap">
                      <Typography dangerouslySetInnerHTML={innerHTML(news.fullDescription)} />
                    </div>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={detailsNewsHandler}
                  >
                    Назад
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>
    )

  );
}

export default News;
