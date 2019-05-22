import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import IosMenu from "react-ionicons/lib/IosMenu";
import IosSync from "react-ionicons/lib/IosSync";
import IosLogOut from "react-ionicons/lib/IosLogOut";

class Header extends React.Component {
  renderNav() {
    switch (this.props.auth) {
      case null:
        return (
          <Nav>
            <IosSync
              fontSize="24px"
              rotate={true}
              color="white"
              style={{ marginRight: 20 }}
            />
          </Nav>
        );

      case false:
        return (
          <Nav>
            <NavItem>
              <a href="/auth/google">Login with Google</a>
            </NavItem>
          </Nav>
        );

      default:
        return (
          <Nav>
            <NavItem>
              <div>Credits: {this.props.auth.credits}</div>
            </NavItem>
            <NavItem />
            <NavItem>
              <a href="/api/logout">Logout</a>
            </NavItem>
          </Nav>
        );
    }
  }

  render() {
    return (
      <Section>
        <NavBar>
          <Hamburger>
            <IosMenu fontSize="26px" />
          </Hamburger>
          <Logo>
            <Link to={this.props.auth ? "/surveys" : "/"}>Emaily</Link>
          </Logo>
          {this.renderNav()}
        </NavBar>
      </Section>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 30px;
  position: sticky;
  background: #ff5f6d; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff5f6d,
    #ffc371
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff5f6d,
    #ffc371
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
const NavBar = styled.div`
  width: 100%;
  max-width: 1024px;
  position: relative;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const Hamburger = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Logo = styled.div`
  .wf-loading & > a {
    background: rgba(255, 255, 255, 0.3);
    color: transparent;
    border-radius: 4px;
  }

  .wf-active & > a {
    font-family: "PT Sans Narrow", sans-serif;
    color: white;
    font-weight: 700;
    text-decoration: none;
    display: inline-block;
    font-size: 21px;
    line-height: 30px;
    background: none;
  }
`;

const Nav = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
`;

const NavItem = styled.div`
  & > a {
    display: inline-block;
    color: rgba(255, 255, 255, 0.7);
    line-height: 40px;
    padding: 0 20px;
    font-size: 13px;
    text-decoration: none;
    border-radius: 4px;
    margin: 5px 0 5px 5px;

    &:hover {
      color: white;
      background: rgba(255, 255, 255, 0.2);
    }
  }

  & > div {
    display: inline-block;
    color: rgba(255, 255, 255, 0.7);
    line-height: 40px;
    padding: 0 20px;
    font-size: 13px;
    text-decoration: none;
    border-radius: 4px;
    margin: 5px 0 5px 5px;
  }
`;
