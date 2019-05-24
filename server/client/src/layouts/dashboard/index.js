import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

// Material UI
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

// Layout styles
import styles from "./styles";

const mql = window.matchMedia("(min-width: 1024px)");

class DashboardLayout extends React.Component {
  state = {
    mql,
    drawers: {
      sideMenu: {
        open: false,
        variant: "permanent"
      },
      accountMenu: {
        open: false,
        variant: "temporary"
      }
    }
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

  mediaQueryChanged = () => {
    const match = this.state.mql.matches;
    this.setState({
      ...this.state,
      drawers: {
        ...this.state.drawers,
        sideMenu: {
          open: match,
          variant: match ? "permanent" : "temporary"
        }
      }
    });
  };

  toggleDrawer = (drawer, open) => event => {
    if (
      drawer !== "sideMenu" ||
      (event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift"))
    ) {
      return;
    }

    this.setState({
      ...this.state,
      drawers: {
        ...this.state.drawers,
        [drawer]: {
          ...this.state.drawers[drawer],
          open: open
        }
      }
    });
  };

  render() {
    const { classes } = this.props;
    const sideMenu = this.state.drawers.sideMenu;
    const accountMenu = this.state.drawers.accountMenu;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: sideMenu.open
          })}
        >
          <Toolbar disableGutters={!sideMenu.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer("sideMenu", true)}
              className={classNames(classes.menuButton, {
                [classes.brandNameHide]: sideMenu.open,
                [classes.brandNameShow]: !sideMenu.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classNames({
                [classes.brandNameHide]: sideMenu.open,
                [classes.brandNameShow]: !sideMenu.open
              })}
            >
              App Name
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={accountMenu.open}
          variant={accountMenu.variant}
          onClose={this.toggleDrawer("accountMenu", false)}
        >
          <div
            className={classes.fullList}
            role="presentation"
            onClick={this.toggleDrawer("accountMenu", false)}
            onKeyDown={this.toggleDrawer("accountMenu", false)}
          >
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <Drawer
          variant={sideMenu.variant}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: sideMenu.open,
            [classes.drawerClose]: !sideMenu.open
          })}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerOpen]: sideMenu.open,
              [classes.drawerClose]: !sideMenu.open,
              [classes.drawerPaperTemporary]: sideMenu.variant === "temporary"
            })
          }}
          open={sideMenu.open}
        >
          <AppBar position="fixed" className={classNames(classes.appBar)}>
            <Toolbar disableGutters={sideMenu.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.toggleDrawer("sideMenu", false)}
                className={classNames(classes.menuButton, {
                  [classes.hide]: !sideMenu.open
                })}
              >
                <ChevronLeftIcon />
              </IconButton>
              <Typography
                variant="h5"
                color="inherit"
                noWrap
                className={classNames({ [classes.hide]: !sideMenu.open })}
              >
                App Name
              </Typography>
            </Toolbar>
          </AppBar>

          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    {}
  )(DashboardLayout)
);

/*
<div
	id="page-container"
	className={classnames({
		"sidenav-docked": appDrawer.variant === "permanent"
	})}
>
 */
