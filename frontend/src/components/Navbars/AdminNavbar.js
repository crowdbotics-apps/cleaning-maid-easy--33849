/*!

=========================================================
* Paper Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "bg-white",
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentDidUpdate(e) {
    if (
      window.outerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white",
      });
    } else {
      this.setState({
        color: "bg-white",
      });
    }
  };
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
  };
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen,
    };
    if (!this.state.collapseOpen) {
      newState["color"] = "bg-white";
    } else {
      newState["color"] = "bg-white";
    }
    this.setState(newState);
  };
  render() {
    return (
      <>
        <Navbar
          className={classnames("navbar-absolute fixed-top", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              {/* <div className="navbar-minimize">
                <Button
                  className="btn-icon btn-round"
                  color="default"
                  id="minimizeSidebar"
                  onClick={this.props.handleMiniClick}
                >
                  <i className="nc-icon nc-minimal-right text-center visible-on-sidebar-mini" />
                  <i className="nc-icon nc-minimal-left text-center visible-on-sidebar-regular" />
                </Button>
              </div>
              <div
                className={classnames("navbar-toggle", {
                  toggled: this.state.sidebarOpen,
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div> */}
              <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                <span className="d-md-block">
                  Cleaning Maid Easy Pro
                </span>
              </NavbarBrand>
            </div>

            {/* <Collapse
              className="justify-content-end"
              navbar
              isOpen={this.state.collapseOpen}
            > */}

              <Nav navbar>
                <NavItem>
                  <NavLink
                    className="btn-magnify"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      src={require("assets/images/logo_img.png")}
                    />
                  </NavLink>
                </NavItem>

              </Nav>
            {/* </Collapse> */}
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
