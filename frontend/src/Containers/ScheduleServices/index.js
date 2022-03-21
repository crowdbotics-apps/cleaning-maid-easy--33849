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
  ModalFooter
} from "reactstrap"
import Select from "react-select"
import { connect } from "react-redux"

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
import { scheduleServices } from "./redux/actions"

function ScheduleService(props) {
  useEffect(() => {
    props.getTeam()
    props.getServices()
  }, [])

  const { teamData, servicesData } = props

  //StatesForCalender
  const [calendarValue, setCalenderValue] = useState(new Date())
  const [calenderModal, setCalenderModal] = useState(false)

  //StatesForTimePicker
  const [fromTime, setFromTime] = useState("14:00")
  const [toTime, setToTime] = useState("14:00")

  const [appointmentData, setAppoinmentData] = useState({})

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
      required: true
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
    // let data = getState(state)
    // data["client_id"] = 3
    let data = { ...appointmentData }
    data[title] = value
    setAppoinmentData(data)
    console.log("data", data)
  }

  const onHandleSave = () => {
    const data = { ...appointmentData, ...getState(state) }
    data["client_id"] = 3
    data["status"] = "pending"
    console.log("data", data)
    props.getScheduleServices(data)
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
              <Row>
                <Col lg="6">
                  <div
                    style={{
                      borderBottom: "1px solid rgb(212, 212, 212)",
                      cursor: "pointer"
                    }}
                  >
                    <i class="nc-icon nc-headphones pr-2"></i>
                    <DatePicker
                      className={"calnderStyle"}
                      clearIcon
                      value={calendarValue}
                      onChange={date => {
                        const selectedDate = moment(date).format("YYYY-MM-DD")
                        onSave("appointment_date", selectedDate)
                      }}
                    />
                  </div>
                  <div
                    className="mt-4"
                    style={{
                      borderBottom: "1px solid rgb(212, 212, 212)"
                    }}
                  >
                    <i class="nc-icon nc-headphones pr-2"></i>
                    {/* <label style={styles.inputStyle}>09:00AM - 11:30AM</label> */}
                    <TimePicker
                      value={fromTime}
                      clearIcon
                      clockIcon
                      onChange={e => {
                        onSave("start_time", e)
                      }}
                    />
                    <label
                      style={{ marginLeft: 10, marginRight: 10, fontSize: 20 }}
                    >
                      -
                    </label>
                    <TimePicker
                      value={toTime}
                      clearIcon
                      clockIcon
                      autoFocus={false}
                      onChange={e => onSave("end_time", e)}
                    />
                  </div>
                  <div
                    className="mt-4"
                    style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}
                  >
                    <i class="nc-icon nc-headphones pr-2"></i>
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
                      <Input
                        style={styles.inputStyle}
                        className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
                      />
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
                        className="react-select primary "
                        classNamePrefix="react-select"
                        name="singleSelect"
                        options={[
                          { value: "1", label: "1 week" },
                          { value: "2", label: "2 weeks" }
                        ]}
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
                        style={styles.textArea}
                        onChange={val =>
                          handleOnChange("description", val.target.value)
                        }
                        defaultValue="Oh so, your weak rhyme You doubt I'll bother,
                        reading into it"
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
                size="lg"
                onClick={() => onHandleSave()}
              >
                Save{" "}
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
  servicesData: state.services.servicesData
})

const mapDispatchToProps = dispatch => ({
  getTeam: () => dispatch(getTeam()),
  getServices: () => dispatch(getServices()),
  getScheduleServices: (data) => dispatch(scheduleServices(data))

})
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleService)
