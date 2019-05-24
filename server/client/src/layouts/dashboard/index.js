import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

// Material UI
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
        open: false
      },
      accountMenu: {
        open: false
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
    this.setState({
      ...this.state,
      drawers: {
        ...this.state.drawers,
        sideMenu: {
          open: this.state.mql.matches
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
          open: open
        }
      }
    });
  };

  render() {
    const { classes } = this.props;
    const sideMenuOpen = this.state.drawers.sideMenu.open;
    const accountMenuOpen = this.state.drawers.accountMenu.open;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: sideMenuOpen
          })}
        >
          <Toolbar disableGutters={!sideMenuOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer("sideMenu", true)}
              className={classNames(classes.menuButton, {
                [classes.hide]: sideMenuOpen
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classNames({ [classes.hide]: sideMenuOpen })}
            >
              App Name
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={accountMenuOpen}
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
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: sideMenuOpen,
            [classes.drawerClose]: !sideMenuOpen
          })}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerOpen]: sideMenuOpen,
              [classes.drawerClose]: !sideMenuOpen
            })
          }}
          open={sideMenuOpen}
        >
          <AppBar position="fixed" className={classNames(classes.appBar)}>
            <Toolbar disableGutters={sideMenuOpen}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.toggleDrawer("sideMenu", false)}
                className={classNames(classes.menuButton, {
                  [classes.hide]: !sideMenuOpen
                })}
              >
                <ChevronLeftIcon />
              </IconButton>
              <Typography
                variant="h5"
                color="inherit"
                noWrap
                className={classNames({ [classes.hide]: !sideMenuOpen })}
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
