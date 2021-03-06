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
import React from "react"
import classnames from "classnames"
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
  Col,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row
} from "reactstrap"
import { connect } from "react-redux"
import moment from "moment"
import "../Navbars/styles.css"
//Calender
import DatePicker from "react-date-picker"

import {
  getDayAcceptedAppointments,
  getWeekAcceptedAppointments,
  getMonthAcceptedAppointments
} from "../../Containers/Calendar/redux/actions"
import { getUserInfo } from "../../Containers/Profile/redux/actions"

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapseOpen: false,
      color: "bg-white",
      viewState: 1,
      calendarValue: ""
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateColor)
    this.props.getUserInfo()
  }
  componentDidUpdate(e) {
    if (
      window.outerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open")
    }
  }

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      })
    } else {
      this.setState({
        color: "bg-white"
      })
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open")
  }
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen
    }
    if (!this.state.collapseOpen) {
      newState["color"] = "bg-white"
    } else {
      newState["color"] = "bg-white"
    }
    this.setState(newState)
  }

  onChangeDate = date => {
    const toolbar = this.props?.htmlText.toolbar
    toolbar.onNavigate("next", date)
    const selectedDatee = moment(date).format("YYYY-MM-DD")
    this.props.getDayAcceptedAppointments(selectedDatee)
  }

  CustomToolbar = () => {
    const toolbar = this.props?.htmlText.toolbar
    const setViewState = this.props?.htmlText.setViewState
    sessionStorage.setItem(
      "date",
      JSON.stringify(moment(toolbar?.date).format("YYYY-MM-DD"))
    )
    const goToDayView = () => {
      toolbar.onView("day")
      setViewState(1)
      this.setState({
        viewState: 1
      })
      this.props.getDayAcceptedAppointments(
        moment(toolbar?.date).format("YYYY-MM-DD")
      )
      // setViewState(1)
      // this.setState({ viewState: "day" });
    }
    const goToWeekView = () => {
      toolbar.onView("week")

      const startOfWeek = moment(toolbar.date).startOf("week").toDate()
      const endOfWeek = moment(toolbar.date).endOf("week").toDate()
      const startDate = moment(startOfWeek).format("YYYY-MM-DD")
      const endDate = moment(endOfWeek).format("YYYY-MM-DD")
      this.props.getWeekAcceptedAppointments(startDate, endDate)

      setViewState(2)
      this.setState({
        viewState: 2
      })
    }
    const goToMonthView = () => {
      toolbar.onView("month")
      setViewState(3)
      this.setState({
        viewState: 3
      })
      const startOfMonth = moment(toolbar.date).startOf("month").toDate()
      const endOfMonth = moment(toolbar.date).endOf("month").toDate()
      const startDate = moment(startOfMonth).format("YYYY-MM-DD")
      const endDate = moment(endOfMonth).format("YYYY-MM-DD")
      this.props.getMonthAcceptedAppointments(startDate, endDate)
    }
    const goToBack = () => {
      let view = this.state.viewState
      let mDate = toolbar?.date
      let newDate

      if (view === 3) {
        newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1)
        const startOfMonth = moment(newDate).startOf("month")
        const endOfMonth = moment(newDate).endOf("month")
        const startDate = moment(startOfMonth).format("YYYY-MM-DD")
        const endDate = moment(endOfMonth).format("YYYY-MM-DD")
        this.props.getMonthAcceptedAppointments(startDate, endDate)
      } else if (view === 2) {
        newDate = new Date(
          mDate.getFullYear(),
          mDate.getMonth(),
          mDate.getDate() - 7,
          1
        )
        const startOfWeek = moment(mDate).startOf("week").toDate()
        const endOfWeek = moment(mDate).endOf("week").toDate()
        const startDate = moment(startOfWeek)
          .subtract(1, "w")
          .format("YYYY-MM-DD")
        const endDate = moment(endOfWeek).subtract(1, "w").format("YYYY-MM-DD")
        this.props.getWeekAcceptedAppointments(startDate, endDate)
      } else {
        newDate = new Date(
          mDate.getFullYear(),
          mDate.getMonth(),
          mDate.getDate() - 1,
          1
        )
      }
      const backTime = moment(newDate).format("YYYY-MM-DD")
      toolbar.onNavigate("prev", newDate)
      this.props.getDayAcceptedAppointments(backTime)
    }
    const goToNext = () => {
      let view = this.state.viewState
      let mDate = toolbar.date
      let newDate
      if (view === 3) {
        newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1)
        const startOfMonth = moment(newDate).startOf("month")
        const endOfMonth = moment(newDate).endOf("month")
        const startDate = moment(startOfMonth).format("YYYY-MM-DD")
        const endDate = moment(endOfMonth).format("YYYY-MM-DD")

        this.props.getMonthAcceptedAppointments(startDate, endDate)
      } else if (view === 2) {
        newDate = new Date(
          mDate.getFullYear(),
          mDate.getMonth(),
          mDate.getDate() + 7,
          1
        )
        const startOfWeek = moment(mDate).startOf("week").toDate()
        const endOfWeek = moment(mDate).endOf("week").toDate()
        const startDate = moment(startOfWeek).add(1, "w").format("YYYY-MM-DD")
        const endDate = moment(endOfWeek).add(1, "w").format("YYYY-MM-DD")
        this.props.getWeekAcceptedAppointments(startDate, endDate)
      } else {
        newDate = new Date(
          mDate.getFullYear(),
          mDate.getMonth(),
          mDate.getDate() + 1,
          1
        )
      }
      toolbar.onNavigate("next", newDate)
      const nextTime = moment(newDate).format("YYYY-MM-DD")
      this.props.getDayAcceptedAppointments(nextTime)
    }
    const label = () => {
      const date = moment(toolbar?.date)
      const todayDate = moment(new Date()).format("MM/DD/YYYY")
      const nowDay = date.format("MM/DD/YYYY")

      // props.getDayAcceptedAppointments(newDate)
      return (
        <>
          <span>
            {this.state.viewState === 1
              ? todayDate === nowDay
                ? "Today" + ", " + date.format("MM/DD/YYYY")
                : nowDay
              : date.format("MMMM")}
          </span>
          {this.state.viewState === 1 && (
            <span className="calendarDatePicker">
              <DatePicker
                className={"calnderStyle"}
                clearIcon={false}
                wrapperClassName="datePickerBorder"
                dayPlaceholder=""
                monthPlaceholder=""
                yearPlaceholder=""
                format="dd"
                // minDate={new Date()}
                onChange={date => this.onChangeDate(date)}
              />
             </span>
          )}
        </>
      )
    }

    const setModal = item => {
      return this.props?.htmlText?.setModal(item)
    }

    return (
      <div>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col md={12} className={"d-flex flex-wrap justify-content-between"}>
            <div className="d-flex flex-wrap ">
              <div>
                <button style={styles.arrowStyle} onClick={goToBack}>
                  <img alt="..." src={require("assets/icons/caretLeft.png")} />
                </button>
                <button style={styles.arrowStyle} onClick={goToNext}>
                  <img alt="..." src={require("assets/icons/caretRight.png")} />
                </button>

                <label style={styles.monthLabel}>{label()}</label>
              </div>
              {/* <div className="d-flex flex-wrap" style={{gap:100}}> */}
              <div style={styles.toolbarStyle}>
                <Button
                  style={
                    this.state.viewState === 1
                      ? styles.btnStyle
                      : styles.btnWrapperStyle
                  }
                  onClick={goToDayView}
                >
                  <span>Day</span>
                </Button>
                <Button
                  style={
                    this.state.viewState === 2
                      ? styles.btnStyle
                      : styles.btnWrapperStyle
                  }
                  onClick={goToWeekView}
                >
                  <span>Week</span>
                </Button>
                <Button
                  style={
                    this.state.viewState === 3
                      ? styles.btnStyle
                      : styles.btnWrapperStyle
                  }
                  onClick={goToMonthView}
                >
                  <span>Month</span>
                </Button>
              </div>
            </div>
            <div>
              <Button onClick={() => setModal(true)} style={styles.addBtnText}>
                Add Service
              </Button>
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      <>
        <Navbar
          className={classnames("navbar-absolute fixed-top", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              {/* <div className="navbar-minimize"> */}
              <button
                type="button"
                style={{
                  backgroundColor: "white",
                  border: 0,
                  boxShadow: "none",
                  outline: "none"
                }}
                id="minimizeSidebar"
                onClick={this.props.handleMiniClick}
              >
                <img alt="..." src={require("../../assets/images/menu.png")} />
              </button>
              {/* </div> */}
              <div
                className={classnames("navbar-toggle", {
                  toggled: this.state.sidebarOpen
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
              </div>
              <NavbarBrand className="w-100">
                {this.props?.htmlText?.toolbar ? (
                  this.CustomToolbar()
                ) : this.props.htmlText.length ? (
                  <span
                    className="d-md-block"
                    style={{
                      fontFamily: "Ubuntu",
                      fontWeight: "400",
                      fontSize: 36,
                      color: "#000000",
                      paddingLeft: 5
                    }}
                    dangerouslySetInnerHTML={{ __html: this.props.htmlText }}
                  />
                ) : (
                  ""
                )}

                {/* <span
                  className="d-md-block"
                  style={{
                    fontFamily: "Ubuntu",
                    fontWeight: "400",
                    fontSize: 36,
                    color:'#000000',
                    paddingLeft:5
                  }}
                  dangerouslySetInnerHTML={{ __html: this.props.htmlText }}
                ></span> */}
              </NavbarBrand>
            </div>

            <Collapse
              className="justify-content-end"
              navbar
              // isOpen={this.state.collapseOpen}
            >
              <Nav navbar>
                <NavItem>
                  <NavLink
                    className="btn-magnify"
                    href="#"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      src={require("assets/images/logo_img.png")}
                    />
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    )
  }
}

const mapStateToProps = state => ({
  htmlText: state.services.htmlText
})

const mapDispatchToProps = dispatch => ({
  getDayAcceptedAppointments: date =>
    dispatch(getDayAcceptedAppointments(date)),
  getUserInfo: () => dispatch(getUserInfo()),
  getWeekAcceptedAppointments: (startDate, endDate) =>
    dispatch(getWeekAcceptedAppointments(startDate, endDate)),
  getMonthAcceptedAppointments: (startDate, endDate) =>
    dispatch(getMonthAcceptedAppointments(startDate, endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar)

const styles = {
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    fontWeight: "bold",
    fontSize: 17
    // marginLeft: 200
  },
  btnStyle: {
    background:
      "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), #FFFFFF",
    fontWeight: "700",
    fontFamily: "Montserrat",
    fontSize: 14,
    marginTop: 3
  },
  btnWrapperStyle: {
    border: "none",
    backgroundColor: "rgb(231, 231, 231)",
    color: "black",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 3
  },
  monthLabel: {
    marginLeft: 10,
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: 20,
    color: "#000000",
    marginRight: 22
    // paddingTop: 8
  },
  arrowStyle: {
    backgroundColor: "white",
    height: 38,
    width: 38,
    marginLeft: 16,
    borderRadius: 20,
    shadowColor: "0px 2px 4px -2px rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  },
  toolbarStyle: {
    backgroundColor: "#E7E7E7",
    paddingLeft: 3,
    paddingRight: 3,
    width: 265,
    height: 48,
    borderRadius: 10
    // marginLeft:30
  }
}
