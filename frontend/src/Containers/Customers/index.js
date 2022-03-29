import React, { useState, useEffect } from "react"

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
  InputGroup,
  ModalHeader,
  InputGroupAddon,
  InputGroupText,
  ModalBody,
  Col,
  UncontrolledTooltip
} from "reactstrap"
import Switch from "react-bootstrap-switch"
import "./style.css"

import { connect } from "react-redux"

//Actions
import { renderHtmlText } from "../Services/redux/actions"
import { getAllCustomers,addCustomer } from "./redux/actions"
import { getServices } from "../Services/redux/actions"
import { getFrequencies } from "Containers/ScheduleServices/redux/actions"

// /utils
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

const Customers = props => {
  const { customers, servicesData, frequencies } = props
  const [modal, setModal] = React.useState(false)
  const [switchToogle, setSwitchToogle] = useState(false)
  const [notificationsValue, setNotificationsValue] = useState(false)

  

  useEffect(() => {
    props.renderHtmlText("Customers")
    props.getAllCustomers()
    props.getServices()
    props.getFrequencies()
  }, [])
  // Toggle for Modal
  const toggle = () => setModal(!modal)
  const [selectedClient, setSelectedClient] = useState("none")
  function handleSelectChange(event) {
    setSelectedClient(event.target.value)
  }

  
  const stateSchema = {
    fullName: {
      value: "",
      error: ""
    },
    email: {
      value: "",
      error: ""
    },
    company_name: {
      value: "",
      error: ""
    },
    phone_number: {
      value: "",
      error: ""
    },
    zip_code: {
      value: "",
      error: ""
    },
    address: {
      value: "",
      error: ""
    },
    service_id: {
      value: "",
      error: ""
    },
    other: {
      value: "",
      error: ""
    },
    freq_id: {
      value: "",
      error: ""
    },
  }

  const validationStateSchema = {
    fullName: {
      required: true
    },
    email: {
      required: true,
      validator: validator.email
    },
    company_name: {
      required: true
    },
    phone_number: {
      required: true,
      validator: validator.phone
    },
    zip_code: {
      required: true,
      validator: validator.numeric
    },
    address: {
      required: true
    },
    service_id: {
      required: true
    },
    other: {
      required: true
    },
    freq_id: {
      required: true
    },
   
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  const addNewCustomer=()=>{
    const data={
      name:state.fullName.value,
      email:state.email.value,
      company_name:state.company_name.value,
      phone_number:state.phone_number.value,
      zip_code:state.zip_code.value,
      address:state.address.value,
      service_id:parseInt(state.service_id.value),
      other:state.other.value,
      freq_id:parseInt(state.freq_id.value),
      notifications:notificationsValue
    }
    props.addCustomer(data)

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
      <Modal isOpen={modal} toggle={toggle}>
        <div>
          <div className="modal-header border-bottom-0">
            <button
              aria-hidden={true}
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={toggle}
            >
              <i
                className="nc-icon nc-simple-remove"
                style={{ color: " #438B44" }}
              />
            </button>
            <div>
              <label className="mt-5" style={styles.titleTextStyle}>
                Add Customer
              </label>
            </div>
          </div>
          <div className="modal-body ">
            <label style={styles.labelTextStyle}>Full Name*</label>
            <Input 
            style={styles.inputTextStyle}
             className="border-0 pl-0"
             onChange={e =>
              handleOnChange("fullName", e.target.value)
            } 
             />
            <div style={styles.inputLineStyle} />
            <div className="mt-4">
              <label style={styles.labelTextStyle}>Email*</label>
              <Input 
              style={styles.inputTextStyle} 
              className="border-0 pl-0" 
              onChange={e =>
                handleOnChange("email", e.target.value)
              } 
              />
              <div style={styles.inputLineStyle} />
            </div>

            <div className="mt-4">
              <label style={styles.labelTextStyle}>Company Name</label>
              <Input style={styles.inputTextStyle} className="border-0 pl-0" 
               onChange={e =>
                handleOnChange("company_name", e.target.value)
              } 
              />
              <div style={styles.inputLineStyle} />
            </div>
            <div className="mt-4">
              <label style={styles.labelTextStyle}>Phone Number*</label>
              <Input style={styles.inputTextStyle} className="border-0 pl-0" 
               onChange={e =>
                handleOnChange("phone_number", e.target.value)
              } 
              />
              <div style={styles.inputLineStyle} />
            </div>
            <Row>
              <Col lg={4}>
                <div className="mt-4">
                  <label style={styles.labelTextStyle}>Zip Code*</label>
                  <Input
                    style={styles.inputTextStyle}
                    className="border-0 pl-0"
                    onChange={e =>
                      handleOnChange("zip_code", e.target.value)
                    } 
                  />
                  <div style={styles.inputLineStyle} />
                </div>
              </Col>
              <Col lg={8}>
                <div className="mt-4">
                  <label style={styles.labelTextStyle}>Address*</label>
                  <Input
                    style={styles.inputTextStyle}
                    className="border-0 pl-0"
                    onChange={e =>
                      handleOnChange("address", e.target.value)
                    } 
                  />
                  <div style={styles.inputLineStyle} />
                </div>
              </Col>
            </Row>
            <div className="mt-4">
              <label style={styles.labelTextStyle}>Services*</label>
              <div style={styles.mainstyle} className="mt-4">
                <select
                  style={styles.selectStyle}
                  value={state.service_id.value}
                  onChange={e =>
                    handleOnChange("service_id", e.target.value)
                  } 
                >
                  <option value="none" selected disabled hidden></option>
                  {servicesData &&
                    servicesData.map(itemdata => (
                      <option value={itemdata.id}>{itemdata.name}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label style={styles.labelTextStyle}>Others</label>
              <Input style={styles.inputTextStyle} className="border-0 pl-0" 
               onChange={e =>
                handleOnChange("other", e.target.value)
              } 
              />
              <div style={styles.inputLineStyle} />
            </div>

            <div className="mt-4">
              <label style={styles.labelTextStyle}>Frequency*</label>
              <div style={styles.mainstyle} className="mt-4">
                <select
                  style={styles.selectStyle}
                  value={state.freq_id.value}
                  onChange={e =>
                    handleOnChange("freq_id", e.target.value)
                  }
                >
                  <option value="none" selected disabled hidden></option>

                  {frequencies &&
                    frequencies.map(frequenciesList => (
                      <option value={frequenciesList.id}>
                        {frequenciesList.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-between">
              <label style={styles.labelTextStyle}>Notifications</label>
              <Switch
                offColor="black"
                offText=""
                onColor="success"
                fontSize={"small"}
                onChange={(el, state) =>
                  setNotificationsValue(state)
                }
              />{" "}
            </div>
          </div>
        </div>
        <div className="modal-footer border-top-0  justify-content-center">
          <Button className="mb-3" style={styles.btnTextStyle} onClick={addNewCustomer}>
            Save Service
          </Button>
        </div>
      </Modal>
      <Row>
        <Col md="12">
          <Card style={styles.cardStyle}>
            <CardBody>
              <div className="d-flex align-items-center">
                <img
                  style={styles.searchImg}
                  src={require("assets/icons/search_icon.png")}
                />
                <Input
                  placeholder="Search"
                  type="search"
                  name="search"
                  style={styles.searchStyle}
                  onChange={e => console.log(e)}
                />

                <img
                  className="ml-3"
                  style={styles.filterImg}
                  src={require("assets/icons/filter_btn.png")}
                />
                <h7 className="pl-2">Filter</h7>
                <Button style={styles.addBtnText} onClick={toggle}>
                  Add Customer
                </Button>
              </div>
              <Table responsive="xl" bordered>
                <thead style={{ opacity: 0.5 }}>
                  <tr>
                    <th style={styles.theadText}>Client Information</th>
                    <th style={styles.theadText}>Service History</th>
                    <th style={styles.theadText}>Preferred Services</th>
                    <th style={styles.theadText}>Other</th>
                  </tr>
                </thead>
                <tbody>
                  {customers &&
                    customers.map((item, index) => (
                      <tr>
                        <td className="align-top">
                          <div
                            className="d-flex"
                            style={{ paddingLeft: 13, paddingRight: 11 }}
                          >
                            <h5 style={{ paddingRight: 10 }}>{index + 1}.</h5>
                            <div style={{ width: "100%", paddingTop: 5 }}>
                              <label style={styles.clientStyle}>
                                Full Name
                              </label>
                              <br></br>
                              <label style={styles.clientDataTextStyle}>
                                {item.name}
                              </label>
                              <br></br>
                              <label style={styles.clientStyle}>Email</label>
                              <br></br>
                              <label style={styles.clientDataTextStyle}>
                                {item.email}
                              </label>
                              <br></br>
                              <label style={styles.clientStyle}>
                                Company Name
                              </label>
                              <br></br>
                              <label style={styles.clientDataTextStyle}>
                                {item.company}
                              </label>
                              <br></br>
                              <div className="text-right">
                                <img
                                  src={require("assets/icons/dot_icon.png")}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="align-top"
                          style={{
                            maxHeight: 390,
                            overflowY: "scroll",
                            maxHeight: 395
                          }}
                        >
                          {item.service_history.map(serviceItem => (
                            <div
                              style={{
                                paddingLeft: 18,
                                paddingRight: 20
                                // overflowY: "scroll",
                              }}
                            >
                              <div className="d-flex justify-content-between">
                                <h7>
                                  {serviceItem.appointment_date} -{" "}
                                  {serviceItem.service.name} ($
                                  {serviceItem.price})
                                </h7>
                                <i
                                  className="fa fa-circle"
                                  style={{
                                    color: `${serviceItem.frequency.color_code}`,
                                    fontSize: "large"
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </td>

                        <td className="align-top">
                          {item.service_history.map(preferredServicesItem => (
                            <div style={{ paddingLeft: 18, paddingRight: 20 }}>
                              <div className="d-flex justify-content-between">
                                <h7>-{preferredServicesItem.service.name}</h7>
                                <i
                                  className="fa fa-circle"
                                  style={{
                                    color: `${preferredServicesItem.frequency.color_code}`,
                                    fontSize: "large"
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </td>
                        <td className="align-top">
                          <div className="pl-3 pr-3">
                            <div className=" d-flex justify-content-between">
                              <h7>Notifications</h7>
                              <Switch
                                offColor="black"
                                offText=""
                                onColor="yellow"
                                onChange={e => setSwitchToogle(!switchToogle)}
                                value={switchToogle}
                              />{" "}
                            </div>
                            <div>
                              <label>Notes</label>
                              <p>{item.other}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
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
  customers: state.customers.customers,
  servicesData: state.services.servicesData,
  frequencies: state.scheduleServices.frequencies
})

const mapDispatchToProps = dispatch => ({
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  getAllCustomers: () => dispatch(getAllCustomers()),
  getServices: () => dispatch(getServices()),
  getFrequencies: () => dispatch(getFrequencies()),
  addCustomer :(data) => dispatch(addCustomer(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Customers)

const styles = {
  inputLineStyle: {
    backgroundColor: "#D9D9D9",
    height: 1
  },
  cardStyle: {
    marginTop: 54,
    marginLeft: 54,
    marginRight: 54,
    opacity: 0.94
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
  btnTextStyle: {
    background:
      "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF",
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 50,
    paddingRight: 50
  },
  theadText: {
    paddingLeft: 20,
    borderLeft: "1px solid rgb(212, 212, 212)",
    width: 295
  },
  searchStyle: {
    height: 32,
    borderRadius: 20,
    backgroundColor: "#EBEBEB",
    color: "black",
    maxWidth: 590,
    paddingLeft: 39
  },
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: "auto"
  },
  searchImg: {
    height: 20,
    width: 20,
    position: "absolute",
    marginLeft: 10
  },

  filterImg: {
    height: 26,
    width: 26
  },
  clientStyle: {
    fontWeight: "500",
    fontSize: 12,
    color: "#000000",
    opacity: 0.4
  },
  clientDataTextStyle: {
    fontWeight: "500",
    fontSize: 12,
    color: "#000000"
  },
  mainstyle: {
    borderBottom: "1px solid #DDDDDD"
  },

  selectStyle: {
    outline: "none",
    width: "100%",
    border: 0,
    backgroundColor: "transparent",
    fontSize: 18
  }
}
