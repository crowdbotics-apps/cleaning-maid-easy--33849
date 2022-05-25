import React, { useState, useEffect } from "react"
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
  FormGroup,
  Input,
  Spinner
} from "reactstrap"
import Select from "react-select"
import { connect } from "react-redux"
import "../ScheduleServices/style.css"

import toast, { Toaster } from "react-hot-toast"

//Calender
import DatePicker from "react-date-picker"

//Moment
import moment from "moment"

//TimePicker
import TimePicker from "react-time-picker"

//UseformImports
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"
import { getState } from "utils/functions"

//Actions
import { getTeam } from "Containers/Teams/redux/actions"
import { getServices } from "Containers/Services/redux/actions"
import { getFrequencies, updateScheduleServices } from "./redux/actions"
import { getAllCustomers } from "../Customers/redux/actions"
import {
  requestAction
} from "../PendingServices/redux/actions"

//Images
import locationImage from "../../assets/icons/mapPin.png"
import calenderImage from "../../assets/icons/Calendar.png"
import clockImage from "../../assets/icons/Clock.png"

function UpdateScheduleServices(props) {
  const {
    closeUpdateModal,
    eventDetail,
    viewState,
    eventPendingRequest,
    currentpage,
    actionRequesting,
    isCalender,
    pendingCalendar
  } = props
  useEffect(() => {
    props.getTeam()
    props.getServices()
    props.getFrequencies()
    props.getAllCustomers(false, true)
    let mydiv = document.getElementsByClassName("react-date-picker__wrapper")
    mydiv[0].style.border = "none"
  }, [])

  useEffect(() => {
    if (eventPendingRequest) {
      setPendingDetailsId(eventPendingRequest?.id)
      setIsEdit(false)
      setBtnText("Edit")
      handleOnChange("price", eventPendingRequest?.price)
      handleOnChange("description", eventPendingRequest?.description)
      handleOnChange("notes", eventPendingRequest?.notes)
      handleOnChange("client_number", eventPendingRequest?.client_number)
      handleOnChange("title", eventPendingRequest?.title)
      handleOnChange("client_address", eventPendingRequest?.client_address)
      setToTime(
        new Date(
          `${
            eventPendingRequest?.appointment_date +
            " " +
            eventPendingRequest?.end_time
          }`
        )
      )
      setCalenderValue(new Date(eventPendingRequest?.appointment_date))
      setFromTime(
        new Date(
          `${
            eventPendingRequest?.appointment_date +
            " " +
            eventPendingRequest?.start_time
          }`
        )
      )
      setAppoinmentData({
        appointment_date: eventPendingRequest?.appointment_date,
        start_time: eventPendingRequest?.start_time,
        end_time: eventPendingRequest?.end_time,
        client_id: {
          label: eventPendingRequest?.client?.name,
          value: eventPendingRequest?.client?.id
        },
        assigned_team_id: {
          label: eventPendingRequest?.assigned_team?.title,
          value: eventPendingRequest?.assigned_team?.id
        },
        service_id: {
          label: eventPendingRequest?.service?.name,
          value: eventPendingRequest?.service?.id
        },
        frequency_id: {
          label: eventPendingRequest?.frequency?.title,
          value: eventPendingRequest?.frequency?.id
        }
      })
    }
    if (eventDetail) {
      setPendingDetailsId(eventDetail?.eventDetail?.id)
      handleOnChange("price", eventDetail?.eventDetail?.price)
      handleOnChange("description", eventDetail?.eventDetail?.description)
      handleOnChange("notes", eventDetail?.eventDetail?.notes)
      handleOnChange("client_number", eventDetail?.eventDetail?.client_number)
      handleOnChange("title", eventDetail?.eventDetail?.title)
      handleOnChange("client_address", eventDetail?.eventDetail?.client_address)
      setToTime(eventDetail?.end)
      setCalenderValue(eventDetail?.start)
      setFromTime(eventDetail?.start)
      setAppoinmentData({
        appointment_date: eventDetail?.eventDetail?.appointment_date,
        start_time: eventDetail?.eventDetail?.start_time,
        end_time: eventDetail?.eventDetail?.end_time,
        client_id: {
          label: eventDetail?.eventDetail?.client?.name,
          value: eventDetail?.eventDetail?.client?.id
        },
        assigned_team_id: {
          label: eventDetail?.eventDetail?.assigned_team?.title,
          value: eventDetail?.eventDetail?.assigned_team?.id
        },
        service_id: {
          label: eventDetail?.eventDetail?.service?.name,
          value: eventDetail?.eventDetail?.service?.id
        },
        frequency_id: {
          label: eventDetail?.eventDetail?.frequency?.title,
          value: eventDetail?.eventDetail?.frequency?.id
        }
      })
    }
  }, [])

  const { teamData, servicesData, frequencies, requesting, customers } = props

  //StatesForTimeDateValidation
  const [selectTime, setSelectTime] = useState(false)
  const [selectedDate, setSelectedDate] = useState(false)

  //StatesForCalender
  const [calendarValue, setCalenderValue] = useState("")

  //StatesForTimePicker
  const [fromTime, setFromTime] = useState("-1:00")
  const [toTime, setToTime] = useState("-1:00")

  const [btnText, setBtnText] = useState("Edit")
  const [isEdit, setIsEdit] = useState(false)

  const [appointmentData, setAppoinmentData] = useState({
    appointment_date: new Date()
  })
  const [pendingDetailsId, setPendingDetailsId]=useState('')

  const [actionRequest, setActionRequest] = useState(0)
  
  useEffect(() => {
    if (btnText === "Edit") {
      setIsEdit(false)
    }
  }, [btnText])
  //Useform
  const stateSchema = {
    price: {
      value: "",
      error: ""
    },
    description: {
      value: "",
      error: ""
    },
    notes: {
      value: "",
      error: ""
    },
    title: {
      value: "",
      error: ""
    },
    client_number: {
      value: "",
      error: ""
    },
    client_address: {
      value: "",
      error: ""
    }
  }

  const validationStateSchema = {
    price: {
      required: false
    },
    description: {
      required: false
    },
    notes: {
      required: false
    },
    title: {
      required: true
    },
    client_number: {
      required: true,
      validator: validator.numeric
    },
    client_address: {
      required: false
    }
  }

  const { state, handleOnChange, setState, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  const onSave = (title, value) => {
    let data = { ...appointmentData }
    data[title] = value
    setAppoinmentData(data)
  }

  const updateData = () => {
    if (isEdit === true || btnText === "Update") {
      onHandleSave()
    }
    else {
      setBtnText("Update")
      setIsEdit(true)
    }
  }

  const onHandleSave = () => {
    const data = { ...appointmentData, ...getState(state) }
    data["service_id"] = data.service_id.value
    data["assigned_team_id"] = data.assigned_team_id.value
    data["frequency_id"] = data.frequency_id.value
    data["client_id"] = data.client_id.value
    if (eventPendingRequest) {
      data["status"] = "Pending"
    }
    if (data.appointment_date) {
      setSelectedDate(false)
    } else {
      setSelectedDate(true)
    }

    if (data.start_time && data.end_time) {
      setSelectTime(false)
    } else {
      setSelectTime(true)
    }

    if (
      data.end_time &&
      data.start_time &&
      data.appointment_date &&
      data.assigned_team_id &&
      data.service_id &&
      data.frequency_id &&
      data.client_id
    ) {
      props.updateScheduleServices(
        data,
        eventPendingRequest
          ? eventPendingRequest.id
          : eventDetail.eventDetail.id,
        setBtnText,
        closeUpdateModal,
        viewState,
        currentpage && currentpage,
        isCalender && isCalender,
      )
    } else {
      toast.error("Please fill require fields!")
    }
  }

  const acceptRequest = requestAction => {
    const data = {
      appointment_id: pendingDetailsId,
      action: requestAction
    }
    props.requestAction(data, modalToggle, currentpage,pendingCalendar && pendingCalendar)
    // setRequestError(false)
    if (requestAction === "Accept") {
      setActionRequest(1)
    } else {
      setActionRequest(2)
    }
  }

  const modalToggle = () => {
    closeUpdateModal(false)
    setActionRequest(0)
  }

  return (
    <>
      <Toaster position="top-center" />
      <div
        style={{
          flex: 1
        }}
      >
        {closeUpdateModal && (
          <div className="modal-header border-bottom-0">
            <button
              aria-hidden={true}
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => {
                // setToTime('')
                // setCalenderValue('')
                // setFromTime('')
                closeUpdateModal()
              }}
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
              <label className="mt-2" style={styles.titleTextStyle}>
                {!isEdit ? "Service Details" : "Update Service"}
              </label>
            </div>
          </div>
        )}

        <Row>
          <Col md="12">
            <Card
              style={!closeUpdateModal ? styles.cardStyle : styles.bottomStyle}
            >
              <CardBody
                className="pl-5 pr-5"
                style={{ paddingTop: !closeUpdateModal ? 50 : "" }}
              >
                <Row>
                  <Col lg="6">
                    <div
                      style={{
                        borderBottom: "1px solid rgb(212, 212, 212)",
                        cursor: "pointer"
                      }}
                    >
                      <img
                        // alt="..."
                        src={calenderImage}
                        style={{ marginRight: 5 }}
                      />

                      <DatePicker
                        className={"calnderStyle"}
                        // clearIcon={false}
                        wrapperClassName="datePickerBorder"
                        disabled={isEdit ? false : true}
                        value={calendarValue}
                        // minDate={new Date()}
                        onChange={date => {
                          setCalenderValue(date)
                          const selectedDatee =
                            moment(date).format("YYYY-MM-DD")
                          onSave("appointment_date", selectedDatee)
                        }}
                      />
                    </div>
                    {selectedDate ? (
                      <label style={{ color: "red" }}>
                        *Please select a date.
                      </label>
                    ) : null}
                    <div
                      className="mt-4"
                      style={{
                        borderBottom: "1px solid rgb(212, 212, 212)"
                      }}
                    >
                      <img src={clockImage} style={{ marginRight: 10 }} />
                      <TimePicker
                        value={fromTime}
                        className={"timeStyle"}
                        disabled={isEdit ? false : true}
                        clockIcon
                        disableClock={true}
                        secondPlaceholder="ss"
                        onChange={e => {
                          onSave("start_time", e)
                          setFromTime(e)
                        }}
                      />
                      <label
                        style={{
                          marginLeft: 10,
                          marginRight: 15,
                          fontSize: 20
                        }}
                      >
                        -
                      </label>
                      <TimePicker
                        value={toTime}
                        className={"timeStyle"}
                        disabled={isEdit ? false : true}
                        disableClock={true}
                        onChange={e => {
                          onSave("end_time", e)
                          setToTime(e)
                        }}
                      />
                    </div>
                    <div>
                      {selectTime ? (
                        <label style={{ color: "red" }}>
                          *Please select start/end time.
                        </label>
                      ) : null}
                    </div>
                    <div
                      className="mt-4 d-flex"
                      style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}
                    >
                      <img
                        // alt="..."
                        src={locationImage}
                        style={{ marginRight: 10, paddingBottom: 10 }}
                      />
                      <Input
                        style={styles.inputStyle}
                        className="border-top-0 border-right-0 border-left-0 p-0"
                        disabled
                        value={state.client_address.value}
                      />
                    </div>
                    <Row style={{ marginTop: 28 }}>
                      <Col md="12">
                        <label style={styles.labelFont}>Title*</label>
                        <Input
                          style={styles.inputStyle}
                          disabled={isEdit ? false : true}
                          className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                          onChange={e =>
                            handleOnChange("title", e.target.value)
                          }
                          value={state.title.value}
                        />
                        <label style={{ color: "red" }}>
                          {state.title.error ? state.title.error : null}
                        </label>
                      </Col>
                    </Row>
                    <Row
                      className="mt-4"
                      style={{ justifyContent: "space-between" }}
                    >
                      <Col lg="7" md="6" sm="3">
                        <label style={styles.labelFont}>Client Name*</label>
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          value={appointmentData?.client_id}
                          isDisabled={isEdit ? false : true}
                          name="singleSelect"
                          options={
                            customers?.length &&
                            customers?.map(item => ({
                              label: item.name,
                              value: item.id,
                              address: item.address
                            }))
                          }
                          onChange={e => {
                            onSave("client_id", e)
                            handleOnChange("client_address", e.address)
                          }}
                          placeholder="Select Customer"
                        />
                      </Col>
                      <Col lg="4" md="6" sm="3">
                        <label style={styles.labelFont}>Number*</label>
                        <Input
                          style={styles.inputStyle}
                          className="border-top-0 border-right-0 border-left-0 p-0"
                          onChange={e =>
                            handleOnChange("client_number", e.target.value)
                          }
                          value={state.client_number.value}
                          disabled={isEdit ? false : true}
                        />
                        <label style={{ color: "red" }}>
                          {state.client_number.error
                            ? state.client_number.erroracceptRequest
                            : null}
                        </label>
                      </Col>
                    </Row>
                    {/* </div> */}
                    <div className="mt-4 ">
                      <label style={styles.labelFont}>
                        Assigned Employee/ Team*
                      </label>
                      <Select
                        className="react-select "
                        classNamePrefix="react-select"
                        name="singleSelect"
                        value={appointmentData?.assigned_team_id}
                        isDisabled={isEdit ? false : true}
                        options={
                          teamData &&
                          teamData
                            .filter(v => v.title !== "Unassigned")
                            .map(item => ({
                              label: item.title,
                              value: item.id
                            }))
                        }
                        onChange={e => onSave("assigned_team_id", e)}
                        placeholder="Single Select"
                      />
                    </div>

                    <Row
                      className="mt-4 "
                      style={{ justifyContent: "space-between" }}
                    >
                      <Col lg="6" md="6" sm="3">
                        <label style={styles.labelFont}>Services*</label>
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          name="singleSelect"
                          value={appointmentData?.service_id}
                          isDisabled={isEdit ? false : true}
                          options={
                            servicesData &&
                            servicesData.map(item => ({
                              label: item.name,
                              value: item.id,
                              price: item.price
                            }))
                          }
                          onChange={e => {
                            onSave("service_id", e)
                            handleOnChange("price", e.price)
                          }}
                          placeholder="Single Select"
                        />
                      </Col>
                      <Col lg="6" md="6" sm="3">
                        <label style={styles.labelFont}>Frequency*</label>
                        <Select
                          className="react-select  "
                          classNamePrefix="react-select"
                          name="singleSelect"
                          value={appointmentData?.frequency_id}
                          isDisabled={isEdit ? false : true}
                          options={
                            ({ label: "Select Frequency" },
                            frequencies &&
                              frequencies.map(item => ({
                                label: item.title,
                                value: item.id
                              })))
                          }
                          placeholder="Single Select"
                          onChange={e => onSave("frequency_id", e)}
                        />
                      </Col>
                    </Row>
                    <div className="mt-4">
                      <label style={styles.labelFont}>Price</label>
                      <Input
                        style={styles.inputStyle}
                        disabled
                        className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                        value={state.price.value}
                      />
                    </div>
                  </Col>
                  <Col lg="1"></Col>
                  <Col lg="4" style={{ alignSelf: "center" }}>
                    <div>
                      <FormGroup>
                        <label style={styles.labelFont}> Description </label>
                        <Input
                          className="textarea"
                          type="textarea"
                          rows="3"
                          placeholder="Enter description"
                          disabled={isEdit ? false : true}
                          style={styles.textArea}
                          value={state.description.value}
                          onChange={val =>
                            handleOnChange("description", val.target.value)
                          }
                        />
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup>
                        <label style={styles.labelFont}>Notes </label>
                        <Input
                          className="textarea"
                          type="textarea"
                          rows="3"
                          placeholder="Leave a note here..."
                          disabled={isEdit ? false : true}
                          style={styles.textArea}
                          value={state.notes.value}
                          onChange={val =>
                            handleOnChange("notes", val.target.value)
                          }
                        />
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="text-lg-right text-center">
                {(!eventDetail?.start && btnText === "Edit" )&& (
                  <>
                    <Button
                      style={styles.addBtnText}
                      color="white"
                      title=""
                      type="button"
                      disabled={disable}
                      size="lg"
                      onClick={() => acceptRequest("Accept")}
                    >
                      {actionRequest === 1 && actionRequesting  ? <Spinner size="sm" /> : "Accept"}
                    </Button>
                    <Button
                      style={{
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: "bold",
                        marginRight: 10
                      }}
                      lassName="btnTest2"
                      color="success"
                      title=""
                      type="button"
                      outline
                      disabled={disable}
                      size="lg"
                      onClick={() => acceptRequest("Reject")}
                    >
                      {actionRequest === 2 && actionRequesting  ? <Spinner size="sm" /> : "Reject"}
                    </Button>
                  </>
                )}
                <Button
                  style={{
                    background:
                      "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%), linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), #FFFFFF",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                  color="white"
                  title=""
                  type="button"
                  disabled={disable}
                  size="lg"
                  onClick={() => updateData()}
                >
                  {requesting ? <Spinner size="sm" /> : btnText}
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
const styles = {
  cardStyle: {
    marginTop: 54,
    marginLeft: 54,
    marginRight: 54,
    opacity: 0.94
  },
  bottomStyle: {
    marginBottom: "auto"
  },
  textArea: {
    opacity: "0.6",
    webkitBoxShadow: "1px 3px 1px #9E9E9E",
    mozBoxShadow: "1px 3px 1px #9E9E9E",
    boxShadow: "1px 3px 1px #9E9E9E",
    fontSize: 12,
    color: "#000000"
  },
  mainDivText: {
    borderRadius: 5,
    marginTop: 35,
    backgroundColor: "white"
  },
  labelFont: { fontSize: 14, fontWeight: "500" },
  inputStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000"
  },
  saveBtn: {
    backgroundColor:
      "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%), linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), #FFFFFF",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: "bold"
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: "600",
    display: "grid"
  },
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10
  }
}

const mapStateToProps = state => ({
  teamData: state.teams.teamData,
  servicesData: state.services.servicesData,
  frequencies: state.updateScheduleServices.frequencies,
  requesting: state.updateScheduleServices.requesting,
  customers: state.customers.customers,
  actionRequesting: state.pendingRequests.requesting,
})

const mapDispatchToProps = dispatch => ({
  getTeam: () => dispatch(getTeam()),
  getServices: () => dispatch(getServices()),
  updateScheduleServices: (data, id, setBtnText,closeUpdateModal, viewState, currentpage, isCalender, pendingCalendar) =>
    dispatch(
      updateScheduleServices(data, id, setBtnText,closeUpdateModal, viewState, currentpage,isCalender, pendingCalendar)
    ),
  getFrequencies: () => dispatch(getFrequencies()),
  getAllCustomers: (index, isTrue) => dispatch(getAllCustomers(index, isTrue)),
  requestAction: (data, modalToggle, index, isCalender) =>
    dispatch(requestAction(data, modalToggle, index, isCalender)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateScheduleServices)
