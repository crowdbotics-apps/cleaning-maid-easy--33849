import Footer from "components/Footer/Footer"
import React, { useState, useEffect } from "react"

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Col,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Modal,
  ModalBody,
  ModalHeader,
  Tooltip,
  UncontrolledTooltip,
  Spinner
} from "reactstrap"

import { connect } from "react-redux"
import { renderHtmlText } from "../Services/redux/actions"

import { Toaster } from "react-hot-toast"
import Pagination from "react-js-pagination"

import {
  addEmployee,
  getEmployeeList,
  deleteEmployee,
  updateEmployee,
  changeEmployeeTeam
} from "../Employees/redux/actions"
import { getTeam, addTeamMember } from "../Teams/redux/actions"

//utils
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

function Employees(props) {
  const {
    teamData,
    requesting,
    employeesList,
    getRequesting,
    backendError,
    changeEmployeeRequesting
  } = props
  const [selectedClient, setSelectedClient] = useState("none")
  const [editValues, setEditValues] = useState(false)
  const [itemId, setItemId] = useState(false)
  const [deleteId, setDeleteId] = useState(false)
  const [currentpage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(false)

  useEffect(() => {
    props.renderHtmlText("Employees")
    props.getTeam()
    props.getEmployeeList(currentpage)
  }, [])

  useEffect(() => {
    if (employeesList?.results?.length) {
      setTotalCount(employeesList.count)
      let mydiv = document.getElementsByClassName("table-responsive")
      mydiv[0].style.maxHeight = "600px"
    } else {
      let mydiv = document.getElementsByClassName("table-responsive")
      mydiv[0].style.maxHeight = ""
    }
  }, [employeesList])

  useEffect(() => {
    if (editValues) {
      handleOnChange("firstName", editValues.name)
      // handleOnChange("lastName", editValues.name.split(' ')[1] )
      handleOnChange("phone_number",  editValues.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") )
      handleOnChange("zip_code", editValues.zip_code)
      handleOnChange("company_name", editValues.company_name)
      handleOnChange("display_company", editValues.display_company)
      handleOnChange("team_id", editValues?.assigned_team?.id)
      handleOnChange("address", editValues.address)
    }
  }, [editValues])

  const stateSchema = {
    firstName: {
      value: "",
      error: ""
    },
    lastName: {
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
    display_company: {
      value: 0,
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
    team_id: {
      value: "",
      error: ""
    }
  }

  const validationStateSchema = {
    firstName: {
      required: true
    },
    lastName: {
      required: true
    },
    email: {
      required: true,
      validator: validator.email
    },
    company_name: {
      required: false
    },
    display_company: {
      required: false
    },
    phone_number: {
      required: false,
      validator: validator.contactNumber
    },
    zip_code: {
      required: false,
      validator: validator.numeric
    },
    address: {
      required: false,
      validator: validator.address
    },
    team_id: {
      required: false
    }
  }

  const { state, handleOnChange, setState, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  const addNewEmployee = () => {
    const data = {
      name: state.firstName.value + " " + state.lastName.value,
      email: state.email.value,
      company_name: state.company_name.value,
      display_company: state.display_company.value ? true : false,
      phone_number:  state.phone_number.value.replace(/[^\d]/g, ''),
      zip_code: state.zip_code.value,
      address: state.address.value,
      team_id: parseInt(state.team_id.value)
    }
    props.addEmployee(data, toggle, currentpage)
  }

  const editData = item => {
    toggle()
    setEditValues(item)
  }

  const toggle = () => {
    setmodal(!modal)
    setState(stateSchema)
    setEditValues(false)
  }

  const updateEmployee = () => {
    // const data = {
    //   name: state.firstName.value,
    //   company_name: state.company_name.value,
    //   display_company: state.display_company.value ? false : true,
    //   phone_number: state.phone_number.value,
    //   zip_code: state.zip_code.value,
    //   address: state.address.value,
    //   team_id: parseInt(state.team_id.value)
    // }
    const formBody = new FormData()
    formBody.append("name", state.firstName.value)
    formBody.append("company_name", state.company_name.value)
    formBody.append(
      "display_company",
      state.display_company.value === true
        ? true
        : state.display_company.value === false
        ? false
        : state.display_company.value
        ? true
        : false
    )
    formBody.append("phone_number", state.phone_number.value.replace(/[^\d]/g, ''))
    formBody.append("zip_code", state.zip_code.value)
    formBody.append("address", state.address.value)
    // formBody.append("team_id", parseInt(state.team_id.value))
    props.updateEmployee(formBody, editValues.id, toggle, currentpage)
  }

  const [modal, setmodal] = useState(false)

  const changeTeam = (teamId, employId) => {
    const data = {
      member_ids: [employId],
      team_id: teamId
    }
    props.addTeamMember(data, currentpage, true)
  }

  const [tooltipOpen, setTooltipOpen] = React.useState(false)
  function handleSelectChange(event) {
    setSelectedClient(event.target.value)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
    props.getEmployeeList(page)
  }

  const  formatPhoneNumber=(evt)=> {
    let number = evt.replace(/[^\d]/g, '')
    if (number.length == 10) {
        number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return number
    
}

const phoneNumberformat=(evt)=> {
  let number = evt.target.value.replace(/[^\d]/g, '')
  if (number.length == 10) {
      number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  evt.target.value = number;
  handleOnChange("phone_number", evt.target.value=number)
}

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
        <Row>
          <Col md="12">
            <Card style={styles.cardWraper}>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr style={styles.trHeading}>
                      <th></th>
                      <th>Employee Name</th>
                      <th>Address</th>
                      <th>Company</th>
                      <th>Phone number</th>
                      <th>Team</th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      overflowX: "auto",
                      overflowY: "hidden"
                      // overflow-y: auto;
                      // overflow-x: hidden
                    }}
                  >
                    {getRequesting ? (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <Spinner size="lg" />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    ) : employeesList?.results?.length === 0 ? (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <b>No record found</b>
                        </td>

                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    ) : (
                      employeesList &&
                      employeesList.results.map((item, index) => (
                        <tr style={styles.trheight}>
                          <td style={styles.tdFont}>{index + 1}</td>
                          <td style={styles.tdFont}>{item.name}</td>
                          <td>{item.address}</td>
                          <td>
                            <div
                              style={{
                                display: "block"
                              }}
                            >
                              <p id="TooltipExample" className="mb-0">
                                {item.display_company && item.company_name}
                              </p>

                              {/* <p id="TooltipExample" className="mb-0">
                                {item.display_company && item.company_name}
                              </p>
                              <Tooltip
                                isOpen={tooltipOpen}
                                placement="bottom"
                                target="TooltipExample"
                                trigger="click"
                                toggle={() => {
                                  setTooltipOpen(!tooltipOpen)
                                }}
                              >
                                <div>Display Company Name:</div>
                                <div style={styles.tooltipstyle}>
                                  <div className="mr-5">
                                    <Label check>
                                      <Input
                                        type="checkbox"
                                        class="custom-control-input"
                                      />
                                      Yes
                                    </Label>
                                  </div>
                                  <div>
                                    <Label check>
                                      <Input type="checkbox" />
                                      No
                                    </Label>
                                  </div>
                                </div>
                              </Tooltip> */}
                            </div>
                          </td>
                          <td>{ item.phone_number && formatPhoneNumber(item.phone_number)}</td>
                          <td>
                            {changeEmployeeRequesting && item.id === itemId ? (
                              <Spinner size="sm" />
                            ) : (
                              item?.assigned_team?.title
                            )}
                          </td>
                          <td style={styles.dropdownStyle}>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                style={styles.tooggleStyle}
                                // className="mr-5"
                                data-toggle="dropdown"
                                id="dropdownMenu"
                                type="image"
                              >
                                <img
                                  style={{
                                    maxWidth: 15
                                  }}
                                  alt="..."
                                  src={require("assets/icons/down_btn.png")}
                                />
                              </DropdownToggle>
                              <DropdownMenu right>
                                {teamData &&
                                  teamData.map(items => (
                                    <DropdownItem
                                      onClick={() => {
                                        setItemId(item.id)
                                        changeTeam(items.id, item.id)
                                      }}
                                    >
                                      {items.title}
                                    </DropdownItem>
                                  ))}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                          <td>
                            <div className="d-flex">
                              <div className="pr-2">
                                <Button
                                  className="btn-icon btn-neutral"
                                  size="sm"
                                  onClick={() => editData(item)}
                                  type="button"
                                >
                                  <img
                                    alt="..."
                                    src={require("assets/icons/pencil_btn.png")}
                                  />
                                </Button>
                              </div>
                              <div>
                                {requesting && item.id === deleteId ? (
                                  <Spinner style={{ marginTop: 8 }} size="sm" />
                                ) : (
                                  <Button
                                    className="btn-icon btn-neutral"
                                    size="sm"
                                    onClick={() => {
                                      setDeleteId(item.id)
                                      props.deleteEmployee(item.id, currentpage)
                                    }}
                                    type="button"
                                  >
                                    {" "}
                                    <img
                                      alt="..."
                                      src={require("assets/icons/delete_btn.png")}
                                    />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                {employeesList?.results?.length ? (
                  <div className="pt-2 d-flex justify-content-center">
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

              <CardFooter style={styles.stylefootter}>
                <Button
                  style={styles.btnColor}
                  color="white"
                  title=""
                  type="button"
                  onClick={() => {
                    setmodal(!modal)
                  }}
                >
                  Add Employee{" "}
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                  <div className="modal-header border-bottom-0">
                    <label style={{ fontSize: 24, fontWeight: "600" }}>
                      {editValues ? "Update Employee" : "Add Employee"}
                    </label>
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
                  </div>
                  <div className="modal-body ">
                    <label style={styles.labelStyle}>
                      {" "}
                      {editValues ? "Employee Name*" : "First Name*"}
                    </label>
                    <div>
                      <Input
                        style={styles.inputStyle}
                        value={state.firstName.value}
                        className="border-top-0 border-right-0 border-left-0 pl-0"
                        onChange={e =>
                          handleOnChange("firstName", e.target.value)
                        }
                      />
                      {state.firstName.error && (
                        <label style={{ color: "red" }}>
                          {state.firstName.error}
                        </label>
                      )}
                    </div>
                    {editValues ? null : (
                      <>
                        <label style={styles.labelStyle} className="mt-3">
                          Last Name*
                        </label>
                        <div>
                          <Input
                            style={styles.inputStyle}
                            className="border-top-0 border-right-0 border-left-0 pl-0"
                            onChange={e =>
                              handleOnChange("lastName", e.target.value)
                            }
                          />
                          {state.lastName.error && (
                            <label style={{ color: "red" }}>
                              {state.lastName.error}
                            </label>
                          )}
                        </div>
                      </>
                    )}

                    {!editValues ? (
                      <>
                        <label style={styles.labelStyle} className="mt-3">
                          Email*
                        </label>
                        <div>
                          <Input
                            style={styles.inputStyle}
                            className="border-top-0 border-right-0 border-left-0 pl-0"
                            onChange={e =>
                              handleOnChange("email", e.target.value)
                            }
                          />
                          {state.email.error && (
                            <label style={{ color: "red" }}>
                              {state.email.error}
                            </label>
                          )}
                          {/* // : backendError ? (
                        //   <label style={{ color: "red" }}>{backendError}</label>
                        // ) : null} */}
                        </div>
                      </>
                    ) : null}

                    {state.display_company.value ? (
                      <>
                        <label style={styles.labelStyle} className="mt-3">
                          Company Name
                        </label>
                        <div>
                          <Input
                            style={styles.inputStyle}
                            value={state.company_name.value}
                            className="border-top-0 border-right-0 border-left-0 pl-0"
                            onChange={e =>
                              handleOnChange("company_name", e.target.value)
                            }
                          />
                          {state.company_name.error && (
                            <label style={{ color: "red" }}>
                              {state.company_name.error}
                            </label>
                          )}
                        </div>
                      </>
                    ) : null}

                    <div style={styles.companyshow}>
                      Display Company Name:
                      <Label>
                        <Input
                          type="checkbox"
                          checked={state.display_company.value}
                          value={state.display_company.value}
                          class="custom-control-input"
                          onChange={e => handleOnChange("display_company", 1)}
                        />
                        Yes
                      </Label>
                      <Label check>
                        <Input
                          type="checkbox"
                          value={state.display_company.value}
                          checked={!state.display_company.value}
                          onChange={e => handleOnChange("display_company", 0)}
                        />
                        No
                      </Label>
                    </div>

                    <label style={styles.labelStyle} className="mt-3">
                      Phone Number
                    </label>
                    <div>
                      <Input
                        style={styles.inputStyle}
                        value={state.phone_number.value}
                        maxLength={10}
                        className="border-top-0 border-right-0 border-left-0 pl-0"
                        onChange={e =>
                          phoneNumberformat(e)
                        }
                      ></Input>
                      {state.phone_number.error && (
                        <label style={{ color: "red" }}>
                          {state.phone_number.error}
                        </label>
                      )}
                    </div>
                    <label style={styles.labelStyle} className="mt-3">
                      Address
                    </label>
                    <div>
                      <Input
                        style={styles.inputStyle}
                        value={state.address.value}
                        className="border-top-0 border-right-0 border-left-0 pl-0"
                        onChange={e =>
                          handleOnChange("address", e.target.value)
                        }
                      ></Input>
                      {state.address.error && (
                        <label style={{ color: "red" }}>
                          {state.address.error}
                        </label>
                      )}
                    </div>
                    <label style={styles.labelStyle} className="mt-3">
                      Zip Code
                    </label>
                    <div>
                      <Input
                        style={styles.inputStyle}
                        maxLength={6}
                        value={state.zip_code.value}
                        className="border-top-0 border-right-0 border-left-0 pl-0"
                        onChange={e =>
                          handleOnChange("zip_code", e.target.value)
                        }
                      ></Input>
                      {state.zip_code.error && (
                        <label style={{ color: "red" }}>
                          {state.zip_code.error}
                        </label>
                      )}
                    </div>
                    <label style={styles.labelStyle} className="mt-3">
                      Team
                    </label>
                    <div style={styles.mainstyle}>
                      <select
                        style={styles.selectStyle}
                        value={state.team_id.value}
                        disabled={editValues?.id ? true : false}
                        onChange={e =>
                          handleOnChange("team_id", e.target.value)
                        }
                      >
                        {" "}
                        <option value="" selected>
                          Select
                        </option>
                        {teamData &&
                          teamData.map(item => (
                            <option value={item.id}>{item.title}</option>
                          ))}
                      </select>
                    </div>
                    {state.team_id.error && (
                      <label style={{ color: "red" }}>
                        {state.team_id.error}
                      </label>
                    )}
                  </div>
                  <div
                    style={{ justifyContent: "center", marginBottom: 20 }}
                    className="modal-footer border-top-0 "
                  >
                    <div>
                      <Button
                        style={{
                          background: "linear-gradient(#E6DE18, #438B44)",
                          borderRadius: 15,
                          fontSize: 14,
                          fontWeight: "700"
                        }}
                        color="white"
                        disabled={!editValues?.id && disable}
                        title=""
                        type="button"
                        onClick={() =>
                          editValues?.id ? updateEmployee() : addNewEmployee()
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
                        ) : editValues?.id ? (
                          "Update Employee"
                        ) : (
                          "Save Employee"
                        )}
                      </Button>
                    </div>
                  </div>
                </Modal>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
const styles = {
  cardWraper: {
    marginTop: 54,
    marginLeft: 54,
    marginRight: 54,
    opacity: 0.94
  },
  dropdownStyle: {
    // display: "flex",
    // // alignItems: "center",
    paddingLeft: 27
    // justifyContent:'flex-end'
  },
  trHeading: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.5,
    height: 70
  },
  trheight: {
    fontSize: 12,
    fontWeight: "500",
    height: 63
  },
  tdFont: {
    fontSize: 14,
    fontWeight: "600"
  },
  tooltipstyle: {
    display: "flex",
    justifyContent: "center"
  },
  stylefootter: {
    alignSelf: "flex-end",
    marginBottom: 33
  },
  modalImg: {
    alignSelf: "end",
    maxWidth: 25,
    backgroundColor: "transparent"
  },
  btnColor: {
    background: "linear-gradient(#00B9F1, #034EA2)",
    borderRadius: 15,
    fontSize: 17,
    fontWeight: "600"
  },
  tooggleStyle: {
    backgroundColor: "transparent",
    padding: 0
  },
  companyshow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 21,
    fontSize: 12,
    opacity: 0.5
  },
  mainstyle: {
    borderBottom: "1px solid #DDDDDD",
    display: " flex",

    flexDirection: "rowReverse",
    alignItems: "flexEnd"
  },
  selectStyle: {
    outline: "none",
    width: 400,
    border: 0,
    backgroundColor: "transparent"
  },
  labelStyle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.5
  },
  inputStyle: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "500",
    color: "#000000"
  }
}

const mapStateToProps = state => ({
  requesting: state.employees.requesting,
  teamData: state.teams.teamData,
  backendError: state.employees.backendError,
  employeesList: state.employees.employeesList,
  getRequesting: state.employees.getRequesting,
  changeEmployeeRequesting: state.employees.changeEmployeeRequesting
})

const mapDispatchToProps = dispatch => ({
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  addEmployee: (data, toggle, currentpage) =>
    dispatch(addEmployee(data, toggle, currentpage)),
  getTeam: () => dispatch(getTeam()),
  getEmployeeList: index => dispatch(getEmployeeList(index)),
  deleteEmployee: (id, currentpage) =>
    dispatch(deleteEmployee(id, currentpage)),
  updateEmployee: (data, id, toggle, currentpage) =>
    dispatch(updateEmployee(data, id, toggle, currentpage)),
  addTeamMember: (data, currentpage, isEmployee) =>
    dispatch(addTeamMember(data, currentpage, isEmployee))
})
export default connect(mapStateToProps, mapDispatchToProps)(Employees)
