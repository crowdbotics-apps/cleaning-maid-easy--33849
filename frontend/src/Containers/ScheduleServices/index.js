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
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import '../ScheduleServices/style.css'


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
import calenderImage from "../../assets/icons/calendar.png"
import clockImage from "../../assets/icons/Clock.png"

function ScheduleService(props) {
  useEffect(() => {
    props.getTeam()
    props.getServices()
    props.renderHtmlText("Schedule Service")
    props.getFrequencies()
    props.getAllCustomers()
    let mydiv=document.getElementsByClassName('react-date-picker__wrapper')
    mydiv[0].style.border='none'
  }, [])

  // react-date-picker__wrapper

  const { teamData, servicesData, frequencies, requesting, customers } = props

  //StatesForTimeDateValidation
  const [selectTime, setSelectTime] = useState(false)
  const [selectedDate, setSelectedDate] = useState(false)

  //StatesForCalender
  const [calendarValue, setCalenderValue] = useState()
  const [calenderModal, setCalenderModal] = useState(false)

  //StatesForTimePicker
  const [fromTime, setFromTime] = useState("14:00")
  const [toTime, setToTime] = useState("14:00")
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] =useState(false);

  const [appointmentData, setAppoinmentData] = useState({
    appointment_date: new Date()
  })

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
    }
  }

  const validationStateSchema = {
    price: {
      required: true,
      validator: validator.numeric
    },
    description: {
      required: true
    },
    notes: {
      required: true
    },
    title: {
      required: true
    }
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )
  const onSave = (title, value) => {
    let data = { ...appointmentData }
    data[title] = value
    setAppoinmentData(data)
  }

  const onHandleSave = () => {
    const data = { ...appointmentData, ...getState(state) }
    data["status"] = "Pending"

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
      data.frequency_id
      // data.client_id
    ) {
      props.getScheduleServices(data)
    } 
  }

  return (
    <div
      className="content"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${require("assets/images/bg_content.png")})`,
        flex: 1
      }}
    >
      <Row>
        <Col md="12">
          <Card style={styles.cardStyle}>
            <CardBody className="pl-5 pr-5 pt-5">
              {/* <div>
              <UncontrolledAlert color="success" fade={false}>
                <span>Success</span>
              </UncontrolledAlert>
              </div> */}
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
                      value={calendarValue}
                      onChange={date => {
                        setCalenderValue(date)
                        const selectedDatee = moment(date).format("YYYY-MM-DD")
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
                    {/* <label style={styles.inputStyle}>09:00AM - 11:30AM</label> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                          value={startTime}
                          onChange={(newValue) => {
                            onSave("start_time", moment(newValue).format('HH:mm'))
                            setStartTime(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} placeholder='Start time' />}
                        />
                  </LocalizationProvider>
                    {/* <TimePicker
                      value={fromTime}
                      clearIcon={(
                        <i
                         class="nc-icon nc-simple-remove"
                       ></i>
                     )}
                      className={"timeStyle"}
                      clockIcon
                      onChange={e => {
                        onSave("start_time", e)
                        setFromTime(e)
                      }}
                    /> */}
                    <label
                      style={{ marginLeft: 10, marginRight: 15, fontSize: 20 }}
                    >
                      -
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                          value={endTime}
                          onChange={(newValue) => {
                            onSave("end_time", moment(newValue).format('HH:mm'))
                            setEndTime(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} placeholder='Start time' />}
                        />
                  </LocalizationProvider>
                    {/* <TimePicker
                      value={toTime}
                      clearIcon
                      className={"timeStyle"}
                      clockIcon
                      autoFocus={false}
                      onChange={e => {
                        onSave("end_time", e)
                        console.log("e",e);
                        setToTime(e)
                      }}
                    /> */}
                  </div>
                  <div>
                    {selectTime ? (
                      <label style={{ color: "red" }}>
                        *Please select start/end time.
                      </label>
                    ) : null}
                  </div>
                  <div
                    className="mt-4"
                    style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}
                  >
                    <img
                      // alt="..."
                      src={locationImage}
                      style={{ marginRight: 10 }}
                    />
                    <label style={styles.inputStyle}>
                      9400 Ninove Street, SA
                    </label>
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
                      <label style={styles.labelFont}>Title</label>
                      <Input
                        style={styles.inputStyle}
                        className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                        onChange={e => handleOnChange("title", e.target.value)}
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
                      <label style={styles.labelFont}>Client Name</label>
                      <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        name="singleSelect"
                        options={
                          customers &&
                          customers.map(item => ({
                            label: item.name,
                            value: item.id
                          }))
                        }
                        onChange={e => onSave("client_id", e.value)}
                        placeholder="Select Customer"
                      />
                      {/* <Input
                        style={styles.inputStyle}
                        className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                      /> */}
                    </Col>
                    <Col lg="4" md="6" sm="3">
                      <label style={styles.labelFont}>Number</label>
                      <Input
                        style={styles.inputStyle}
                        className="border-top-0 border-right-0 border-left-0 p-0"
                      />
                    </Col>
                  </Row>
                  {/* </div> */}
                  <div className="mt-4 ">
                    <label style={styles.labelFont}>
                      Assigned Employee/ Team
                    </label>
                    {/* <Input
                      style={styles.inputStyle}
                      className="border-top-0 border-right-0 border-left-0 p-0"
                    /> */}
                    <Select
                      className="react-select "
                      classNamePrefix="react-select"
                      name="singleSelect"
                      options={
                        teamData &&
                        teamData.map(item => ({
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
                      <label style={styles.labelFont}>Services</label>
                      <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        name="singleSelect"
                        options={
                          servicesData &&
                          servicesData.map(item => ({
                            label: item.name,
                            value: item.id
                          }))
                        }
                        onChange={e => onSave("service_id", e.value)}
                        placeholder="Single Select"
                      />
                    </Col>
                    <Col lg="6" md="6" sm="3">
                      <label style={styles.labelFont}>Frequency</label>
                      <Select
                        className="react-select  "
                        classNamePrefix="react-select"
                        name="singleSelect"
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
                      className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                      onChange={e => handleOnChange("price", e.target.value)}
                    />

                    <label style={{ color: "red" }}>
                      {state.price.error ? state.price.error : null}
                    </label>
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
                        style={styles.textArea}
                        onChange={val =>
                          handleOnChange("description", val.target.value)
                        }
                      />
                      {state.description.error && (
                        <label style={{ color: "red" }}>
                          {state.description.error}
                        </label>
                      )}
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
                        style={styles.textArea}
                        onChange={val =>
                          handleOnChange("notes", val.target.value)
                        }
                      />
                      {state.notes.error && (
                        <label style={{ color: "red" }}>
                          {state.notes.error}
                        </label>
                      )}
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
  )
}
const styles = {
  cardStyle: {
    marginTop: 54,
    marginLeft: 54,
    marginRight: 54,
    opacity: 0.94
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
  getScheduleServices: data => dispatch(scheduleServices(data)),
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  getFrequencies: () => dispatch(getFrequencies()),
  getAllCustomers: () => dispatch(getAllCustomers())
})
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleService)
