import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import { ExpandLessOutlined } from "@material-ui/icons";

const useCardHeaderStyles = makeStyles({
  title: {
    textTransform: "capitalize"
  }
});

const useCollapseStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    "z-index": "10",
    backgroundColor: "rgba(255, 255, 255, 0.85)"
  },
  wrapperInner: {
    height: "320px"
  }
}));

const useTldrStyles = makeStyles({
  root: {
    padding: "10px"
  }
});

const postClosure = () => {
  return (props: IPostProps) => {
    const cardHeader = useCardHeaderStyles();
    const collapseClasses = useCollapseStyles();
    const tldrClasses = useTldrStyles();
    const [showTldr, setShowTldr] = useState(false);

    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card
          data-testid="post"
          onMouseEnter={() => setShowTldr(true)}
          onClick={() => setShowTldr(true)}
          onMouseLeave={() => setShowTldr(false)}
        >
          <div
            style={{ position: "relative" }}
            onClick={() => showTldr && props.routeHandler(props.postUrl)}
          >
            <Collapse classes={collapseClasses} in={showTldr} timeout={150}>
              <div style={{ position: "relative", height: "100%" }}>
                <Typography classes={tldrClasses} align="justify">
                  {props.tldr}
                </Typography>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    width: "100%"
                  }}
                >
                  <Divider />
                  <CardActions onClick={e => e.stopPropagation()}>
                    <IconButton
                      onClick={e => {
                        e.stopPropagation();
                        setShowTldr(false);
                      }}
                      data-testid="tldr-close-button"
                    >
                      <ExpandLessOutlined />
                    </IconButton>
                  </CardActions>
                  <Divider />
                </div>
              </div>
            </Collapse>
            <CardMedia
              component="img"
              height="320"
              image={props.imgUrl}
              data-testid="post-img-url"
              alt={props.imgAltText}
            />
          </div>
          <CardHeader classes={cardHeader} title={props.title} />
        </Card>
      </Grid>
    );
  };
};

export default postClosure();

interface IPostProps {
  imgAltText: string;
  imgUrl: string;
  postUrl: string;
  routeHandler: (postUrl: string) => void;
  title: string;
  tldr: string;
}
