import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Fade,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ExpandLessOutlined, ImportContacts as ReadIcon } from "@material-ui/icons";
import { CSSProperties } from "@material-ui/styles";
import toRGBA from "hex-to-rgba";

// TODO: #validation, Limit TL;DR to 300 chars. Do this as a means of validation

// >>> STYLES >>>
// ! There's an odd 1px discrepancy. The TLDR_HEIGHT is off by 1px in some situations. No visual issues.
const POST_HEIGHT = 320; // px
const ACTION_BUTTONS_HEIGHT = 66;
const TLDR_HEIGHT = POST_HEIGHT - ACTION_BUTTONS_HEIGHT; // make room for action buttons in TLDR

// ~~~ Card ~~~
const ContentWrapperStyles: CSSProperties = {
  position: "relative",
};

const useCardHeaderStyles = makeStyles((theme) => {
  const { paper } = theme.palette.background;
  const { palette } = theme;
  return {
    root: {
      position: "absolute",
      bottom: "0px",
      left: "0px",
      boxSizing: "border-box",
      width: "100%",
      backgroundColor: toRGBA(paper, 0.9, true),
      color: palette.getContrastText(paper),
      padding: theme.spacing(2),
    },
    title: {
      textTransform: "capitalize",
    },
  };
});

// ~~~ TLDR ~~~
// +++ collapsable +++
const useCollapseStyles = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      "z-index": "10",
      backgroundColor: toRGBA(theme.palette.background.paper, 0.85, true),
    },
    wrapperInner: {
      height: `${POST_HEIGHT + 1}px`, // 1px discrepancy at the base of the wrapper
      textAlign: "justify",
      overflow: "hidden",
    },
  };
});

// +++ typography +++
const useTLDRStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    maxHeight: `${TLDR_HEIGHT - theme.spacing(2) * 2}px`, // Aligns nicely with bottom padding
  },
}));

// +++ action buttons +++
// for positioning
const TLDRButtonsWrapperStyles: CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: `${ACTION_BUTTONS_HEIGHT}px`,
  boxSizing: "border-box",
};

// colour and height
const useCardActionsStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: toRGBA(theme.palette.background.paper, 1, true),
  },
}));

// +++ wrappers +++
// for positioning, wraps buttons too
const TLDRWrapperStyles: CSSProperties = {
  position: "relative",
  height: "100%",
};

// for padding
const useTLDRPaddingStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    boxSizing: "border-box",
    maxHeight: `${TLDR_HEIGHT}px`,
  },
}));

// >>> COMPONENTS >>>
export const Post = (props: IPostProps) => {
  const cardHeaderClasses = useCardHeaderStyles();
  const collapseClasses = useCollapseStyles();
  const tldrClasses = useTLDRStyles();
  const tldrPaddingClasses = useTLDRPaddingStyles();
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
        <div style={ContentWrapperStyles} onClick={() => showTldr && props.routeHandler(props.id)}>
          <Collapse classes={collapseClasses} in={showTldr} timeout={150}>
            <div style={TLDRWrapperStyles}>
              <div className={tldrPaddingClasses.root}>
                <Typography classes={tldrClasses} align="justify" data-testid="post-tldr">
                  {props.tldr}
                </Typography>
              </div>
              <TLDRButtons
                id={props.id}
                routeHandler={props.routeHandler}
                setShowTldr={setShowTldr}
              />
            </div>
          </Collapse>
          <CardMedia
            component="img"
            height={POST_HEIGHT}
            image={props.imgUrl}
            data-testid="post-img-url"
            alt={props.imgAltText}
          />
          <Fade in={!showTldr} timeout={500}>
            <CardHeader classes={cardHeaderClasses} title={props.title} data-testid="post-title" />
          </Fade>
        </div>
        {props.loading ? <LinearProgress data-testid="progress-bar" /> : null}
      </Card>
    </Grid>
  );
};

// Post.displayName = "Post";
// export default Post;

const TLDRButtons = (props: TLDRButtonsProps) => {
  const cardActionsClasses = useCardActionsStyles();
  return (
    <div style={TLDRButtonsWrapperStyles}>
      <Divider />
      <CardActions classes={cardActionsClasses} onClick={(e) => e.stopPropagation()}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid container item direction="row" justify="center" alignItems="center" xs={6}>
            <Grid item>
              <IconButton
                onClick={(e) => {
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
              <IconButton data-testid="read-post-icon" onClick={() => props.routeHandler(props.id)}>
                <ReadIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </div>
  );
};

// >>> INTERFACES >>>
export interface PostData {
  imgAltText: string;
  imgUrl: string;
  loading?: boolean;
  id: string;
  title: string;
  tldr: string;
}

export interface PostExtraProps {
  routeHandler: (id: string) => void;
}

type IPostProps = PostExtraProps & PostData;

interface TLDRButtonsProps {
  id: string;
  routeHandler: (id: string) => void;
  setShowTldr: (show: boolean) => void;
}
