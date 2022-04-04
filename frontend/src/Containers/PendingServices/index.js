import React, { useEffect, useState } from "react"

import { connect } from "react-redux"

//utils
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

import moment from "moment"

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Col,
  UncontrolledTooltip,
  Spinner,
  UncontrolledAlert,
  Alert
} from "reactstrap"
import { reduceEachLeadingCommentRange } from "typescript"

//Components
import Select from "react-select"

//CSS File Import
import "../PendingServices/styles.css"

//Actions
import {
  getAppointmentDetails,
  getPendingRequests,
  requestAction
} from "./redux/actions"

import { renderHtmlText } from "../Services/redux/actions"

const PendingServices = props => {
  const { requesting, pendingRequests } = props

  const [modal, setModal] = React.useState(false)
  const [requestError, setRequestError] = useState(false)
  const [pendingDetails, setPendingDetails] = useState(false)

  useEffect(() => {
    props.getPendingRequests()
    props.renderHtmlText("Pending Services")
  }, [])

  useEffect(() => {
    if(pendingRequests.length){
      let mydiv=document.getElementsByClassName('table-responsive')
      mydiv[0].style.maxHeight='600px'
    }
    else{
      let mydiv=document.getElementsByClassName('table-responsive')
      mydiv[0].style.maxHeight=''
    }
    
  }, [pendingRequests])


  const stateSchema = {
    serviceName: {
      value: "",
      error: ""
    },
    serviceDescription: {
      value: "",
      error: ""
    },
    servicePrice: {
      value: "",
      error: ""
    }
  }

  const validationStateSchema = {
    serviceName: {
      required: true
    },
    serviceDescription: {
      required: true
    },
    servicePrice: {
      required: true
    }
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  // Toggle for Modal
  const toggle = () => {}

  const closeModal = () => {
    setPendingDetails('')
    setModal(!modal)
  }

  const modalToggle = () => {
    setModal(!modal)
    setPendingDetails('')
  }

  const acceptRequest=(requestAction)=>{
    const data={
      appointment_id: pendingDetails.id,
      action: requestAction
    }
    props.requestAction(data,modalToggle)
    setRequestError(false)
  }
  
  return (
    <div
      className="content "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${require("assets/images/bg_content.png")})`,
        flex: 1
      }}
    >
      <Modal isOpen={modal} toggle={modalToggle}>
        <ModalHeader style={{ borderBottom: 0 }}>
          <span><b style={{paddingTop:10}}>{pendingDetails?.title}</b></span>
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
                {moment(
                        pendingDetails?.appointment_date
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
                  style={{ marginRight: 10, color: "grey" }}
                ></i>
                <label style={styles.inputStyle}>
                {moment(
                       pendingDetails?.start_time,
                        "hh:mm"
                      ).format("hh:mmA")}{" "}
                      -{" "}
                      {moment(
                        pendingDetails?.end_time,
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
                <label style={styles.inputStyle}>9400 Ninove Street, SA</label>
              </div>
            </Col>
          </Row>

          <Row className="mt-4" style={{ justifyContent: "space-between" }}>
            <Col md="8">
              <label style={styles.labelfontStyles}>Client Name</label>
              <Input
                style={{ width: 300, backgroundColor: "white", fontSize:14, fontWeight:'500',color:'#000000' }}
                readOnly={true}
                value={pendingDetails?.client?.name}
                className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
              />
            </Col>
            <Col md="4">
              <label style={styles.labelfontStyles}>Number</label>
              <Input
                readOnly={true}
                style={{ backgroundColor: "white" , fontSize:14, fontWeight:'500',color:'#000000'}}
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
                style={{ fontSize:14, fontWeight:'500',color:'#000000'}}
                value={{
                  value: pendingDetails?.service?.id, label: pendingDetails?.service?.name
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
                style={{ fontSize:14, fontWeight:'500',color:'#000000'}}
                isDisabled={true}
                value={{
                  value: pendingDetails?.frequency?.id, label: pendingDetails?.frequency?.title
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
                onClick={()=>acceptRequest("Accept")}
              >
                Accept
              </Button>
            </Col>
            <Col md="6">
              <Button
                className="btnTest2"
                style={styles.addBtnText2}
                outline
                color="success"
                onClick={()=>acceptRequest("Reject")}
              >
                Reject
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Row>
        <Col md="12">
          <Card
            style={{
              marginTop: 54,
              marginLeft: 54,
              marginRight: 54,
              opacity: 0.94
            }}
          >
            <CardBody>
              <Table responsive>
                <thead style={{ opacity: 0.5 }}>
                  <tr>
                    <th style={styles.theadText}></th>
                    <th style={styles.theadText}>Client Name</th>
                    <th style={styles.theadText}>Notes</th>
                    <th style={styles.theadText}>Service </th>
                    {/* <th style={styles.theadText}></th> */}
                  </tr>
                </thead>
                <tbody>
                  {requesting ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Spinner size="lg" />
                      </td>
                    </tr>
                  ) : pendingRequests.length === 0 ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <b>No record found</b>
                      </td>
                      <td></td>
                    </tr>
                  ) : (
                    pendingRequests &&
                    pendingRequests.map((item, i) => (
                      <tr>
                        <td style={styles.tdataText1}>{i + 1}.</td>
                        <td
                          style={styles.tdataText2}
                          onClick={() => {
                            // props.getAppointmentDetails()
                            setPendingDetails(item)
                            setModal(true)
                            setRequestError(false)

                          }}
                        >
                          {item.title}
                        </td>
                        <td style={styles.tdataText}>{item.description}</td>
                        <td style={styles.tdataText}>{item.service.name}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  requesting: state.pendingRequests.requesting,
  pendingRequests: state.pendingRequests.pendingRequests
  //   servicesError: state.services.servicesError
})

const mapDispatchToProps = dispatch => ({
  getPendingRequests: () => dispatch(getPendingRequests()),
  getAppointmentDetails: data => dispatch(getAppointmentDetails(data)),
  requestAction: (data, modalToggle) => dispatch(requestAction(data, modalToggle)),
  renderHtmlText: data => dispatch(renderHtmlText(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(PendingServices)

const styles = {
  inputLineStyle: {
    backgroundColor: "#D9D9D9",
    height: 1
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
  inputTextStyle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#000000"
  },
  inputWraper:{
    backgroundColor: "white",
    fontSize:14, 
    fontWeight:'500',
    color:'#000000'
  },
  btnTextStyle: {
    background:
      "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF",
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 50,
    paddingRight: 50
  },
  theadText: {
    paddingTo: 20,
    paddingBottom: 30
  },
  tdataText1: {
    fontSize: 14,
    lineHeight: 3,
    fontWeight: "500"
  },
  tdataText2: {
    fontSize: 14,
    lineHeight: 3,
    cursor: "pointer",
    fontWeight: "600"
  },
  tdataText: {
    fontSize: 12,
    fontWeight: "500"
  },
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    fontWeight: "bold",
    fontSize: 17
  },
  labelfontStyles: {
    fontSize: 14,
    color: "grey",
    fontWeight: "500"
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000"
  },
  textArea: {
    webkitBoxShadow: "1px 3px 1px #9E9E9E",
    mozBoxShadow: "1px 3px 1px #9E9E9E",
    boxShadow: "1px 3px 1px #9E9E9E",
    fontSize: 12,
    color: "#000000",
    backgroundColor: "white"
  },

  addBtnText2: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#3A3B3C"
  },
  addBtnText: {
    fontWeight: "bold",
    fontSize: 14
  }
}
