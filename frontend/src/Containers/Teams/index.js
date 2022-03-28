import React, { useState,useEffect} from "react"
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
  Col,
  Modal,
  UncontrolledTooltip,
  Spinner
} from "reactstrap"
import CardFooter from "reactstrap/lib/CardFooter"
//Actions
import { getTeam, getEmployees, createTeam, deleteTeam ,getUnAssignedEmployees } from "./redux/actions"
import {renderHtmlText} from '../Services/redux/actions'
//Redux
import { connect } from "react-redux"


import { isPropertySignature } from "typescript"
function Teams(props) {
  const {
    employeesData,
    requesting,
    employeeRequesting,
    teamData,
    deleteRequesting,
    createRequesting,
    unAssignedEmployees
  } = props
  const [modal, setmodal] = useState(false)
  const [teamName, setTeamName] = useState(false)
  const [nameError, setNameError] = useState(false)

  const toggle = () => {
    setmodal(!modal)
  }

  const [deleteId, setDeleteId] = useState(false)
  const [selectedMembers, setSelectedMebers] = useState([])
  const [searchData, setSearchData] = useState("")

  useEffect(() => {
    props.getTeam()
    props.renderHtmlText('Teams')
    props.getUnAssignedEmployees()
  }, [])

  const arrayData = [
    { image: require("assets/img/mike.jpg"), name: "muddasir", id: 1 },
    { image: require("assets/img/mike.jpg"), name: "babur", id: 2 },
    { image: require("assets/img/mike.jpg"), name: "subhan", id: 3 },
    { image: require("assets/img/mike.jpg"), name: "mutasim", id: 4 },
    { image: require("assets/img/mike.jpg"), name: "ali", id: 5 },
    { image: require("assets/img/mike.jpg"), name: "furqan", id: 6 },
    { image: require("assets/img/mike.jpg"), name: "etc", id: 7 }
  ]

  const filterData = () => {
    let filterData =
      employeesData &&
      employeesData.filter(item =>
        item.name.toLowerCase().includes(searchData.toLowerCase())
      )
    return filterData
  }

  const employeeData = data => {
    if (selectedMembers.includes(data.id)) {
      setSelectedMebers(selectedMembers.filter(item => item !== data.id))
    } else {
      setSelectedMebers(selectedMembers => [...selectedMembers, data.id])
    }
  }

  const deleteTeam = id => {
    props.deleteTeam(id)
    setDeleteId(id)
  }

  const createTeam = () => {
    const regEx = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
    if (regEx.test(teamName)) {
      let apiData = {
        member_ids: [1, 2, 3, 4, 5],
        team_name: teamName
      }
      props.createTeam(apiData, setmodal)
      setNameError(false)
    } else {
      setNameError(true)
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
            <CardBody>
              <div>
                <Table responsive="lg">
                  <thead>
                    <tr style={styles.tableHeading}>
                      <th></th>
                      <th>Team Name</th>
                      <th>Team Members</th>
                      <th></th>
                      <th>Unassigned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.length ? (
                      teamData.map((item, index) => (
                        <tr style={styles.borderBottom}>
                          <td className="text-center " style={styles.textFont}>
                            {index + 1}
                          </td>
                          <td className="" style={styles.textFont}>
                            {item.title}
                          </td>
                          <td style={{ width: "52%", borderLeft: "" }}>
                            {item.team_members?.length &&
                              item.team_members.map(item => (
                                <>
                                  {item.name !== null && (
                                    <Button
                                      style={styles.addBtn}
                                      color="white"
                                      title=""
                                      type="button"
                                      size="sm"
                                    >
                                      {item.name}
                                    </Button>
                                  )}
                                </>
                              ))}
                          </td>
                          <td
                            style={styles.borderBottom}
                            className="text-center "
                          >
                            <img
                              className="mr-3"
                              style={styles.imgStyle}
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                            {deleteRequesting && deleteId === item.id ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <img
                                style={styles.imgStyle}
                                onClick={() => deleteTeam(item.id)}
                                // style={{marginLeft:50}}
                                alt="..."
                                src={require("assets/icons/delete_btn.png")}
                              />
                            )}
                          </td>
                          {!index && (
                            <td
                              rowSpan="7"
                              style={{
                                borderLeft: "1px solid rgb(212, 212, 212)"
                              }}
                            >
                              <div>
                                <Button
                                  style={styles.addBtn}
                                  color="white"
                                  title=""
                                  type="button"
                                  size="sm"
                                >
                                  Jane Cooper
                                </Button>
                              </div>
                              <div className="mt-2">
                                <Button
                                  style={styles.addBtn}
                                  color="white"
                                  title=""
                                  type="button"
                                  size="sm"
                                >
                                  Jane Cooper
                                </Button>
                              </div>
                              <div className="mt-2">
                                <Button
                                  style={styles.addBtn}
                                  color="white"
                                  title=""
                                  type="button"
                                  size="sm"
                                >
                                  Jane Cooper
                                </Button>
                              </div>
                              <div className="mt-2">
                                <Button
                                  style={styles.addBtn}
                                  color="white"
                                  title=""
                                  type="button"
                                  size="sm"
                                >
                                  Jane Cooper
                                </Button>
                              </div>{" "}
                              <div className="mt-2">
                                <Button
                                  style={styles.addBtn}
                                  color="white"
                                  title=""
                                  type="button"
                                  size="sm"
                                >
                                  Jane Cooper
                                </Button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td className="justify-content-center d-flex pt-7">
                          <div style={{ marginTop: 100 }}>
                            {requesting ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="lg"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <h6>No Record Found</h6>
                            )}
                          </div>
                        </td>
                        <td></td>
                      </tr>
                    )}

                    {/* for bottom border */}
                  </tbody>
                </Table>
              </div>
            </CardBody>
            <CardFooter className="text-lg-right text-center">
              <Button
                style={styles.btnStyle}
                color="white"
                title=""
                type="button"
                size="md"
                onClick={() => [setmodal(!modal), props.getEmployees()]}
              >
                Add Team{" "}
              </Button>
              <Modal isOpen={modal} toggle={toggle}>
                <div className="modal-header border-bottom-0">
                  <label style={{ fontSize: 24, fontWeight: "600" }}>
                    Add Teams
                  </label>
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    size="sm"
                    onClick={toggle}
                  >
                    <i
                      className="nc-icon nc-simple-remove"
                      style={{ color: " #438B44" }}
                    />
                  </button>
                </div>
                <div className="modal-body ">
                  <label>Team Name</label>
                  <Input
                    style={styles.inputTextStyle}
                    className="border-0 pl-0"
                    onChange={e => setTeamName(e.target.value)}
                  />
                  <div style={styles.inputLineStyle} />
                  {nameError && (
                    <p style={{ color: "red" }}>please enter valid Name</p>
                  )}
                  <label className="mt-4 mb-4 ">Team Members</label>
                  <div className="d-flex align-items-center">
                    {/* <img
                  style={styles.searchImg}
                  src={require("assets/icons/search_icon.png")}
                /> */}
                    <Input
                      placeholder="Search"
                      type="search"
                      name="search"
                      style={styles.searchStyle}
                      value={searchData}
                      onChange={e => [
                        setSearchData(e.target.value),
                        filterData()
                      ]}
                    />
                  </div>
                  {filterData().length ? (
                    filterData().map(item => (
                      <div style={styles.mainDiv}>
                        <div>
                          <img
                            width={44}
                            height={44}
                            style={{ borderRadius: 30 }}
                            alt="..."
                            className="img"
                            src={item.image}
                          />
                          <label
                            className="pl-3"
                            style={{
                              fontSize: 18,
                              fontWeight: "500"
                            }}
                          >
                            {item.data}
                          </label>
                        </div>
                        <div>
                          <input
                            style={styles.checkBoxStyle}
                            type="checkbox"
                            onChange={() => employeeData(item)}
                          />
                          <span
                            className={`checkbox ${
                              selectedMembers.includes(item.id)
                                ? "checkbox--active"
                                : ""
                            }`}
                            // This element is purely decorative so
                            // we hide it for screen readers
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mt-5" style={{ textAlign: "center" }}>
                      {" "}
                      {requesting ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "No Member found"
                      )}
                    </div>
                  )}
                </div>
                <div
                  style={{ justifyContent: "center" }}
                  className="modal-footer border-top-0 "
                >
                  <div>
                    <Button
                      style={{
                        background: "linear-gradient(#E6DE18, #438B44)",
                        borderRadius: 15
                      }}
                      color="white"
                      title=""
                      type="button"
                      size="lg"
                      disabled={!teamName}
                      onClick={createTeam}
                    >
                      {createRequesting ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Save Team"
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
  )
}
const styles = {
  cardStyle: {
    marginTop: 54,
    marginLeft: 54,
    marginRight: 54,
    opacity: 0.94
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
  },
  searchImg: {
    height: 20,
    width: 20,
    position: "absolute",
    marginLeft: 10
  },
  searchStyle: {
    height: 32,
    borderRadius: 20,
    backgroundColor: "#EBEBEB",
    color: "black",
    maxWidth: 436
  },
  mainDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    alignItems: "center"
  },
  checkBoxStyle: {
    width: 21,
    height: 21
  },
  imgStyle: {
    maxWidth: 25,
    height: 25
  },
  borderBottom: {
    borderBottom: "1px solid rgb(212, 212, 212)"
  },
  borderRight: {
    borderRight: "1px solid rgb(212, 212, 212)"
  },
  inputLineStyle: {
    backgroundColor: "#D9D9D9",
    height: 1
  }
}

const mapStateToProps = state => ({
  requesting: state.teams.requesting,
  employeeRequesting: state.teams.employeeRequesting,
  employeesData: state.teams.employeesData,
  deleteRequesting: state.teams.deleteRequesting,
  createRequesting: state.teams.createRequesting,
  teamData: state.teams.teamData,
  unAssignedEmployees:state.teams.unAssignedEmployees
})

const mapDispatchToProps = dispatch => ({
  getTeam: () => dispatch(getTeam()),
  getEmployees: () => dispatch(getEmployees()),
  createTeam: (data, setmodal) => dispatch(createTeam(data, setmodal)),
  deleteTeam: data => dispatch(deleteTeam(data)),
  renderHtmlText: (data) => dispatch(renderHtmlText(data)),
  getUnAssignedEmployees: () => dispatch(getUnAssignedEmployees())
})
export default connect(mapStateToProps, mapDispatchToProps)(Teams)
