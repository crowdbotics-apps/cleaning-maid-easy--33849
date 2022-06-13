import React, { useState, useEffect } from "react"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledAlert,
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
import { getServices, renderHtmlText } from "Containers/Services/redux/actions"
import { getFrequencies, scheduleServices } from "./redux/actions"
import { getAllCustomers } from "../Customers/redux/actions"

//Images
import locationImage from "../../assets/icons/mapPin.png"
import calenderImage from "../../assets/icons/Calendar.png"
import clockImage from "../../assets/icons/Clock.png"

function ScheduleService(props) {
  const { closeModal, slotsValue, setSlotsValue } = props
  useEffect(() => {
    !closeModal && props.renderHtmlText("Schedule Service")
    props.getTeam()
    props.getServices()
    props.getFrequencies()
    props.getAllCustomers(false, true)
    let mydiv = document.getElementsByClassName("react-date-picker__wrapper")
    mydiv[0].style.border = "none"
  }, [])

  // react-date-picker__wrapper
  const { teamData, servicesData, frequencies, requesting, customers } = props

  //StatesForTimeDateValidation
  const [selectTime, setSelectTime] = useState(false)
  const [selectedDate, setSelectedDate] = useState(false)

  //StatesForCalender
  const [calendarValue, setCalenderValue] = useState("")

  //StatesForTimePicker
  const [fromTime, setFromTime] = useState("-1:00")
  const [toTime, setToTime] = useState("-1:00")

  const [appointmentData, setAppoinmentData] = useState({
    appointment_date: new Date()
  })

  // const [otherData, setOtherData] = useState({
  //   assigned_team_id: [],
  //   service_id: [],
  //   frequency_id: [],
  //   appointment_date: new Date()
  // })

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
    data["start_time"] = fromTime
    data["end_time"] = toTime

    // data["start_time"] = moment(toTime).format("HH:mm")
    // data["end_time"] = moment(fromTime).format("HH:mm")
    if (slotsValue?.length) {
      data["appointment_date"] = moment(slotsValue[0]).format("YYYY-MM-DD")
    }
    // if (slotsValue?.length) {
    //   if (slotsValue[0] && slotsValue[1]) {
    //     data["start_time"] = moment(slotsValue[0]).format("HH:mm")
    //     data["appointment_date"] = moment(slotsValue[0]).format("YYYY-MM-DD")
    //     data["end_time"] = moment(slotsValue[1]).format("HH:mm")
    //   } else {
    //     data["appointment_date"] = moment(slotsValue[0]).format("YYYY-MM-DD")
    //   }
    // }

    setAppoinmentData(data)
  }

  const onHandleSave = () => {
    const data = { ...appointmentData, ...getState(state) }
    data["status"] = "Pending"

    const datas = moment(new Date()).format("ddd MMM YYYY")
    const myData = moment(data.appointment_date).format("ddd MMM YYYY")
    if (datas !== myData) {
      setSelectedDate(false)
    } else {
      setSelectedDate(true)
    }

    if (data.start_time !== "-1:00" && data.end_time !== "-1:00") {
      setSelectTime(false)
    } else {
      setSelectTime(true)
    }

    if (
      data.end_time &&
      data.start_time &&
      (data.appointment_date || (slotsValue && slotsValue[0])) &&
      data.assigned_team_id &&
      data.service_id &&
      data.frequency_id
      // data.client_id
    ) {
      props.getScheduleServices(data, closeModal, setSlotsValue)
    } else {
      toast.error("Please fill require fields!")
    }
  }

  useEffect(() => {
    if (slotsValue) {
      setToTime(moment(slotsValue[1]).format("HH:mm"))
      setCalenderValue(slotsValue[0])
      setFromTime(moment(slotsValue[0]).format("HH:mm"))
    }
  }, [slotsValue])

  const customStyle = {
    control: (base, state) => ({
      ...base,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      // backgroundColor: "#fff",
      boxShadow: "none"
    })
  }
  return (
    <>
      <Toaster position="top-center" />
      <div
        className="content"
        style={{
          backgroundRepeat: !closeModal && "no-repeat",
          backgroundSize: !closeModal && "cover",
          backgroundImage:
            !closeModal && `url(${require("assets/images/bg_content.png")})`,
          flex: 1
        }}
      >
        {closeModal && (
          <div className="modal-header border-bottom-0">
            <button
              aria-hidden={true}
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => {
                setSlotsValue(false)
                closeModal()
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
                Add Service
              </label>
            </div>
          </div>
        )}

        <Row>
          <Col md="12">
            <Card style={!closeModal ? styles.cardStyle : styles.bottomStyle}>
              <CardBody
                className="pl-5 pr-5"
                style={{ paddingTop: !closeModal ? 50 : "" }}
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
                        style={{ marginRight: 5}}
                      />

                      <DatePicker
                        className={"calnderStyle"}
                        disabled={slotsValue?.length ? true : false}
                        // clearIcon={false}
                        wrapperClassName="datePickerBorder"
                        value={calendarValue}
                        minDate={new Date()}
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
                        // disabled={slotsValue?.length === 2 ? true : false}
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
                      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                          value={endTime}
                          onChange={(newValue) => {
                            onSave("end_time", moment(newValue).format('HH:mm'))
                            setEndTime(newValue);
                          }}
                          renderInput={(params) => 
                          <div><TextField {...params} placeholder='Start time' /></div>}
                        />
                  </LocalizationProvider> */}
                      <TimePicker
                        value={toTime}
                        className={"timeStyle"}
                        // disabled={slotsValue?.length === 2 ? true : false}
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
                        className="border-top-0 border-right-0 border-left-0 p-0 border-bottom-0"
                        // onChange={e => handleOnChange("client_address", e.target.value)}
                        disabled
                        value={state.client_address.value}
                      />
                    </div>

                    {/* <div
                    className="mt-4 d-flex"
                    style={{
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  > */}
                    <Row style={{ marginTop: 28 }}>
                      <Col md="12">
                        <label style={styles.labelFont}>Title*</label>
                        <Input
                          style={styles.inputStyle}
                          className="border-top-0 border-right-0 border-left-0 p-0"
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
                      style={{ justifyContent: "space-between" }}
                    >
                      <Col lg="7" md="6" sm="3">
                        <label style={styles.labelFont}>Client Name*</label>
                        <Select
                          // className="react-select"
                          // classNamePrefix="react-select"
                          components={{
                            IndicatorSeparator: () => null
                          }}
                          styles={customStyle}
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
                            onSave("client_id", e.value)
                            handleOnChange("client_address", e.address)
                          }}
                          placeholder="Select Customer"
                        />
                        {/* <Input
                        style={styles.inputStyle}
                        className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                      /> */}
                      </Col>
                      <Col lg="4" md="6" sm="3">
                        <label style={styles.labelFont}>Number*</label>
                        <Input
                          style={styles.numberInputStyle}
                          className="border-top-0 border-right-0 border-left-0 p-0"
                          onChange={e =>
                            handleOnChange("client_number", e.target.value)
                          }
                          value={state.client_number.value}
                        />
                        <label style={{ color: "red" }}>
                          {state.client_number.error
                            ? state.client_number.error
                            : null}
                        </label>
                      </Col>
                    </Row>
                    {/* </div> */}
                    <div className="mt-1 ">
                      <label style={styles.labelFont}>
                        Assigned Employee/ Team*
                      </label>
                      {/* <Input
                      style={styles.inputStyle}
                      className="border-top-0 border-right-0 border-left-0 p-0"
                    /> */}
                      <Select
                        c // className="react-select"
                        // classNamePrefix="react-select"
                        components={{
                          IndicatorSeparator: () => null
                        }}
                        styles={customStyle}
                        name="singleSelect"
                        //  value={appointmentData?.assigned_team_id?.value}
                        options={
                          teamData &&
                          teamData
                            .filter(v => v.title !== "Unassigned")
                            .map(item => ({
                              label: item.title,
                              value: item.id
                            }))
                        }
                        onChange={e => onSave("assigned_team_id", e.value)}
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
                          // className="react-select"
                          // classNamePrefix="react-select"
                          components={{
                            IndicatorSeparator: () => null
                          }}
                          styles={customStyle}
                          name="singleSelect"
                          value={appointmentData?.service_id?.value}
                          options={
                            servicesData &&
                            servicesData.map(item => ({
                              label: item.name,
                              value: item.id,
                              price: item.price
                            }))
                          }
                          onChange={e => {
                            onSave("service_id", e.value)
                            handleOnChange("price", e.price)
                          }}
                          placeholder="Single Select"
                        />
                      </Col>
                      <Col lg="6" md="6" sm="3">
                        <label style={styles.labelFont}>Frequency*</label>
                        <Select
                          // className="react-select"
                          // classNamePrefix="react-select"
                          components={{
                            IndicatorSeparator: () => null
                          }}
                          styles={customStyle}
                          name="singleSelect"
                          // value={appointmentData?.frequency_id?.value}
                          options={
                            ({ label: "Select Frequency" },
                            frequencies &&
                              frequencies.map(item => ({
                                label: item.title,
                                value: item.id
                              })))
                          }
                          placeholder="Single Select"
                          onChange={e => onSave("frequency_id", e.value)}
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
                          rows="5"
                          placeholder="Enter description"
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
                        <label style={styles.labelFont1}>Notes </label>
                        <Input
                          className="textarea"
                          type="textarea"
                          rows="5"
                          placeholder="Leave a note here..."
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
                  onClick={() => onHandleSave()}
                >
                  {requesting ? <Spinner size="sm" /> : "Save"}
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
    boxShadow: "1px 2px 5px #d3d3d3",
    // margin: "4em",
    // padding: "1em",
    fontSize: 12,
    color: "#000000",
    height: 120
  },
  mainDivText: {
    borderRadius: 5,
    marginTop: 35,
    backgroundColor: "white"
  },
  labelFont: { fontSize: 14, fontWeight: "500" },
  labelFont1: { fontSize: 14, fontWeight: "500", marginTop: 35 },
  inputStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000"
  },
  numberInputStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginTop: 20
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
  }
}

const mapStateToProps = state => ({
  teamData: state.teams.teamData,
  servicesData: state.services.servicesData,
  frequencies: state.scheduleServices.frequencies,
  requesting: state.scheduleServices.requesting,
  customers: state.customers.customers
})

const mapDispatchToProps = dispatch => ({
  getTeam: () => dispatch(getTeam()),
  getServices: () => dispatch(getServices()),
  getScheduleServices: (data, closeModal, setSlotsValue) =>
    dispatch(scheduleServices(data, closeModal, setSlotsValue)),
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  getFrequencies: () => dispatch(getFrequencies()),
  getAllCustomers: (index, isTrue) => dispatch(getAllCustomers(index, isTrue))
})
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleService)
