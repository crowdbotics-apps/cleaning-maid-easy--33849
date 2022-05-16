import React, { useEffect, useState, useRef, useCallback } from "react"
import LoadingBar from "react-top-loading-bar"

import { Calendar as MyCalendar, momentLocalizer } from "react-big-calendar"

import moment from "moment"
import { connect } from "react-redux"
import styless from "./styles.css"
import { Toaster } from "react-hot-toast"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import timezone from "moment-timezone"
import Pagination from "react-js-pagination"

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
import ScheduleService from "../../Containers/ScheduleServices/index"
import UpdateScheduleServices from "../UpdateScheduleServices/index"

//Actions
import {
  getDayAcceptedAppointments,
  getNotes,
  addNotes,
  updateNotes,
  editAppointmentCal
} from "./redux/actions"

import { renderHtmlText } from "../Services/redux/actions"
import {
  getPendingRequests,
  requestAction
} from "../PendingServices/redux/actions"
import {
  getUnAssignedEmployees,
  removeTeamMember,
  addTeamMember,
  getTeam
} from "../Teams/redux/actions"

import useForm from "../../utils/useForm"

import { events } from "variables/general.js"
timezone.tz.setDefault("en")

const BigCalendar = withDragAndDrop(MyCalendar)
const localizer = momentLocalizer(timezone)

