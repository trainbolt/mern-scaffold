import React from "react";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core/styles";

// Material UI
import { Grid, IconButton, Typography } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

// Component styles
import styles from "./styles";

const mql = window.matchMedia("(min-width: 1024px)");

class LoginLayout extends React.Component {
  state = {
    mql
  };

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentDidMount() {
    this.mediaQueryChanged();
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h2">
                  Before you even start it takes a lot to get ready... and
                  you're definitely ready!
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Takamaru Ayako
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Manager at inVision
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader} />
              <div className={classes.contentBody}>{this.props.children}</div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LoginLayout.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(LoginLayout);
