import React from "react";
import Drawer from "@material-ui/core/Drawer";

//import SidenavContent from "./components/SidenavContent";

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer
        classes={"sidenav-wrapper"}
        docked={this.props.docked}
        open={this.props.open}
        onOpen={this.props.toggleOpen}
        onClose={this.props.toggleOpen}
      />
    );
  }
}

export default Sidebar;