const Calendar = props => {
  const {
    pendingRequests,
    teamData,
    notes,
    unAssignedEmployees,
    appointmentsDays,
    actionRequesting,
    notesRequesting,
    editAppointmentCal,
    requesting,
    addTeamMember,
    removeTeamMember
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
  const [myEvents, setMyEvents] = useState(false)
  const [currentpage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(false)
  const [currentPendingPage, setCurrentPendingPage] = useState(1)
  const [totalPendingCount, setTotalPendingCount] = useState(false)
  const [slotsValue, setSlotsValue] = useState(false)
  const [draggedEvent, setDraggedEvent] = useState()
  const [updateModal, setUpdateModal] = useState(false)

  const calendarRef = useRef()
  const UnAssignedTeamRef = useRef()

  let newDate = ""
  const resourceDummyData = [
    {
      resourceId: -1,
      resourceTitle: "No appointment"
    }
  ]
  const myNewData = ""
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
    props.getPendingRequests(currentPendingPage)
    props.getNotes()
    props.getUnAssignedEmployees(currentpage)
    props.getDayAcceptedAppointments(moment(new Date()).format("YYYY-MM-DD"))
    props.getTeam(moment(new Date()).format("YYYY-MM-DD"))
  }, [])

  useEffect(() => {
    setTotalCount(unAssignedEmployees?.count)
    setTotalPendingCount(pendingRequests?.count)
    if (viewState === 2) {
      let myDivs = document.getElementsByClassName("rbc-allday-cell")
      myDivs[0].style.display = "none"
    }
  }, [viewState, unAssignedEmployees, pendingRequests])

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

    props.requestAction(data, modalToggle, currentPendingPage, true)
    if (requestAction === "Accept") {
      setActionRequest(1)
    } else {
      setActionRequest(2)
    }
  }

  // const handlePageChange = page => {
  //   setCurrentPage(page)
  //   props.getUnAssignedEmployees(page)
  // }
  const handlePendingPageChange = page => {
    setCurrentPendingPage(page)
    props.getPendingRequests(page)
  }

  const closeModal = () => {
    setModal(!modal)
  }

  const closeUpdateModal = () => {
    setUpdateModal(!updateModal)
  }
  const getTeamMembers = () => {
    let copyTeams = [...teamData]
    const excludeObj = copyTeams.shift()
    const teams = [...copyTeams, excludeObj]

    const date = sessionStorage.getItem("date")
    const items =
      teams &&
      teams
        .map((item, index) => {
          return (
            item &&
            (viewState === 1 || viewState === 2) &&
            item?.team_members?.map(member => {
              return {
                allDay: true,
                end: new Date(`${date} 00:00:00`),
                start: new Date(`${date} 00:00:00`),
                title: member?.name,
                resourceId: item?.id,
                color: "#88AE31",
                memberId: member?.id,
                teamId: item?.id,
                viewState: viewState
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
          end: new Date(`${item?.appointment_date} ${item?.end_time}`),
          start: new Date(`${item?.appointment_date} ${item?.start_time}`),
          title: item?.title,
          resourceId: item?.assigned_team?.id,
          color: item.frequency.color_code,
          desc: item?.service?.description,
          eventDetail: item,
          viewState: viewState
        }
        return data
      })

    if (service && service.length) {
      items.push(...service)
    }

    const resourceData =
      teams &&
      teams.map(element => {
        return {
          resourceId: element?.id,
          resourceTitle: element?.title
        }
      })

    const resourceList = resourceData.length ? resourceData : resourceDummyData

    return { items, resourceList }
  }

  const allNotes = [
    {
      id: 1,
      title: "Edited New Note",
      description: "Note Edited Dscrp Here."
    }
  ]

  // const formats = {
  //   eventTimeRangeFormat: (date, culture, localizer) =>
  //     localizer.format(date, "dd", culture)
  // }

  const CustomToolbar = toolbar => {
    props.renderHtmlText({
      toolbar: toolbar,
      setViewState: setViewState,
      setModal: setModal
    })

    return <div></div>
  }

  const addTeamDrageOver = e => {
    e.preventDefault()
  }

  // const filterTeam = memberId => {
  //   return (
  //     unAssignedEmployees.results &&
  //     unAssignedEmployees.results.map(item => {
  //       if (item.id == memberId) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //   )
  // }

  // const addTeamOnDrop = (ev, id) => {
  //   let memberId = ev.dataTransfer.getData("memberId")

  //   const data = {
  //     member_ids: [parseInt(memberId)],
  //     team_id: parseInt(id)
  //   }

  //   const valueExists = [].concat
  //     .apply([], filterTeam(memberId))
  //     .filter(v => v !== false)

  //   if (valueExists.includes(true)) {
  //     addTeamMember(data, currentpage)
  //   }
  // }

  // const removeTeamDrageStart = (ev, memberId, teamId) => {
  //   ev.dataTransfer.setData("memberId", memberId)
  //   ev.dataTransfer.setData("teamId", teamId)
  // }

  // const removeTeamDrageOver = e => {
  //   e.preventDefault()
  // }
  // const removeTeamOnDrop = (ev, cat) => {
  //   let memberId = ev.dataTransfer.getData("memberId")
  //   let teamId = ev.dataTransfer.getData("teamId")

  //   const data = {
  //     member_ids: [parseInt(memberId)],
  //     team_id: parseInt(teamId)
  //   }
  //   const valueExists = [].concat
  //     .apply([], filterTeam(memberId))
  //     .filter(v => v !== false)

  //   if (!valueExists.includes(true)) {
  //     props.removeTeamMember(data, currentpage)
  //   }
  // }

  function CustomEvent({ event }) {
    return (
      <>
        {event.allDay && (
          <>
            <div
              className={viewState === 3 ? "" : "pt-1"}
              draggable
              onDragOver={e => event.allDay && addTeamDrageOver(e)}
            >
              <span
                style={{
                  fontWeight: event.allDay ? "500" : "600",
                  fontFamily: "Montserrat",
                  fontSize: 12,
                  color: "white"
                }}
              >
                {event.title}
              </span>
            </div>
          </>
        )}

        {!event.allDay && (
          <div className={viewState === 3 ? "" : "pt-1"}>
            <span
              style={{
                fontWeight: viewState === 3 ? "500" : "600",
                fontFamily: "Montserrat",
                fontSize: 12,
                color: "black"
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
                  <div>
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
        )}
      </>
    )
  }

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
    if (!event.allDay) {
      setAppointmentModal(true)
      setEventDetail(event)
      setUpdateModal(true)
    }
  }

  const onEventDrop = props => {
    const teamId = teamData.find(items => items.id === props.resourceId)
    if (props?.isAllDay || props.event.allDay === true) {
      if (props.event.teamId !== undefined) {
        const id = props.resourceId

        const data = {
          member_ids: [props.event.memberId],
          team_id: id,
        }

        // const data1 = {
        //   member_ids: [props.event.memberId],
        //   team_id: id,
        //   day_off:moment(props.start).format("YYYY-MM-DD")
        // }
        if (props.event.resourceId !== id) {
          addTeamMember(data, 1)
          // removeTeamMember(data1,1)
          setCurrentPage(1)
        }
      }
    } else {
      if (teamId?.title !== "Unassigned") {
        const id = props.event.eventDetail.id
        const swapIndex = appointmentsDays.findIndex(e => e.id == id)
        const data = new FormData()
        data.append("appointment_date", moment(props.end).format("YYYY-MM-DD"))
        data.append("start_time", moment(props.start).format("HH:mm:ss"))
        data.append("end_time", moment(props.end).format("HH:mm:ss"))
        viewState === 1 && data.append("assigned_team_id", props?.resourceId)
        editAppointmentCal(data, {
          id: id,
          swapIndex: swapIndex,
          appointmentsDays: appointmentsDays
        })
      }
    }
  }

  const customOnDragOver = useCallback(
    dragEvent => {
      if (draggedEvent !== "undroppable") {
        dragEvent.preventDefault()
      }
    },
    [draggedEvent]
  )

  const onSelectSlot = ({ action, slots, ...props }) => {
    const filterUnassignTeam = teamData.find(
      item => item.id === props.resourceId
    )

    if (viewState === 1 || viewState === 2) {
      if (slots[1] && slots[1] && filterUnassignTeam?.title !== "Unassigned") {
        if (action === "click") {
          setModal(true)
          setSlotsValue(slots)
        }
      }
    } else {
      if (action === "click") {
        setModal(true)
        setSlotsValue(slots)
      }
    }

    return false
  }

  return (
    <>
      <LoadingBar color="#4B8C01" height={5} progress={requesting ? 30 : 100} />
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
                          onEventDrop={onEventDrop}
                          onDragOver={customOnDragOver}
                          // resizable
                          components={{
                            toolbar: CustomToolbar,
                            event: CustomEvent,
                            week: {
                              header: WeekHeaderCellContent
                            },
                            month: {
                              header: MonthHeaderCellContent,
                              dateHeader: DateCellWrapper
                            }
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
                          events={
                            getTeamMembers().items ? getTeamMembers().items : []
                          }
                          onSelectSlot={onSelectSlot}
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
                                Requests / Notes
                              </span>
                            </div>
                            {/* <div
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
                              // onDragOver={e => removeTeamDrageOver(e)}
                              // onDrop={e => removeTeamOnDrop(e, "unAssign")}
                              style={{
                                overflowY: "scroll",
                                height: 200,
                                whiteSpace: "nowrap"
                              }}
                              Unassign
                            >
                              {unAssignedEmployees.results?.length ? (
                                unAssignedEmployees.results.map(
                                  (item, index) => (
                                    <div
                                      // onDragStart={e =>
                                      //  { addTeamDrageStart(e, item.id)
                                      //   handleDragStart(e, item)}
                                      // }
                                      draggable="true"
                                      key={index}
                                      className="text-center"
                                      style={teamListStyle}
                                    >
                                      <label style={labelStyle}>
                                        {item.name}
                                      </label>
                                    </div>
                                  )
                                )
                              ) : (
                                <div className="text-center">
                                  <label style={notFoundStyle}>
                                    No record found
                                  </label>
                                </div>
                              )}
                            </div>
                            {totalCount && (
                              <div className="pt-3 d-flex justify-content-center">
                                <Pagination
                                  aria-label="Page navigation example"
                                  itemClass="page-item"
                                  linkClass="page-link"
                                  prevPageText="<"
                                  nextPageText=">"
                                  firstPageText="<<"
                                  lastPageText=">>"
                                  activePage={currentpage}
                                  itemsCountPerPage={24}
                                  pageRangeDisplayed={2}
                                  totalItemsCount={totalCount && totalCount}
                                  onChange={handlePageChange}
                                />
                              </div>
                            )} */}
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
                                    key={index}
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
                              {pendingRequests.results?.length ? (
                                pendingRequests.results?.map((item, index) => (
                                  <div
                                    key={index}
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
                            {totalPendingCount && totalPendingCount ? (
                              <div className="pt-3 d-flex justify-content-center">
                                <Pagination
                                  aria-label="Page navigation example"
                                  itemClass="page-item"
                                  linkClass="page-link"
                                  prevPageText="<"
                                  nextPageText=">"
                                  firstPageText="<<"
                                  lastPageText=">>"
                                  activePage={currentPendingPage}
                                  itemsCountPerPage={24}
                                  pageRangeDisplayed={2}
                                  totalItemsCount={
                                    totalPendingCount && totalPendingCount
                                  }
                                  onChange={handlePendingPageChange}
                                />
                              </div>
                            ) : null}
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal size="xl" isOpen={modal} closeModal={closeModal}>
          <ScheduleService
            closeModal={closeModal}
            styles={styles}
            slotsValue={slotsValue}
            setSlotsValue={setSlotsValue}
          />
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
          <Modal
            size="xl"
            isOpen={updateModal}
            closeUpdateModal={closeUpdateModal}
          >
            <UpdateScheduleServices
              closeUpdateModal={closeUpdateModal}
              styles={styles}
              eventDetail={eventDetail}
              viewState={viewState}
            />
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
                      "LL"
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
    paddingTop: 10,
    paddingBottom: 10,
    color: "#000000"
  },
  pendingTextStyle: {
    fontWeight: "500",
    fontFamily: "Montserrat",
    fontsize: 12,
    paddingTop: 30,
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
  },

  tableHeading: {
    fontSize: 14,
    opacity: 0.5,
    fontWeight: "600",
    paddingBottom: 35
  },
  textFont: {
    fontSize: 14,
    fontWeight: "600",
    borderBottom: "1px solid rgb(212, 212, 212)"
  },
  addBtn: {
    background:
      "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(131.42deg, #00B9F1 13.37%, #034EA2 104.38%), #C4C4C4",
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 5
  },
  btnStyle: {
    background:
      "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%), linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), #FFFFFF",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: "bold"
  }
}

const mapStateToProps = state => ({
  requesting: state.calendar.requesting,
  appointmentsDays: state.calendar.appointmentsDays,
  notes: state.calendar.notes,
  pendingRequests: state.pendingRequests.pendingRequests,
  unAssignedEmployees: state.teams.unAssignedEmployees,
  actionRequesting: state.pendingRequests.requesting,
  notesRequesting: state.calendar.notesRequesting,
  teamData: state.teams.teamData
  // htmlText: state.services.htmlText
})

const mapDispatchToProps = dispatch => ({
  getDayAcceptedAppointments: date =>
    dispatch(getDayAcceptedAppointments(date)),
  getNotes: () => dispatch(getNotes()),
  getPendingRequests: index => dispatch(getPendingRequests(index)),
  getUnAssignedEmployees: index => dispatch(getUnAssignedEmployees(index)),
  addNotes: (data, toggle) => dispatch(addNotes(data, toggle)),
  updateNotes: (data, id, toggle) => dispatch(updateNotes(data, id, toggle)),
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  requestAction: (data, modalToggle, index, isCalender) =>
    dispatch(requestAction(data, modalToggle, index, isCalender)),
  removeTeamMember: (data, currentpage) =>
    dispatch(removeTeamMember(data, currentpage)),
  addTeamMember: (data, currentpage) =>
    dispatch(addTeamMember(data, currentpage)),
  editAppointmentCal: (data, details) =>
    dispatch(editAppointmentCal(data, details)),
  getTeam: (calenderDate) => dispatch(getTeam(calenderDate))
})
export default connect(mapStateToProps, mapDispatchToProps)(Calendar)