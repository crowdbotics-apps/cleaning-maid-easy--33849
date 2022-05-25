import React, { useState, useEffect } from "react"

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Input,
  Table,
  Row,
  Modal,
  Col,
  Spinner,
  UncontrolledAlert,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem
} from "reactstrap"
import Switch from "react-bootstrap-switch"
import "./style.css"
import Pagination from "react-js-pagination"

import { connect } from "react-redux"

//Actions
import { renderHtmlText } from "../Services/redux/actions"
import {
  getAllCustomers,
  addCustomer,
  addCustomerFailure,
  changeNotification,
  searchCustomers
} from "./redux/actions"
import { getServices } from "../Services/redux/actions"
import { getFrequencies } from "Containers/ScheduleServices/redux/actions"
import { deleteCustomer, updateCustomer } from "../Customers/redux/actions"

import { Toaster } from "react-hot-toast"

// /utils
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

const Customers = props => {
  const { customers, servicesData, frequencies, requesting } =
    props
  const [modal, setModal] = React.useState(false)
  const [notificationsValue, setNotificationsValue] = useState(false)
  const [notificationsId, setNotificationsId] = useState([])
  const [currentpage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(false)
  const [customerData, setCustomerData] = useState(false)

  useEffect(() => {
    props.renderHtmlText("Customers")
    props.getAllCustomers(currentpage)
    props.getServices()
    props.getFrequencies()
  }, [])

  useEffect(() => {
    customers?.results && filterNotifications()
    if (customers?.results?.length) {
      setTotalCount(customers.count)
      let mydiv = document.getElementsByClassName("table-responsive-xl")
      mydiv[0].style.maxHeight = "600px"
      mydiv[0].style.overflowY = "auto"
    } else {
      let mydiv = document.getElementsByClassName("table-responsive-xl")
      mydiv[0].style.height = ""
      mydiv[0].style.overflowY = ""
    }
  }, [customers])

  const [selectedClient, setSelectedClient] = useState("none")
  function handleSelectChange(event) {
    setSelectedClient(event.target.value)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
    props.getAllCustomers(page)
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
    }
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
      required: false
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
      required: true,
      validator: validator.address
    },
    service_id: {
      required: true
    },
    other: {
      required: false
    },
    freq_id: {
      required: true
    }
  }

  const filterNotifications = () => {
    const filteredItems =
      customers?.results &&
      customers?.results
        .map(item => {
          if (item.notifications_enabled) {
            return item.id
          }
        })
        .filter(e => e !== undefined)
    setNotificationsId(filteredItems ? filteredItems : [])
  }

  const handleChange = (item, state) => {
    if (notificationsId.includes(item.id)) {
      setNotificationsId(
        notificationsId.filter(elements => elements !== item.id)
      )
    } else {
      setNotificationsId(notificationsId => [...notificationsId, item.id])
    }
    let data = new FormData()
    data.append("notifications_enabled", state)
    props.changeNotification(data, item.id, currentpage)
  }

  // Toggle for Modal
  const toggle = () => {
    setNotificationsValue(false)
    setState(stateSchema)
    setModal(!modal)
    setCustomerData(false)
  }

  const { state, handleOnChange, setState, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  const addNewCustomer = () => {
    const data = {
      name: state.fullName.value,
      email: state.email.value,
      company_name: state.company_name.value,
      phone_number: state.phone_number.value,
      zip_code: state.zip_code.value,
      address: state.address.value,
      service_id: parseInt(state.service_id.value),
      other: state.other.value,
      freq_id: parseInt(state.freq_id.value),
      notifications: notificationsValue
    }
    props.addCustomer(data, toggle, currentpage)
  }

  const updateCustomerData = () => {
    const data = new FormData()
    data.append("name", state.fullName.value)
    data.append("email", state.email.value)
    data.append("company_name", state.company_name.value)
    data.append("phone_number", state.phone_number.value)
    data.append("zip_code", state.zip_code.value)
    data.append("address", state.address.value)
    data.append("service", parseInt(state.service_id.value))
    data.append("other", state.other.value)
    data.append("notifications_enabled", notificationsValue)
    data.append("frequency", parseInt(state.freq_id.value))
    props.updateCustomer(data, customerData.id, toggle, currentpage)
  }

  const editCustomer = data => {
    setModal(true)
    setCustomerData(data)
  }

  useEffect(() => {
    if (customerData) {
      handleOnChange("fullName", customerData.name)
      handleOnChange("email", customerData.email)
      handleOnChange("company_name", customerData.company)
      handleOnChange("phone_number", customerData.phone_number)
      handleOnChange("zip_code", customerData.zip_code)
      handleOnChange("address", customerData.address)
      handleOnChange("other", customerData.other)
      handleOnChange("service_id", customerData?.service?.id)
      handleOnChange("freq_id", customerData?.frequency?.id)
      setNotificationsValue(customerData.notifications_enabled)
    }
  }, [customerData])

  return (
    <>
      <Toaster position="top-center" />
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
                  {customerData ? "Update Customer" : "Add Customer"}
                </label>
              </div>
            </div>

            <div className="modal-body ">
              <label style={styles.labelTextStyle}>Full Name*</label>
              <Input
                style={styles.inputTextStyle}
                className="border-0 pl-0"
                value={state.fullName.value}
                onChange={e => handleOnChange("fullName", e.target.value)}
              />
              <div style={styles.inputLineStyle} />
              {state.fullName.error && (
                <label style={{ color: "red" }}>{state.fullName.error}</label>
              )}
              <div className="mt-4">
                <label style={styles.labelTextStyle}>Email*</label>
                <Input
                  style={styles.inputTextStyle}
                  value={state.email.value}
                  className="border-0 pl-0"
                  onChange={e => handleOnChange("email", e.target.value)}
                />
                <div style={styles.inputLineStyle} />
                {state.email.error && (
                  <label style={{ color: "red" }}>{state.email.error}</label>
                )}
              </div>

              <div className="mt-4">
                <label style={styles.labelTextStyle}>Company Name</label>
                <Input
                  style={styles.inputTextStyle}
                  className="border-0 pl-0"
                  value={state.company_name.value}
                  onChange={e => handleOnChange("company_name", e.target.value)}
                />
                <div style={styles.inputLineStyle} />
              </div>
              <div className="mt-4">
                <label style={styles.labelTextStyle}>Phone Number*</label>
                <Input
                  style={styles.inputTextStyle}
                  value={state.phone_number.value}
                  className="border-0 pl-0"
                  onChange={e => handleOnChange("phone_number", e.target.value)}
                />
                <div style={styles.inputLineStyle} />
                {state.phone_number.error && (
                  <label style={{ color: "red" }}>
                    {state.phone_number.error}
                  </label>
                )}
              </div>
              <Row>
                <Col lg={4}>
                  <div className="mt-4">
                    <label style={styles.labelTextStyle}>Zip Code*</label>
                    <Input
                      style={styles.inputTextStyle}
                      value={state.zip_code.value}
                      className="border-0 pl-0"
                      onChange={e => handleOnChange("zip_code", e.target.value)}
                    />
                    <div style={styles.inputLineStyle} />
                    {state.zip_code.error && (
                      <label style={{ color: "red" }}>
                        {state.zip_code.error}
                      </label>
                    )}
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="mt-4">
                    <label style={styles.labelTextStyle}>Address*</label>
                    <Input
                      style={styles.inputTextStyle}
                      className="border-0 pl-0"
                      value={state.address.value}
                      onChange={e => handleOnChange("address", e.target.value)}
                    />
                    <div style={styles.inputLineStyle} />
                    {state.address.error && (
                      <label style={{ color: "red" }}>
                        {state.address.error}
                      </label>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="mt-4">
                <label style={styles.labelTextStyle}>Services*</label>
                <div style={styles.mainstyle} className="mt-4">
                  <select
                    style={styles.selectStyle}
                    value={state.service_id.value}
                    onChange={e => handleOnChange("service_id", e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select
                    </option>
                    {servicesData &&
                      servicesData.map(itemdata => (
                        <option value={itemdata.id}>{itemdata.name}</option>
                      ))}
                  </select>
                </div>
                {state.service_id.error && (
                  <label style={{ color: "red" }}>
                    {state.service_id.error}
                  </label>
                )}
              </div>
              <div className="mt-4">
                <label style={styles.labelTextStyle}>Others</label>
                <Input
                  style={styles.inputTextStyle}
                  value={state.other.value}
                  className="border-0 pl-0"
                  onChange={e => handleOnChange("other", e.target.value)}
                />
                <div style={styles.inputLineStyle} />
              </div>
                <div className="mt-4">
                  <label style={styles.labelTextStyle}>Frequency*</label>
                  <div style={styles.mainstyle} className="mt-4">
                    <select
                      style={styles.selectStyle}
                      value={state.freq_id.value}
                      onChange={e => handleOnChange("freq_id", e.target.value)}
                    >
                      <option value="" selected disabled>
                        Select
                      </option>

                      {frequencies &&
                        frequencies.map(frequenciesList => (
                          <option value={frequenciesList.id}>
                            {frequenciesList.title}
                          </option>
                        ))}
                    </select>
                    {state.freq_id.error && (
                      <label style={{ color: "red" }}>
                        {state.freq_id.error}
                      </label>
                    )}
                  </div>
                </div>
              <div className="mt-4 d-flex justify-content-between">
                <label style={styles.labelTextStyle}>Notifications</label>
                <Switch
                  offColor="black"
                  offText=""
                  onColor="success"
                  fontSize={"small"}
                  value={notificationsValue}
                  onChange={(el, state) => setNotificationsValue(state)}
                />{" "}
              </div>
            </div>
          </div>
          <div className="modal-footer border-top-0  justify-content-center">
            <Button
              disabled={disable}
              className="mb-3"
              style={styles.btnTextStyle}
              onClick={() =>
                customerData ? updateCustomerData() : addNewCustomer()
              }
            >
              {requesting ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : customerData ? (
                "Update Service"
              ) : (
                "Save Service"
              )}
            </Button>
          </div>
        </Modal>
        <Row>
          <Col md="12">
            <Card style={styles.cardStyle}>
              <CardBody>
                <div className="d-flex align-items-center pb-3">
                  <img
                    style={styles.searchImg}
                    src={require("assets/icons/search_icon.png")}
                  />
                  <Input
                    placeholder="Search"
                    type="search"
                    name="search"
                    style={styles.searchStyle}
                    onChange={e => props.searchCustomers(e.target.value)}
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
                    {customers?.results?.length ? (
                      customers?.results?.map((item, index) => (
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
                                  {/* <Button
                                        className="btn-icon btn-neutral"
                                        size="sm"
                                        type="button"
                                      >
                                        <img
                                          src={require("assets/icons/dot_icon.png")}
                                        />
                                      </Button> */}
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      style={styles.tooggleStyle}
                                      // className="mr-5"
                                      data-toggle="dropdown"
                                      id="dropdownMenu"
                                      type="image"
                                    >
                                      <Button
                                        className="btn-icon btn-neutral"
                                        size="sm"
                                        type="button"
                                      >
                                        <img
                                          src={require("assets/icons/dot_icon.png")}
                                        />
                                      </Button>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                      <DropdownItem
                                        onClick={() => editCustomer(item)}
                                      >
                                        Edit
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() => {
                                          props.deleteCustomer(
                                            item.id,
                                            currentpage
                                          )
                                        }}
                                      >
                                        Delete
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="align-top">
                            <div
                              style={{
                                paddingLeft: 18,
                                paddingRight: 20,
                                maxHeight: 390,
                                overflowY: "scroll"
                              }}
                            >
                              {item.service_history.map(serviceItem => (
                                <div className="d-flex justify-content-between">
                                  <h7>
                                    {serviceItem.appointment_date} -{" "}
                                    {serviceItem?.service?.name} ($
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
                              ))}
                            </div>
                          </td>

                          <td className="align-top">
                            <div
                              style={{
                                paddingLeft: 18,
                                paddingRight: 20,
                                maxHeight: 390,
                                overflowY: "scroll"
                              }}
                            >
                              {item.service_history.map(
                                preferredServicesItem => (
                                  
                                  <div className="d-flex justify-content-between">
                                    {
                                      preferredServicesItem?.service!==null ?
                                      (
                                        <>
                                        <h7>
                                        -{preferredServicesItem?.service?.name}
                                      </h7>
                                      <i
                                        className="fa fa-circle"
                                        style={{
                                          color: `${preferredServicesItem?.frequency?.color_code}`,
                                          fontSize: "large"
                                        }}
                                      />
                                      </>
                                      ):null
                                    }
                                   
                                  </div>
                                )
                              )}
                            </div>
                          </td>
                          <td className="align-top">
                            <div className="pl-3 pr-3">
                              <div className=" d-flex justify-content-between">
                                <h7>Notifications</h7>
                                <Switch
                                  offColor="black"
                                  offText=""
                                  onChange={(el, state) =>
                                    handleChange(item, state)
                                  }
                                  value={
                                    notificationsId.includes(item.id)
                                      ? true
                                      : false
                                  }
                                />{" "}
                              </div>
                              <div>
                                <label>Notes</label>
                                <p>{item.other}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr style={{ textAlign: "end" }}>
                        <td style={{ border: 0 }}></td>
                        <td style={{ border: 0 }}>
                          {requesting ? (
                            <div style={{ paddingTop: 40, paddingBottom: 40 }}>
                              <Spinner
                                as="span"
                                animation="border"
                                size="lg"
                                role="status"
                                aria-hidden="true"
                              />
                            </div>
                          ) : (
                            <label style={styles.notFoundStyle}>
                              No Record Found
                            </label>
                          )}
                        </td>

                        <td style={{ border: 0 }}></td>
                        <td style={{ border: 0 }}></td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {customers?.results?.length ? (
                  <div className="pt-4 d-flex justify-content-center">
                    {totalCount && (
                      <Pagination
                        aria-label="Page navigation example"
                        itemClass="page-item"
                        linkClass="page-link"
                        prevPageText="Prev"
                        nextPageText="Next"
                        firstPageText="First"
                        lastPageText="Last"
                        activePage={currentpage}
                        itemsCountPerPage={24}
                        pageRangeDisplayed={10}
                        totalItemsCount={totalCount && totalCount}
                        onChange={handlePageChange}
                      />
                    )}
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  requesting: state.customers.requesting,
  customers: state.customers.customers,
  servicesData: state.services.servicesData,
  frequencies: state.scheduleServices.frequencies,
})

const mapDispatchToProps = dispatch => ({
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  getAllCustomers: index => dispatch(getAllCustomers(index)),
  getServices: () => dispatch(getServices()),
  getFrequencies: () => dispatch(getFrequencies()),
  addCustomer: (data, toggle, currentpage) =>
    dispatch(addCustomer(data, toggle, currentpage)),
  addCustomerFailure: error => dispatch(addCustomerFailure(error)),
  changeNotification: (data, id, currentpage) =>
    dispatch(changeNotification(data, id, currentpage)),
  searchCustomers: data => dispatch(searchCustomers(data)),
  deleteCustomer: (id, currentpage) =>
    dispatch(deleteCustomer(id, currentpage)),
  updateCustomer: (data, id, toggle, currentpage) =>
    dispatch(updateCustomer(data, id, toggle, currentpage))
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
  },
  notFoundStyle: {
    color: "black",
    paddingBottom: 40,
    paddingTop: 40,
    fontSize: 20,
    fontWeight: "bold"
  },
  tooggleStyle: {
    backgroundColor: "transparent",
    padding: 0
  }
}
