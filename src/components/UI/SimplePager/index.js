import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

function SimplePager({ pageNumber, leftBtnHandler, rightBtnHandler }) {
  const leftBtnDisabled = !leftBtnHandler;
  const rightBtnDisabled = !rightBtnHandler;

  const classes = useStyles();

  return (
    <section className="list-news__button-nav">
      <div className={classes.root}>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button disabled={leftBtnDisabled} onClick={leftBtnHandler}>
            ←&nbsp;сюда
          </Button>
          <Button>{pageNumber}</Button>
          <Button disabled={rightBtnDisabled} onClick={rightBtnHandler}>
            туда&nbsp;→
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
}

export default SimplePager;
