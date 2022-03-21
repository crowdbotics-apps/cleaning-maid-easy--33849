import React, { useState } from "react"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { connect } from "react-redux"

// import SweetAlert from "react-bootstrap-sweetalert"
// import "react-big-calendar/lib/css/react-big-calendar.css"
// reactstrap components
import { Card, CardBody, Row, Col, Button } from "reactstrap"

//Actions
import { getDayAcceptedAppointments } from "./redux/actions"

import { events } from "variables/general.js"

const localizer = momentLocalizer(moment)

const Calendar = props => {
  const [addEvents, setAddEvents] = useState(events)
  const [alertMsg, setAlertMsg] = useState(null)
  const [viewState, setViewState] = useState(1)

  const {
    addBtnText,
    btnStyle,
    btnWrapperStyle,
    monthLabel,
    arrowStyle,
    toolbarStyle
  } = styles

  const eventData = [
    {
      id: 4,
      title: "Appointment 1",
      appointment_date: "2022-03-21",
      start_time: "14:00:00",
      end_time: "18:00:00",
      client: null,
      assigned_team: {
        id: 2,
        team_members: [
          {
            id: 2,
            name: "ali",
            profile_picture: null
          },
          {
            id: 3,
            name: "Omar Delice",
            profile_picture: null
          }
        ],
        title: "Team 1"
      },
      service: {
        id: 1,
        name: "Service 1",
        description: "Big Description Here",
        price: "14.99"
      },
      frequency: {
        id: 1,
        title: "Initial cleaning",
        color_code: "adad"
      },
      status: "Accepted",
      created_at: "2022-03-15T20:42:59.558771Z",
      updated_at: "2022-03-15T20:43:12.087570Z"
    },
    {
      id: 6,
      title: "Appointment 7",
      appointment_date: "2022-03-21",
      start_time: "15:00:00",
      end_time: "21:00:00",
      client: {
        id: 3,
        name: "Omar Delice",
        profile_picture: null
      },
      assigned_team: {
        id: 2,
        team_members: [
          {
            id: 2,
            name: "saman",
            profile_picture: null
          },
          {
            id: 3,
            name: "babur",
            profile_picture: null
          }
        ],
        title: "Team 2"
      },
      service: {
        id: 1,
        name: "Service 1",
        description: "Big Description Here",
        price: "14.99"
      },
      frequency: {
        id: 1,
        title: "Initial cleaning",
        color_code: "adad"
      },
      status: "Accepted",
      created_at: "2022-03-15T21:08:41.695529Z",
      updated_at: "2022-03-15T21:10:15.393307Z"
    }
  ]

  const getTeamMembers = () => {
    const items = eventData.map(item => {
      return {
        allDay: true,
        end: new Date(item.appointment_date),
        start: new Date(item.appointment_date),
        title: item.assigned_team.team_members.map(item => item.name),
        resourceId: item.id
      }
    })
    const resourceList = eventData.map(element => {
      return {
        resourceId: element.id,
        resourceTitle: element.assigned_team.title
      }
    })
    return { items, resourceList }
  }


  const formats = {
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, "dd", culture)
  }

  const CustomToolbar = toolbar => {
    const goToDayView = () => {
      toolbar.onView("day")
      setViewState(1)
      // this.setState({ viewState: "day" });
    }
    const goToWeekView = () => {
      toolbar.onView("week")
      setViewState(2)
    }
    const goToMonthView = () => {
      toolbar.onView("month")
      setViewState(3)
    }
    const goToBack = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1)
      toolbar.onNavigate("prev")
    }
    const goToNext = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1)
      toolbar.onNavigate("next")
    }

    const label = () => {
      const date = moment(toolbar.date)
      const newDate = date.format("YYYY-MM-DD")
      // props.getDayAcceptedAppointments(newDate)
      return (
        <span>
          {viewState === 1
            ? date.format("DD/MM/YYYY") + ", " + date.format("DD/MM/YYYY")
            : date.format("MMMM")}
        </span>
      )
    }
    return (
      <div>
        <Row>
          <button style={arrowStyle} onClick={goToBack}>
            <img alt="..." src={require("assets/icons/caretLeft.png")} />
          </button>

          <button style={arrowStyle} onClick={goToNext}>
            <img alt="..." src={require("assets/icons/caretRight.png")} />
          </button>
          <label style={monthLabel}>{label()}</label>
          <div style={toolbarStyle}>
            <Button
              style={viewState === 1 ? btnStyle : btnWrapperStyle}
              onClick={goToDayView}
            >
              <span>Day</span>
            </Button>
            <Button
              style={viewState === 2 ? btnStyle : btnWrapperStyle}
              onClick={goToWeekView}
            >
              <span>Week</span>
            </Button>
            <Button
              style={viewState === 3 ? btnStyle : btnWrapperStyle}
              onClick={goToMonthView}
            >
              <span>Month</span>
            </Button>
          </div>
          <Button className="mb-3" style={addBtnText}>
            Add Service
          </Button>
        </Row>
      </div>
    )
  }

  return (
    <>
      <div className="content">
        {alertMsg}
        <Row>
          <Col className="" md="12">
            <Card className="card-calendar">
              <CardBody>
                <BigCalendar
                  components={{
                    toolbar: CustomToolbar
                  }}
                  resourceIdAccessor={viewState == 1 ? "resourceId" : null}
                  resources={
                    viewState == 1 ? getTeamMembers().resourceList : null
                  }
                  resourceTitleAccessor={
                    viewState == 1 ? "resourceTitle" : null
                  }
                  localizer={localizer}
                  defaultView="day"
                  events={getTeamMembers().items}
                  dayLayoutAlgorithm="no-overlap"
                  showMultiDayTimes={true}
                  length={10}
                  startAccessor="start"
                  endAccessor="end"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
const styles = {
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 200
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
    marginRight: 22,
    paddingTop: 8
  },
  arrowStyle: {
    backgroundColor: "white",
    height: 38,
    width: 38,
    marginLeft: 13,
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
  }
}

const mapStateToProps = state => ({
  requesting: state.calendar.requesting,
  appointmentsDays: state.calendar.appointmentsDays
})

const mapDispatchToProps = dispatch => ({
  getDayAcceptedAppointments: date => dispatch(getDayAcceptedAppointments(date))
})
export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
