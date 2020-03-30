import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import FormatTimestamp from "../../utils/timestamp";

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
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

function NewsCardList({ news }) {
  const classes = useStyles();
  return (
    <section className="news-list">
      <Container
        className={`${classes.cardGrid} news-list__container-news`}
        maxWidth="md"
      >
        <Grid container spacing={4}>
          {news.length === 0 ? (
            <div className="news-list__empty">
              <h3 className="test">В этой категории нет новостей</h3>
            </div>
          ) : (
            news.map(card => {
              const timestamp = FormatTimestamp(new Date(card.date));
              return (
                <Grid item key={`news${card.id}`} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography
                        style={{ textAlign: "right", paddingBottom: "20px" }}
                      >
                        {timestamp}
                      </Typography>
                      {card.shortDescription}
                    </CardContent>
                    <CardActions>
                      <Link
                        to={{
                          pathname: `/news/${card.id}`,
                          state: { news: card }
                        }}
                      >
                        Подробнее
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </section>
  );
}
export default NewsCardList;
