import React, { useEffect, useState } from "react"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { connect } from "react-redux"
import "./styles.css"

// import SweetAlert from "react-bootstrap-sweetalert"
// import "react-big-calendar/lib/css/react-big-calendar.css"
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  Input,
  Spinner,
  Table
} from "reactstrap"

//Actions
import { getDayAcceptedAppointments, getNotes } from "./redux/actions"
import { getPendingRequests } from "../PendingServices/redux/actions"
import { getTeam } from "../Teams/redux/actions"

import { events } from "variables/general.js"

const localizer = momentLocalizer(moment)

const Calendar = props => {
  const { pendingRequests, teamData, notes } = props
  const [addEvents, setAddEvents] = useState(events)
  const [alertMsg, setAlertMsg] = useState(null)
  const [viewState, setViewState] = useState(1)
  const [modal, setModal] = React.useState(false)
  const [teamsData, setTeamsData] = useState(false)

  const {
    addBtnText,
    btnStyle,
    btnWrapperStyle,
    monthLabel,
    arrowStyle,
    toolbarStyle,
    labelStyle,
    teamListStyle,
    notesListStyle,
    headerTextStyle,
    pendingTextStyle,
    desStyle,
    downloadStyle
  } = styles

  useEffect(() => {
    props.getPendingRequests()
    props.getTeam()
    props.getNotes()
  }, [])

  // useEffect(() => {
  //   if (teamData.length) {
  //     const data = teamData.map(item => {
  //       const newData = {
  //         id: item.id,
  //         title: item.title
  //       }
  //       return newData
  //     })
  //     setTeamsData(data)
  //     // console.log("teamsss", teamList)
  //   }
  // }, [teamData])

  const eventData = [
    {
      id: 4,
      title: "Appointment 1",
      appointment_date: "2022-03-23",
      start_time: "14:00:00",
      end_time: "17:00:00",
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
      created_at: "2022-03-23T04:03:00.000Z",
      updated_at: "2022-03-15T20:43:12.087570Z"
    },
    {
      id: 6,
      title: "Appointment 7",
      appointment_date: "2022-03-23",
      start_time: "15:00:00",
      end_time: "20:00:00",
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
  const closeModal = () => {
    setModal(!modal)
  }

  const getTeamMembers = () => {
    // let totalTeams =
    //   eventData && eventData.map(item => item.assigned_team.team_members.length)
    // totalTeams = totalTeams.reduce((a, b) => a + b, 0) - 1

    const items = eventData
      .map((item, index) => {
        return item.assigned_team.team_members.map(member => {
          return {
            allDay: true,
            end: new Date(item.appointment_date),
            start: new Date(item.appointment_date),
            title: member.name,
            resourceId: item.id,
            color: "#8BB031",
            desc: ""
          }
        })
      })
      .flat(1)

    const service = eventData.map((item, index) => {
      const data = {
        allDay: false,
        end: new Date(`${item.appointment_date}T${item.end_time}Z`),
        start: new Date(`${item.appointment_date}T${item.start_time}Z`),
        title: item.title,
        resourceId: item.id,
        color: "#8BB031",
        desc: item.service.description
      }
      return data
    })
    if (service && service.length) {
      items.push(...service)
    }

    // const teams =
    //   teamData &&
    //   teamData.map(item => {
    //     return {
    //       allDay: true,
    //       end: new Date(),
    //       start: new Date(),
    //       title: item.title,
    //       resourceId: -1,
    //       color: "#8BB031"
    //     }
    //   })
    // if (teams && teams.length) {
    //   items.push(...teams)
    // }
    const resourceList = eventData.map(element => {
      return {
        resourceId: element.id,
        resourceTitle: element.assigned_team.title
      }
    })
    // resourceList.push({ resourceId: -1, resourceTitle: "Unassigned/Notes" })

    return { items, resourceList }
  }

  const allNotes = [
    {
      id: 1,
      title: "Edited New Note",
      description: "Note Edited Dscrp Here."
    }
  ]

  const pendingRequestsList = {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        id: 4,
        title: "Appointment 1",
        appointment_date: "2022-03-31",
        start_time: "14:00:00",
        end_time: "18:00:00",
        client: null,
        assigned_team: {
          id: 2,
          team_members: [
            {
              id: 2,
              name: null,
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
        price: "59.99",
        description: "Full Description of the job here.",
        notes: "Appointment notes here",
        status: "Pending",
        created_at: "2022-03-15T20:42:59.558771Z",
        updated_at: "2022-03-15T20:42:59.558851Z"
      }
    ]
  }

  const formats = {
    eventTimeRangeFormat: (date, culture, localizer) =>
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
          <Button
            className="mb-3"
            onClick={() => setModal(true)}
            style={addBtnText}
          >
            Add Service
          </Button>
        </Row>
      </div>
    )
  }

  function CustomEvent({ event }) {
    return (
      <div className={viewState === 3 ? "" : "pt-1"}>
        <span
          style={{
            fontWeight: event.allDay || viewState === 3 ? "500" : "600",
            fontFamily: "Montserrat",
            fontSize: 12,
            color: event.allDay ? "white" : "black"
          }}
        >
          {event.title}
        </span>
        {viewState === 1 && (
          <>
            <div className="pt-1" style={desStyle}>
              <span>{event.desc}</span>
            </div>
            {/* <Row>
            <Col md="4" sm="4">
              <div
                style={downloadStyle}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{ alignSelf: "center" }}
                    alt="..."
                    src={require("assets/icons/download.png")}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 9,
                    fontWeight: "500",
                    textAligin: "center",
                    color:'black'
                  }}
                >
                  CHECK IN
                </span>
              </div>
            </Col>
            <Col md="4" sm="4">
              <div>
                <div>
                  <img
                    style={{ alignSelf: "center" }}
                    alt="..."
                    src={require("assets/icons/uploadSimple.png")}
                  />
                </div>
                <span>CHECK OUT</span>
              </div>
            </Col>
            <Col md="4" sm="4">
              <div>
                <img
                  style={{ alignSelf: "center" }}
                  alt="..."
                  src={require("assets/icons/checkCircle.png")}
                />
              </div>
            </Col>
          </Row> */}

            {!event.allDay && (
              <div style={{ position: "absolute", bottom: 3 }}>
                <span
                  // className="rbc-day-slot rbc-event-labe"
                  style={desStyle}
                >{`${moment(event.end).format("h:mm A")}-${moment(
                  event.start
                ).format("h:mm A")}`}</span>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="content">
        {alertMsg}
        <Row>
          <Col className="" md="12" sm="12">
            <Card className="card-calendar">
              <CardBody>
                <Table borderless>
                  <thead>
                    <tr>
                      <th className="p-0">
                        <BigCalendar
                          components={{
                            toolbar: CustomToolbar,
                            event: CustomEvent
                          }}
                          resourceIdAccessor={
                            viewState == 1 ? "resourceId" : null
                          }
                          resources={
                            viewState == 1
                              ? getTeamMembers().resourceList
                              : null
                          }
                          resourceTitleAccessor={
                            viewState == 1 ? "resourceTitle" : null
                          }
                          localizer={localizer}
                          defaultView="day"
                          events={getTeamMembers().items}
                          dayLayoutAlgorithm="no-overlap"
                          showMultiDayTimes={true}
                          startAccessor="start"
                          endAccessor="end"
                          eventPropGetter={event => {
                            const eventData = getTeamMembers().items.find(
                              ot => ot.id === event.id
                            )
                            const backgroundColor = eventData && eventData.color
                            return { style: { backgroundColor } }
                          }}
                        />
                      </th>
                      {viewState === 1 && (
                        <th style={{ verticalAlign: "top" }} className="p-0">
                          {" "}
                          <div
                            style={{
                              marginTop: 61,
                              borderColor: " #DDDDDD",
                              borderWidth: 2,
                              height: 400
                            }}
                          >
                            <div
                              style={{
                                textAlign: "center",
                                borderColor: " #DDDDDD",
                                borderTopStyle: "solid",
                                borderBottomStyle: "solid",
                                borderWidth: 2
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: "500",
                                  fontSize: 12
                                }}
                              >
                                Unassigned/ Notes
                              </span>
                            </div>
                            <div
                              className="text-center"
                              style={{
                                fontWeight: "500",
                                fontsize: 12,
                                paddingTop: 11,
                                paddingBottom: 10
                              }}
                            >
                              <span>Teams</span>
                            </div>
                            {teamData &&
                              teamData.map((item, index) => (
                                <div
                                  className="text-center"
                                  style={teamListStyle}
                                >
                                  <label style={labelStyle}>{item.title}</label>
                                </div>
                              ))}
                            <div
                              className="text-center"
                              style={headerTextStyle}
                            >
                              <span>Notes</span>
                            </div>
                            {allNotes.map((item, index) => (
                              <div
                                className="text-center"
                                style={notesListStyle}
                              >
                                <div>
                                  <label style={labelStyle}>{item.title}</label>
                                </div>
                                <div>
                                  <label style={labelStyle}>
                                    {item.description}
                                  </label>
                                </div>
                              </div>
                            ))}
                            <div
                              className="text-center"
                              style={pendingTextStyle}
                            >
                              <span>Pending Requests</span>
                            </div>
                            {pendingRequestsList.results.map((item, index) => (
                              <div
                                className="text-center"
                                style={teamListStyle}
                              >
                                <label style={labelStyle}>{item.title}</label>
                              </div>
                            ))}
                          </div>
                        </th>
                      )}
                      {/* <th style={{ verticalAlign: "top" }} className='p-0' >
                        {" "}
                        <div
                          style={{
                            marginTop: 61,
                            borderColor: " #DDDDDD",
                            borderWidth: 2,
                            height:400
                          }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              borderColor: " #DDDDDD",
                              borderTopStyle: "solid",
                              borderBottomStyle: "solid",
                              borderWidth: 2
                            }}
                          >
                            <span
                              style={{
                                fontWeight: "500",
                                fontSize: 12
                              }}
                            >
                              Unassigned/ Notes
                            </span>
                          </div>
                          <div
                            className="text-center"
                            style={{ fontWeight: "500",
                            fontsize: 12,paddingTop: 11, paddingBottom: 10 }}
                          >
                            <span>Teams</span>
                          </div>
                          {
                            teamData && 
                            teamData.map((item, index) => (
                              <div
                                className="text-center"
                                style={teamListStyle}
                              >
                                <label style={labelStyle}>{item.title}</label>
                              </div>
                            ))}
                          <div className="text-center" style={headerTextStyle}>
                            <span>Notes</span>
                          </div>
                          {
                            
                            allNotes.map((item, index) => (
                              <div
                                className="text-center"
                                style={notesListStyle}
                              >
                                <div>
                                <label style={labelStyle}>{item.title}</label>
                                </div>
                                <div>
                                <label style={labelStyle}>{item.description}</label>
                                </div>

                              </div>
                            ))}
                            <div className="text-center" style={pendingTextStyle}>
                            <span>Pending Requests</span>
                          </div>
                          {
                            pendingRequestsList.results.map((item, index) => (
                              <div
                                className="text-center"
                                style={teamListStyle}
                              >
                                <label style={labelStyle}>{item.title}</label>
                              </div>
                            ))}
                          
                        </div>
                      </th> */}
                    </tr>
                  </thead>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md={2} style={{ backgroundColor: "white" }}>
            <div
              style={{
                width: "100%",
                marginTop: 73,
                borderLeft: "groove",
                borderTop: "groove"
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  borderBottom: "groove"
                }}
              >
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: 12
                  }}
                >
                  Unassigned/ Notes
                </span>
              </div>
            </div>
          </Col> */}
        </Row>
        <Modal isOpen={modal} closeModal={closeModal}>
          <div style={{ height: 600 }}>
            <div className="modal-header border-bottom-0">
              <button
                aria-hidden={true}
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={closeModal}
              >
                <i
                  style={{
                    color:
                      "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF"
                  }}
                  className="nc-icon nc-simple-remove"
                />
              </button>
              <div>
                <label className="mt-5" style={styles.titleTextStyle}>
                  Add Service
                </label>
              </div>
            </div>
            <div className="modal-body ">
              <label style={styles.labelTextStyle}>Service Name</label>
              <Input
                style={styles.inputTextStyle}
                className="border-0 pl-0"
                // onChange={e => handleOnChange("serviceName", e.target.value)}
              />
              <div style={styles.inputLineStyle} />
              {/* {servicesError.name && (
              <label style={{ color: "red" }}>{servicesError.name}</label>
            )} */}
              <div className="mt-4">
                <label style={styles.labelTextStyle}>Service Description</label>
                <Input
                  style={styles.inputTextStyle}
                  className="border-0 pl-0"
                  // onChange={e =>
                  //   handleOnChange("serviceDescription", e.target.value)
                  // }
                />
                <div style={styles.inputLineStyle} />
              </div>
              {/* {servicesError.description && (
              <label style={{ color: "red" }}>
                {servicesError.description}
              </label>
            )} */}

              <div className="mt-4">
                <label style={styles.labelTextStyle}>Service Price</label>
                <Input
                  style={styles.inputTextStyle}
                  className="border-0 pl-0"
                  // onChange={e => handleOnChange("servicePrice", e.target.value)}
                />
                <div style={styles.inputLineStyle} />
              </div>
              {/* {servicesError.price && (
              <label style={{ color: "red" }}>{servicesError.price}</label>
            )} */}
            </div>
          </div>
          <div className="modal-footer border-top-0  justify-content-center">
            <Button
              className="mb-3"
              style={styles.btnTextStyle}
              // onClick={toggle}
              // disabled={disable}
            >
              {false ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Save Service"
              )}
            </Button>
          </div>
        </Modal>
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
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: "600",
    display: "grid"
  },
  labelTextStyle: {
    fontSize: 14,
    opacity: 0.5,
    fontWeight: "500",
    color: "#000000"
  },
  btnTextStyle: {
    background:
      "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF",
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 50,
    paddingRight: 50
  },
  inputLineStyle: {
    backgroundColor: "#D9D9D9",
    height: 1
  },
  teamListStyle: {
    backgroundColor: "#89AF31",
    borderRadius: 5,
    marginBottom: 2,
    marginLeft: 2
  },
  notesListStyle: {
    backgroundColor: "#4C9041",
    borderRadius: 5,
    marginBottom: 2,
    marginLeft: 2
  },
  labelStyle: {
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Montserrat"
  },
  headerTextStyle: {
    fontWeight: "500",
    fontFamily: "Montserrat",
    fontsize: 12,
    paddingTop: 42,
    paddingBottom: 10,
    color: "#000000"
  },
  pendingTextStyle: {
    fontWeight: "500",
    fontFamily: "Montserrat",
    fontsize: 12,
    paddingTop: 86,
    paddingBottom: 10,
    color: "#000000"
  },
  desStyle: {
    fontWeight: "500",
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "black"
  },
  downloadStyle: {
    backgroundColor: "white",
    justifyContent: "center",
    display: "grid",
    borderRadius: 5
  }
}

const mapStateToProps = state => ({
  requesting: state.calendar.requesting,
  appointmentsDays: state.calendar.appointmentsDays,
  notes: state.calendar.notes,
  teamData: state.teams.teamData,
  pendingRequests: state.pendingRequests.pendingRequests
})

const mapDispatchToProps = dispatch => ({
  getDayAcceptedAppointments: date =>
    dispatch(getDayAcceptedAppointments(date)),
  getNotes: () => dispatch(getNotes()),
  getPendingRequests: () => dispatch(getPendingRequests()),
  getTeam: () => dispatch(getTeam())
})
export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
