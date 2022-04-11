import React, { useEffect, useState, useRef,Children } from "react"
import "react-big-calendar/lib/css/react-big-calendar.css"
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import {Calendar as MyCalendar , momentLocalizer} from "react-big-calendar";

import moment from "moment"
import { connect } from "react-redux"
import styless from "./styles.css"
import { Toaster } from "react-hot-toast"
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';



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
  Table,
  FormGroup,
  ModalHeader,
  ModalBody,
  Alert
} from "reactstrap"

//Components
import Select from "react-select"
import AddServices from "components/addServices"

//Actions
import {
  getDayAcceptedAppointments,
  getNotes,
  addNotes,
  updateNotes
} from "./redux/actions"

import { renderHtmlText } from "../Services/redux/actions"
import {
  getPendingRequests,
  requestAction
} from "../PendingServices/redux/actions"
import {
  getUnAssignedEmployees,
  removeTeamMember,
  addTeamMember
} from "../Teams/redux/actions"

import useForm from "../../utils/useForm"

import { events } from "variables/general.js"
const BigCalendar = withDragAndDrop(MyCalendar);
const localizer = momentLocalizer(moment)


const Calendar = props => {

  const {
    pendingRequests,
    teamData,
    notes,
    unAssignedEmployees,
    appointmentsDays,
    actionRequesting,
    notesRequesting
  } = props
  const [addEvents, setAddEvents] = useState(events)
  const [alertMsg, setAlertMsg] = useState(null)
  const [viewState, setViewState] = useState(1)
  const [modal, setModal] = React.useState(false)
  const [teamsData, setTeamsData] = useState(false)
  const [noteModal, setNoteModal] = useState(false)
  const [updateValues, setUpdateValues] = useState(false)
  const [appointmentModal, setAppointmentModal] = useState(false)
  const [requestError, setRequestError] = useState(false)
  const [eventDetail, setEventDetail] = useState(false)
  const [pendingDetails, setPendingDetails] = useState(false)
  const [pendingRequestModal, setPendingRequestModal] = useState(false)
  const [actionRequest, setActionRequest] = useState(0)
  const [calanderDate, setcalanderDate] = useState(false)

  const calendarRef = useRef()

  let newDate = ""
  const resourceDummyData = [
    {
      resourceId: -1,
      resourceTitle: "No appointment"
    }
  ]
  const myNewData = ""
  // console.log("calanderDate",myNewData);
  const {
    addBtnText,
    btnStyle,
    btnWrapperStyle,
    monthLabel,
    arrowStyle,
    toolbarStyle,
    labelStyle,
    notFoundStyle,
    teamListStyle,
    notesListStyle,
    headerTextStyle,
    pendingTextStyle,
    desStyle,
    downloadStyle,
    dayWeekStyle,
    dayWeekTextStyle,
    dayMonthStyle,
    monthHeaderStyle,
    monthDayCellStyle,
    saveBtnStyle
  } = styles

  useEffect(() => {
    props.getPendingRequests(1)
    props.getNotes()
    props.getUnAssignedEmployees()
    props.getDayAcceptedAppointments(moment(new Date()).format("YYYY-MM-DD"))
  }, [])

  useEffect(() => {
    if (viewState === 2) {
      let myDivs = document.getElementsByClassName("rbc-allday-cell")
      let rbcEvent = document.getElementsByClassName("rbc-event")
      let rbcEventContent = document.getElementsByClassName("rbc-event-content")
      let rbcEventRbcEventContinuesLater = document.getElementsByClassName(
        "rbc-event rbc-event-continues-later"
      )

      // rbcEvent.style.width = "30px"
      myDivs[0].style.display = "none"
      // if (rbcEvent.length || rbcEventContent.length) {
      //   const lastIndex = rbcEvent.length -1
      //   rbcEvent[lastIndex].style.width = "30px"
      //   rbcEvent[0].style.width = "30px"

      //   rbcEventContent[0].style.width = "30px"

      // }
    }
  }, [viewState])

  useEffect(() => {
    if (updateValues) {
      handleOnChange("title", updateValues.title)
      handleOnChange("description", updateValues.description)
    }
  }, [updateValues])

  const stateSchema = {
    title: {
      value: "",
      error: ""
    },
    description: {
      value: "",
      error: ""
    }
  }

  const validationStateSchema = {
    title: {
      required: true
    },
    description: {
      required: true
    }
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  const addNewNotes = () => {
    const data = {
      title: state.title.value,
      description: state.description.value
    }
    props.addNotes(data, toggle)
  }

  const resetValues = () => {
    state.title.value = ""
    state.description.value = ""
  }
  const toggle = () => {
    setNoteModal(!noteModal)
    setUpdateValues(false)
    resetValues(stateSchema)
  }

  const updateValue = items => {
    setUpdateValues(items)
    setNoteModal(true)
  }

  const updateNotes = () => {
    const data = {
      title: state.title.value,
      description: state.description.value
    }
    props.updateNotes(data, updateValues.id, toggle)
  }

  const modalToggle = () => {
    setPendingRequestModal(false)
    setPendingDetails("")
    setActionRequest(0)
  }
  const appointmentToggle = () => {
    setAppointmentModal(false)
    setEventDetail(false)
  }

  const acceptRequest = requestAction => {
    const data = {
      appointment_id: pendingDetails.id,
      action: requestAction
    }

    props.requestAction(data, modalToggle,1)
    if (requestAction === "Accept") {
      setActionRequest(1)
    } else {
      setActionRequest(2)
    }
  }
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

  const closeModal = () => {
    setModal(!modal)
  }

  const getTeamMembers = () => {
    // let totalTeams =
    //   eventData && eventData.map(item => item.assigned_team.team_members.length)
    // totalTeams = totalTeams.reduce((a, b) => a + b, 0) - 1

    const appoinments =
      appointmentsDays &&
      appointmentsDays
        .map((item, index) => {
          return (
            item &&
            (viewState === 1 || viewState === 2) &&
            item?.assigned_team?.team_members?.map(member => {
              return {
                allDay: true,
                end: new Date(item?.appointment_date),
                start: new Date(item?.appointment_date),
                title: member?.name,
                resourceId: item?.id,
                color: "#88AE31",
                desc: "",
                memberId: member?.id,
                teamId: item?.assigned_team.id,
                viewState:viewState

                // eventDetail:item
              }
            })
          )
        })
        .flat(1)

    const service =
      appointmentsDays &&
      appointmentsDays.map((item, index) => {
        const data = {
          allDay: false,
          end: new Date(`${item?.appointment_date}T${item?.end_time}Z`),
          start: new Date(`${item?.appointment_date}T${item?.start_time}Z`),
          title: item?.title,
          resourceId: item?.id,
          color: item.frequency.color_code,
          desc: item?.service?.description,
          eventDetail: item,
          viewState:viewState
        }
        return data
      })
    if (service && service.length) {
      appoinments.push(...service)
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

    const resourceData =
      appointmentsDays &&
      appointmentsDays.map(element => {
        return {
          resourceId: element.id,
          resourceTitle: element?.assigned_team?.title
        }
      })
    // resourceList.push({ resourceId: -1, resourceTitle: "Unassigned/Notes" })

    const resourceList = resourceData.length ? resourceData : resourceDummyData
    const items = appoinments.includes(false)
      ? appoinments.filter(v => v !== false)
      : appoinments.filter(v => v !== undefined)

    return { items, resourceList }
  }

  const allNotes = [
    {
      id: 1,
      title: "Edited New Note",
      description: "Note Edited Dscrp Here."
    }
  ]

  const formats = {
    eventTimeRangeFormat: (date, culture, localizer) =>
      localizer.format(date, "dd", culture)
  }

  const CustomToolbar = toolbar => {

    // setcalanderDate((calanderDate) => toolbar.date)
    // newDate = toolbar.date

    props.renderHtmlText({
      toolbar: toolbar,
      setViewState: setViewState,
      setModal: setModal
    })

    return <div></div>
  }

  // useEffect(() => {
  //   props.renderHtmlText(ca)

  // }, [])
  const addTeamDrageStart = (ev, memberId) => {
    ev.dataTransfer.setData("memberId", memberId)
  }

  const addTeamDrageOver = e => {
    e.preventDefault()
  }

  const filterTeam = memberId => {
    return (
      unAssignedEmployees &&
      unAssignedEmployees.map(item => {
        if (item.id == memberId) {
          return true
        } else {
          return false
        }
      })
    )
  }


  const addTeamOnDrop = (ev, id) => {
   
    let memberId = ev.dataTransfer.getData("memberId")
    // let date = ev.dataTransfer.getData("date")

    const data = {
      member_ids: [parseInt(memberId)],
      team_id: parseInt(id)
    }

    // const valueExists = [].concat
    //   .apply([], filterTeam(memberId))
    //   .filter(v => v !== false)

    // if (valueExists.includes(true)) {
      props.addTeamMember(data)
    // }
  }

  const removeTeamDrageStart = (ev, memberId, teamId) => {
    ev.dataTransfer.setData("memberId", memberId)
    ev.dataTransfer.setData("teamId", teamId)
  }

  const removeTeamDrageOver = e => {
    e.preventDefault()
  }
  const removeTeamOnDrop = (ev, cat) => {
    let memberId = ev.dataTransfer.getData("memberId")
    let teamId = ev.dataTransfer.getData("teamId")

    const data = {
      member_ids: [parseInt(memberId)],
      team_id: parseInt(teamId)
    }
    const valueExists = [].concat
      .apply([], filterTeam(memberId))
      .filter(v => v !== false)

    if (!valueExists.includes(true)) {
      props.removeTeamMember(data)
    }
  }

  function CustomEvent({ event }) {
    return (
      <>
      <div 
      onDrop={e => {
        addTeamOnDrop(e, event.teamId)
      }}
      style={{height:100,width:100, backgroundColor:'red'}} hidden>

      </div>
      <div
        className={viewState === 3 ? "" : "pt-1"}
        onDragStart={e => removeTeamDrageStart(e, event.memberId, event.teamId)}
        draggable
        onDragOver={e =>  event.allDay && addTeamDrageOver(e)}
        onDrop={e => {
          addTeamOnDrop(e, event.teamId)
        }}
      >
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
        {event.viewState === 1 && (
          <>
            <div className="pt-1" style={desStyle}>
              <span>{event.desc}</span>
            </div>

            {!event.allDay && (
              <div style={{bottom: 3 }}>
                <span
                  // className="rbc-day-slot rbc-event-labe"
                  style={desStyle}
                >{`${moment(event.start).format("h:mm A")}-${moment(
                  event.end
                ).format("h:mm A")}`}</span>
              </div>
            )}
          </>
        )}
      </div>
      </>
    )
  }

  //  const eventStyleGetter=(event, start, end, isSelected) =>{
  //     console.log(event.allDay);
  //     var style = {
  //         width:23
  //     };
  //     return {
  //         style:event.allDay===true && style
  //     };
  // }

  const WeekHeaderCellContent = props => {
    const { date } = props
    return (
      <div style={{ height: 90, paddingTop: 20 }}>
        <div style={dayWeekStyle} component="span">
          {moment(date).format("ddd")}
        </div>
        <div component="span" style={dayWeekTextStyle}>
          {moment(date).format("D")}
        </div>
      </div>
    )
  }
  const MonthHeaderCellContent = props => {
    const { date } = props
    return (
      <div style={monthHeaderStyle}>
        <div style={dayMonthStyle} component="span">
          {moment(date).format("ddd")}
        </div>
      </div>
    )
  }
  const DateCellWrapper = ({ date, label }) => {
    return (
      <div style={monthDayCellStyle}>
        <span>{label}</span>
      </div>
    )
  }

  const selectEvent = event => {
    if(!event.allDay){
      setAppointmentModal(true)
      setEventDetail(event)
    }
    
  }


  // const CustomTimeSlotWrapper=({value, resource, children})=>{
  //   // convert your `value` (a Date object) to something displayable
  //   console.log("value",value);
  //   return (
  //     <div className="custom-slot-container" style={{textAlign:'right'}}>
  //       <span className="hidden-value">{moment(value).format('h:m A')}</span>
  //     </div>
  //   );
  // }
  const moveEvent=({ event, start, end }) =>{
    // const { events } = this.state;

    // const idx = events.indexOf(event);
    // const updatedEvent = { ...event, start, end };

    // const nextEvents = [...events];
    // nextEvents.splice(idx, 1, updatedEvent);

    // this.setState({
    //   events: nextEvents
    // });
  }
  

  return (
    <>
      <div className="content">
        <Toaster position="top-center" />
        {alertMsg}
        <Row>
          <Col className="" md="12" sm="12">
            <Card className="card-calendar">
              <CardBody>
                <Table borderless responsive>
                  <thead>
                    <tr>
                      <th className="p-0">
                        <BigCalendar
                         selectable
                         onEventDrop={moveEvent}
                          components={{
                            toolbar: CustomToolbar,
                            event: CustomEvent,
                            week: {
                              header: WeekHeaderCellContent
                            },
                            // timeSlotWrapper:CustomTimeSlotWrapper,
                            month: {
                              header: MonthHeaderCellContent,
                              dateHeader: DateCellWrapper
                              // dateHeader: ({ date, label }) => {
                              //   let highlightDate =
                              //     events.find(event =>
                              //       moment(date).isBetween(
                              //         moment(event.startDate),
                              //         moment(event.endDate),
                              //         null,
                              //         "[]"
                              //       )
                              //     ) != undefined;
                              //   return (
                              //     <h1 style={highlightDate ? { color: "red" } : null}>{label}</h1>
                              //   );
                              // }
                            },
                            // ateCellWrapper: ColoredDateCellWrapper,
                            // dateCellWrapper: DateCellWrapper
                          }}
                          ref={calendarRef}
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
                          // eventPropGetter={eventStyleGetter}
                          dayLayoutAlgorithm="no-overlap"
                          showMultiDayTimes={true}
                          startAccessor="start"
                          endAccessor="end"
                          onSelectEvent={event => selectEvent(event)}
                          eventPropGetter={event => {
                            const eventData =
                              getTeamMembers().items &&
                              getTeamMembers().items.find(
                                ot =>
                                  ot?.eventDetail?.id === event?.eventDetail?.id
                              )
                            const backgroundColor = eventData && eventData.color

                            let styles = {
                              backgroundColor: backgroundColor,
                              borderRadius: viewState === 3 ? 10 : 5
                            }

                            return {
                              style: styles
                            }
                          }}
                        />
                      </th>
                      {viewState === 1 && (
                        <th
                          style={{ verticalAlign: "top", width: "14%" }}
                          className="p-0"
                        >
                          {" "}
                          <div
                            style={{
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
                            <div
                              onDragOver={e => removeTeamDrageOver(e)}
                              onDrop={e => removeTeamOnDrop(e, "unAssign")}
                              style={{
                                overflowY: "scroll",
                                height: 200,
                                whiteSpace: "nowrap"
                              }}
                            >
                              {unAssignedEmployees.length ? (
                                unAssignedEmployees.map((item, index) => (
                                  <div
                                    onDragStart={e =>
                                      addTeamDrageStart(e, item.id)
                                    }
                                    draggable
                                    className="text-center"
                                    style={teamListStyle}
                                  >
                                    <label style={labelStyle}>
                                      {item.name}
                                    </label>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center">
                                  <label style={notFoundStyle}>
                                    No record found
                                  </label>
                                </div>
                              )}
                            </div>
                            <div
                              className="text-center"
                              style={headerTextStyle}
                            >
                              <Row>
                                <Col md={4} sm={12}>
                                  <button
                                    style={{ display: "contents" }}
                                    onClick={() => {
                                      setNoteModal(true)
                                    }}
                                  >
                                    <img
                                      alt="..."
                                      src={require("assets/icons/plusCircle.png")}
                                    />
                                  </button>
                                </Col>
                                <Col md={4} sm={12}>
                                  <span>Notes</span>
                                </Col>
                                <Col md={4}></Col>
                              </Row>
                            </div>
                            <div style={{ overflowY: "scroll", height: 300 }}>
                              {notes.length ? (
                                notes.map((item, index) => (
                                  <div
                                    onClick={() => updateValue(item)}
                                    className="text-center"
                                    style={notesListStyle}
                                  >
                                    <div>
                                      <label style={labelStyle}>
                                        {item.title}
                                      </label>
                                    </div>
                                    <div>
                                      <label style={labelStyle}>
                                        {item.description}
                                      </label>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center">
                                  <label style={notFoundStyle}>
                                    No record found
                                  </label>
                                </div>
                              )}
                            </div>
                            <div
                              className="text-center"
                              style={pendingTextStyle}
                            >
                              <span>Pending Requests</span>
                            </div>
                            <div style={{ overflowY: "scroll", height: 300 }}>
                              {pendingRequests?.length ? (
                                pendingRequests?.map((item, index) => (
                                  <div
                                    onClick={() => {
                                      setPendingDetails(item)
                                      setPendingRequestModal(true)
                                    }}
                                    className="text-center"
                                    style={teamListStyle}
                                  >
                                    <label style={labelStyle}>
                                      {item.title}
                                    </label>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center">
                                  <label style={notFoundStyle}>
                                    No record found
                                  </label>
                                </div>
                              )}
                            </div>
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
          <AddServices closeModal={closeModal} styles={styles} />
        </Modal>

        <Modal isOpen={noteModal} toggle={toggle}>
          <div className="d-flex pl-4 pt-3 pr-3 justify-content-between">
            <div>
              {updateValues ? (
                <button
                  aria-hidden={true}
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  style={{ outline: "none" }}
                >
                  <img
                    alt="..."
                    src={require("assets/images/delete_btn.png")}
                  />
                </button>
              ) : (
                ""
              )}
            </div>
            <div>
              <label
                style={{ fontSize: 24, fontWeight: "600", paddingTop: 20 }}
              >
                Notes
              </label>
            </div>

            <div>
              <button
                aria-hidden={true}
                className="close"
                data-dismiss="modal"
                type="button"
                style={{ outline: "none" }}
                onClick={toggle}
              >
                <i
                  className="nc-icon nc-simple-remove"
                  style={{ color: " #438B44" }}
                />
              </button>
            </div>
          </div>
          <div
            className="modal-body"
            style={{ paddingLeft: 24, paddingRight: 24 }}
          >
            <FormGroup>
              <label style={styles.labelfontStyles}> Title </label>
              <Input
                type="text"
                style={styles.textArea}
                value={state.title.value}
                onChange={e => handleOnChange("title", e.target.value)}
              />
              {state.title.error && (
                <label style={{ color: "red" }}>{state.title.error}</label>
              )}
            </FormGroup>
            <FormGroup className="pt-3">
              <label style={styles.labelfontStyles}> Description </label>
              <Input
                className="textarea"
                type="textarea"
                rows="3"
                style={styles.textArea}
                value={state.description.value}
                onChange={e => handleOnChange("description", e.target.value)}
              />
              {state.description.error && (
                <label style={{ color: "red" }}>
                  {state.description.error}
                </label>
              )}
            </FormGroup>
          </div>
          <div
            style={{ justifyContent: "center" }}
            className="modal-footer border-top-0 pt-5 pb-3"
          >
            <div>
              <Button
                onClick={updateValues ? updateNotes : addNewNotes}
                style={saveBtnStyle}
                disabled={disable}
                color="white"
                title=""
                type="button"
              >
                {notesRequesting ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : updateValues ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </Modal>

        {eventDetail && (
          <Modal isOpen={appointmentModal} toggle={appointmentToggle}>
            <ModalHeader style={{ borderBottom: 0 }}>
              <b>{eventDetail?.eventDetail?.title}</b>
              <button
                aria-hidden={true}
                className="close"
                data-dismiss="modal"
                type="button"
                style={{ outline: "none" }}
                onClick={appointmentToggle}
              >
                <i
                  className="nc-icon nc-simple-remove"
                  style={{ color: " #438B44" }}
                />
              </button>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  {requestError ? (
                    <Alert color="danger">Request Failed</Alert>
                  ) : null}
                </Col>
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <Col md="12">
                  <div style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                    <i
                      class="nc-icon nc-calendar-60"
                      style={{ marginRight: 15, color: "grey" }}
                    ></i>
                    <label style={styles.inputStyle}>
                      {moment(
                        eventDetail?.eventDetail?.appointment_date
                      ).format("d MMMM yyy")}
                    </label>
                  </div>
                </Col>
              </Row>
              <Row style={{ justifyContent: "center", marginTop: 20 }}>
                <Col md="12">
                  <div style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                    <i
                      class="fa fa-clock-o"
                      style={{ marginRight: 15, color: "grey" }}
                    ></i>
                    <label style={styles.inputStyle}>
                      {moment(
                        eventDetail?.eventDetail?.start_time,
                        "hh:mm"
                      ).format("hh:mmA")}{" "}
                      -{" "}
                      {moment(
                        eventDetail?.eventDetail?.end_time,
                        "hh:mm"
                      ).format("hh:mmA")}
                    </label>
                  </div>
                </Col>
              </Row>
              <Row style={{ justifyContent: "center", marginTop: 20 }}>
                <Col md="12">
                  <div style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                    <i
                      class="fa fa-map-marker"
                      style={{ marginRight: 15, color: "grey" }}
                    ></i>
                    <label style={styles.inputStyle}>
                      {eventDetail?.eventDetail?.client_address}
                    </label>
                  </div>
                </Col>
              </Row>

              <Row className="mt-4" style={{ justifyContent: "space-between" }}>
                <Col md="8">
                  <label style={styles.labelfontStyles}>Client Name</label>
                  <Input
                    style={{
                      width: 300,
                      backgroundColor: "white",
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#000000"
                    }}
                    readOnly={true}
                    value={eventDetail?.eventDetail?.client?.name}
                    className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                  />
                </Col>
                <Col md="4">
                  <label style={styles.labelfontStyles}>Number</label>
                  <Input
                    readOnly={true}
                    value={eventDetail?.eventDetail?.client_number}
                    style={{
                      backgroundColor: "white",
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#000000"
                    }}
                    className="border-top-0 border-right-0 border-left-0 p-0"
                  />
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <div className="">
                    <label style={styles.labelfontStyles}>
                      Assigned Employee/ Team
                    </label>
                    <Input
                      readOnly={true}
                      value={eventDetail?.eventDetail?.assigned_team?.title}
                      style={{
                        backgroundColor: "white",
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#000000"
                      }}
                      className="border-top-0 border-right-0 border-left-0 p-0"
                    />
                  </div>
                </Col>
              </Row>

              <Row
                className="mt-4 "
                style={{ justifyContent: "space-between" }}
              >
                <Col lg="6" md="6" sm="3">
                  <label style={styles.labelfontStyles}>Services</label>
                  <Select
                    className="react-select "
                    classNamePrefix="react-select"
                    name="singleSelect"
                    isDisabled={true}
                    value={{
                      value: eventDetail?.eventDetail?.service?.id,
                      label: eventDetail?.eventDetail?.service?.name
                    }}
                    placeholder="Single Select"
                  />
                </Col>
                <Col lg="6" md="6" sm="3">
                  <label style={styles.labelfontStyles}>Frequency</label>
                  <Select
                    className="react-select  "
                    classNamePrefix="react-select"
                    name="singleSelect"
                    isDisabled={true}
                    value={{
                      value: eventDetail?.eventDetail?.frequency?.id,
                      label: eventDetail?.eventDetail?.frequency?.title
                    }}
                    placeholder="Single Select"
                  />
                </Col>
              </Row>

              <Row style={{ justifyContent: "center", marginTop: 20 }}>
                <Col md="12">
                  <div className="">
                    <label style={styles.labelfontStyles}>Price</label>
                    <Input
                      readOnly={true}
                      value={eventDetail?.eventDetail?.price}
                      style={{
                        backgroundColor: "white",
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#000000"
                      }}
                      className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <label style={styles.labelfontStyles}> Description </label>
                    <Input
                      readOnly={true}
                      className="textarea"
                      type="textarea"
                      rows="3"
                      style={styles.textArea}
                      value={eventDetail?.eventDetail?.description}
                      Modal
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label style={styles.labelfontStyles}> Notes </label>
                    <Input
                      readOnly={true}
                      className="textarea"
                      type="textarea"
                      rows="3"
                      style={styles.textArea}
                      value={eventDetail?.eventDetail?.notes}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div
                style={{ justifyContent: "center" }}
                className="modal-footer border-top-0 pt-5 pb-3"
              >
                <div>
                  <Button
                    onClick={() => setAppointmentModal(false)}
                    style={saveBtnStyle}
                    // disabled={disable}
                    color="white"
                    title=""
                    disabled={true}
                    type="button"
                  >
                    {"Save"}
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        )}

        <Modal isOpen={pendingRequestModal} toggle={modalToggle}>
          <ModalHeader style={{ borderBottom: 0 }}>
            <span>
              <b style={{ paddingTop: 10 }}>{pendingDetails?.title}</b>
            </span>
            <button
              aria-hidden={true}
              className="close"
              data-dismiss="modal"
              type="button"
              style={{ outline: "none" }}
              onClick={modalToggle}
            >
              <i
                className="nc-icon nc-simple-remove"
                style={{ color: " #438B44" }}
              />
            </button>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                {requestError ? (
                  <Alert color="danger">Request Failed</Alert>
                ) : null}
              </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Col md="12">
                <div style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                  <i
                    class="nc-icon nc-calendar-60"
                    style={{ marginRight: 10, color: "grey" }}
                  ></i>
                  <label style={styles.inputStyle}>
                    {moment(pendingDetails?.appointment_date).format(
                      "d MMMM yyy"
                    )}
                  </label>
                </div>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", marginTop: 20 }}>
              <Col md="12">
                <div style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                  <i
                    class="fa fa-clock-o"
                    style={{ marginRight: 10, color: "grey" }}
                  ></i>
                  <label style={styles.inputStyle}>
                    {moment(pendingDetails?.start_time, "hh:mm").format(
                      "hh:mmA"
                    )}{" "}
                    -{" "}
                    {moment(pendingDetails?.end_time, "hh:mm").format("hh:mmA")}
                  </label>
                </div>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", marginTop: 20 }}>
              <Col md="12">
                <div style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                  <i
                    class="fa fa-map-marker"
                    style={{ marginRight: 15, color: "grey" }}
                  ></i>
                  <label style={styles.inputStyle}>
                    {pendingDetails?.client_address}
                  </label>
                </div>
              </Col>
            </Row>

            <Row className="mt-4" style={{ justifyContent: "space-between" }}>
              <Col md="8">
                <label style={styles.labelfontStyles}>Client Name</label>
                <Input
                  style={{
                    width: 300,
                    backgroundColor: "white",
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#000000"
                  }}
                  readOnly={true}
                  value={pendingDetails?.client?.name}
                  className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                />
              </Col>
              <Col md="4">
                <label style={styles.labelfontStyles}>Number</label>
                <Input
                  readOnly={true}
                  value={pendingDetails?.client_number}
                  style={{
                    backgroundColor: "white",
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#000000"
                  }}
                  className="border-top-0 border-right-0 border-left-0 p-0"
                />
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <div className="">
                  <label style={styles.labelfontStyles}>
                    Assigned Employee/ Team
                  </label>
                  <Input
                    readOnly={true}
                    value={pendingDetails?.assigned_team?.title}
                    style={styles.inputWraper}
                    className="border-top-0 border-right-0 border-left-0 p-0"
                  />
                </div>
              </Col>
            </Row>

            <Row className="mt-4 " style={{ justifyContent: "space-between" }}>
              <Col lg="6" md="6" sm="3">
                <label style={styles.labelfontStyles}>Services</label>
                <Select
                  className="react-select "
                  classNamePrefix="react-select"
                  name="singleSelect"
                  isDisabled={true}
                  style={{ fontSize: 14, fontWeight: "500", color: "#000000" }}
                  value={{
                    value: pendingDetails?.service?.id,
                    label: pendingDetails?.service?.name
                  }}
                  placeholder="Single Select"
                />
              </Col>
              <Col lg="6" md="6" sm="3">
                <label style={styles.labelfontStyles}>Frequency</label>
                <Select
                  className="react-select  "
                  classNamePrefix="react-select"
                  name="singleSelect"
                  style={{ fontSize: 14, fontWeight: "500", color: "#000000" }}
                  isDisabled={true}
                  value={{
                    value: pendingDetails?.frequency?.id,
                    label: pendingDetails?.frequency?.title
                  }}
                  placeholder="Single Select"
                />
              </Col>
            </Row>

            <Row style={{ justifyContent: "center", marginTop: 20 }}>
              <Col md="12">
                <div className="">
                  <label style={styles.labelfontStyles}>Price</label>
                  <Input
                    readOnly={true}
                    style={styles.inputWraper}
                    value={pendingDetails.price}
                    className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <label style={styles.labelfontStyles}> Description </label>
                  <Input
                    readOnly={true}
                    className="textarea"
                    type="textarea"
                    value={pendingDetails.description}
                    rows="3"
                    style={styles.textArea}
                    Modal
                    defaultValue="Oh so, your weak rhyme You doubt I'll bother,
                        "
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label style={styles.labelfontStyles}> Notes </label>
                  <Input
                    readOnly={true}
                    className="textarea"
                    type="textarea"
                    value={pendingDetails.notes}
                    rows="3"
                    style={styles.textArea}
                    defaultValue=""
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ justifyContent: "center" }}>
              <Col md="6">
                <Button
                  className="btnTest"
                  style={styles.addBtnText}
                  onClick={() => acceptRequest("Accept")}
                >
                  {actionRequest === 1 && actionRequesting ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Accept"
                  )}
                </Button>
              </Col>
              <Col md="6">
                <Button
                  className="btnTest2"
                  style={styles.addBtnText2}
                  outline
                  color="success"
                  onClick={() => acceptRequest("Reject")}
                >
                  {actionRequest === 2 && actionRequesting ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Reject"
                  )}
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}
const styles = {
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    fontWeight: "bold",
    fontSize: 17
  },
  addBtnText2: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#3A3B3C"
  },
  inputWraper: {
    backgroundColor: "white",
    fontSize: 14,
    fontWeight: "500",
    color: "#000000"
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
  },
  inputTextStyle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#000000"
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
    marginLeft: 2,
    cursor: "pointer"
  },
  notesListStyle: {
    backgroundColor: "#4C9041",
    borderRadius: 5,
    marginBottom: 2,
    marginLeft: 2,
    cursor: "pointer"
  },
  labelStyle: {
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Montserrat",
    width: 150,
    cursor: "pointer"
  },
  notFoundStyle: {
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
    color: "black",
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
  },
  dayWeekStyle: {
    fontFamily: "Montserrat",
    fontWeight: 500,
    color: "#000000",
    textAlign: "center",
    fontSize: 12,
    opacity: 0.6
  },
  dayWeekTextStyle: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    fontSize: 30
  },
  dayMonthStyle: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    color: "#000000",
    textAlign: "center",
    fontSize: 26,
    opacity: 0.6
  },
  monthHeaderStyle: {
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  monthDayCellStyle: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.6,
    color: "#000000"
  },
  labelfontStyles: {
    fontSize: 14,
    color: "grey",
    fontWeight: "500"
  },
  textArea: {
    opacity: "0.6",
    webkitBoxShadow: "1px 3px 1px #9E9E9E",
    mozBoxShadow: "1px 3px 1px #9E9E9E",
    boxShadow: "1px 3px 1px #9E9E9E",
    fontSize: 14,
    color: "#000000",
    backgroundColor: "white",
    fontWeight: "400"
  },
  saveBtnStyle: {
    background: "linear-gradient(#E6DE18, #438B44)",
    borderRadius: 15,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 86,
    paddingRight: 86,
    paddingTop: 17,
    paddingBottom: 17
  }
}

const mapStateToProps = state => ({
  requesting: state.calendar.requesting,
  appointmentsDays: state.calendar.appointmentsDays,
  notes: state.calendar.notes,
  pendingRequests: state.pendingRequests.pendingRequests.results,
  unAssignedEmployees: state.teams.unAssignedEmployees,
  actionRequesting: state.pendingRequests.requesting,
  notesRequesting: state.calendar.notesRequesting
  // htmlText: state.services.htmlText
})

const mapDispatchToProps = dispatch => ({
  getDayAcceptedAppointments: date =>
    dispatch(getDayAcceptedAppointments(date)),
  getNotes: () => dispatch(getNotes()),
  getPendingRequests: (index) => dispatch(getPendingRequests(index)),
  getUnAssignedEmployees: () => dispatch(getUnAssignedEmployees()),
  addNotes: (data, toggle) => dispatch(addNotes(data, toggle)),
  updateNotes: (data, id, toggle) => dispatch(updateNotes(data, id, toggle)),
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  requestAction: (data, modalToggle,index) =>
    dispatch(requestAction(data, modalToggle,index)),
  removeTeamMember: data => dispatch(removeTeamMember(data)),
  addTeamMember: data => dispatch(addTeamMember(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

