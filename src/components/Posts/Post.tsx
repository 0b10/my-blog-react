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
  LinearProgress,
  makeStyles,
  Typography
} from "@material-ui/core";
import { ExpandLessOutlined, ImportContacts as ReadIcon } from "@material-ui/icons";
import { CSSProperties } from "@material-ui/styles";

// TODO: #validation, Limit TL;DR to 300 chars. Do this as a means of validation

export default (() => (props: IPostProps) => {
  const cardHeaderClasses = useCardHeaderStyles();
  const collapseClasses = useCollapseStyles();
  const tldrClasses = useTLDRStyles();
  const [showTldr, setShowTldr] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card
        data-testid="post"
        onMouseEnter={() => setShowTldr(true)}
        onClick={() => setShowTldr(true)}
        onMouseLeave={() => setShowTldr(false)}
        raised
      >
        <div
          style={ContentWrapperStyles}
          onClick={() => showTldr && props.routeHandler(props.postUrl)}
        >
          <Collapse classes={collapseClasses} in={showTldr} timeout={150}>
            <div style={TLDRWrapperStyles}>
              <Typography classes={tldrClasses} align="justify">
                {props.tldr}
              </Typography>
              <TLDRButtons
                postUrl={props.postUrl}
                routeHandler={props.routeHandler}
                setShowTldr={setShowTldr}
              />
            </div>
          </Collapse>
          <CardMedia
            component="img"
            height="320"
            image={props.imgUrl}
            data-testid="post-img-url"
            alt={props.imgAltText}
          />
          {showTldr ? null : <CardHeader classes={cardHeaderClasses} title={props.title} />}
        </div>
        {props.loading ? <LinearProgress data-testid="progress-bar" /> : null}
      </Card>
    </Grid>
  );
})();

const TLDRButtons = (props: ITLDRButtonsProps) => (
  <div style={TLDRButtonsWrapperStyles}>
    <Divider />
    <CardActions onClick={e => e.stopPropagation()}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid container item direction="row" justify="center" alignItems="center" xs={6}>
          <Grid item>
            <IconButton
              onClick={e => {
                e.stopPropagation();
                props.setShowTldr(false);
              }}
              data-testid="tldr-close-button"
            >
              <ExpandLessOutlined />
            </IconButton>
          </Grid>
        </Grid>
        <Grid>
          <Grid container item direction="row" justify="flex-end" alignItems="center" xs={6}>
            <IconButton
              data-testid="read-post-icon"
              onClick={() => props.routeHandler(props.postUrl)}
            >
              <ReadIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </CardActions>
  </div>
);

// >>> STYLES >>>
// FIXME: #theme, set and use some kind of custom overlay type background colour, with alpha
const useCardHeaderStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "rgba(80, 80, 80, 0.90)",
    color: "#FFF",
    padding: theme.spacing(2)
  },
  title: {
    textTransform: "capitalize"
  }
}));

// FIXME: #theme, set and use main colour, with 0.85 alpha
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
    height: "320px",
    textAlign: "justify",
    overflow: "hidden"
  }
}));

const useTLDRStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    maxHeight: "254px",
    overflow: "hidden"
  }
}));

const ContentWrapperStyles: CSSProperties = {
  position: "relative"
};

const TLDRWrapperStyles: CSSProperties = {
  position: "relative",
  height: "100%"
};

// FIXME: #theme, set and use main colour, with no alpha
const TLDRButtonsWrapperStyles: CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  backgroundColor: "rgba(255, 255, 255, 1)",
  width: "100%"
};

// >>> INTERFACES >>>
interface IPostProps {
  imgAltText: string;
  imgUrl: string;
  loading?: boolean;
  postUrl: string;
  routeHandler: (postUrl: string) => void;
  title: string;
  tldr: string;
}

interface ITLDRButtonsProps {
  postUrl: string;
  routeHandler: (postUrl: string) => void;
  setShowTldr: (show: boolean) => void;
}

// >>> EXPORT >>>
// export default postClosure();
