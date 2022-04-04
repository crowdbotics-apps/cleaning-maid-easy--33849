import React, { useState, useEffect } from "react"

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap"
import Select from "react-select"
import { displayPartsToString } from "typescript"
import "bootstrap/dist/css/bootstrap.min.css"
import moment from "moment"
import { connect } from "react-redux"
import { renderHtmlText } from "../Services/redux/actions"
import {
  getNotificaions,
  replyNotificaions,
  readNotificaions
} from "../Notifications/redux/actions"

function Notification(props) {
  useEffect(() => {
    props.renderHtmlText("Notification")
    props.getNotificaions()
  }, [])

  const [inputShow, setInputShow] = useState(false)
  const renderData = [
    {
      id: 1,
      from_user: null,
      to_user: {
        id: 4,
        name: "Omar Delice",
        profile_picture:
          "https://media.istockphoto.com/photos/smiling-teenage-boy-with-school-bag-in-front-of-school-picture-id1175573811?s=612x612"
      },
      notes: [],
      content: "Notifications details here",
      is_read: true,
      created_at: "2022-04-01T15:00:02.278065Z",
      updated_at: "2022-04-01T15:09:20.106627Z"
    },
    {
      id: 2,
      from_user: null,
      to_user: {
        id: 4,
        name: "Omar Delice",
        profile_picture:
          "https://media.istockphoto.com/photos/smiling-teenage-boy-with-school-bag-in-front-of-school-picture-id1175573811?s=612x612"
      },
      notes: [],
      content: "Notifications details here",
      is_read: false,
      created_at: "2022-04-01T15:00:02.278065Z",
      updated_at: "2022-04-01T15:09:20.106627Z"
    }
  ]

  const getData = item => {
    setInputShow(item.id)
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
              {renderData.map(item => (
                <>
                  <Row className="mt-3 ">
                    <Col lg="1"></Col>
                    <Col lg="1"></Col>
                    <div
                      className="text-center text-lg-right"
                      style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}
                    >
                      <div>
                        <img
                          style={styles.imgStyle}
                          alt="..."
                          className="img"
                          src={{
                            uri: item
                              ? item.profile_picture
                              : require("assets/img/emilyz.jpg")
                          }}
                        />
                      </div>
                    </div>
                    <Col
                      lg="8"
                      className="text-center text-lg-left"
                      style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}
                    >
                      <div>
                        <Label style={styles.profileName}>
                          {item.to_user.name}
                        </Label>
                        <div>
                          <Label>
                            {moment(item.created_at).format("MMMM dd, YYYY")}
                          </Label>
                        </div>
                        <p>{item.content}</p>
                      </div>
                      {inputShow === item.id && (
                        <>
                          <div className="d-flex">
                            <FormGroup>
                              <Input
                                className="textarea"
                                type="textarea"
                                cols="100"
                                rows="4"
                                placeholder="Leave a note here..."
                                style={styles.textAeraStyle}
                              />
                            </FormGroup>
                          </div>
                          <div className="text-right">
                            <button
                              // onClick={() => getData(item)}
                              style={{
                                border: 0,
                                backgroundColor: "white",
                                outline: "none"
                              }}
                            >
                              <span style={styles.lableFont}>Send</span>
                            </button>
                            <button
                              onClick={() => setInputShow(false)}
                              style={{
                                border: 0,
                                backgroundColor: "white",
                                outline: "none"
                              }}
                            >
                              <span style={styles.lableFont}>Cancel</span>
                            </button>
                          </div>
                        </>
                      )}

                      {item.is_read ? (
                        ""
                      ) : (
                        <div className="text-right">
                          {inputShow === item.id ? null : (
                            <>
                              <button
                                style={{
                                  border: 0,
                                  backgroundColor: "white",
                                  outline: "none",
                                  paddingRight: 17
                                }}
                              >
                                <span style={styles.lableFont}>
                                  Mark as read
                                </span>
                              </button>
                              <button
                                onClick={() => getData(item)}
                                style={{
                                  border: 0,
                                  backgroundColor: "white",
                                  outline: "none"
                                }}
                              >
                                <span style={styles.lableFont}>Reply</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                  {/* <Row className="mt-3 ">
                    <Col lg="1"></Col>
                    <Col lg="1" className="text-center text-lg-right"  style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                      <div>
                        <img
                          style={styles.imgStyle}
                          alt="..."
                          className="img"
                          src={require("assets/img/mike.jpg")}
                        />
                      </div>
                    </Col>
                    <Col
                      lg="8"
                      className="text-center text-lg-left"
                      style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}
                    >
                      <div>
                        <Label style={styles.profileName}>Amet placerat</Label>
                        <div>
                          <Label>August 19, 2022</Label>
                        </div>
                        <p>
                          Mauris aliquam ut egestas vestibulum. Varius dignissim
                          urna odio gravida nunc, ultrices. Sed vulputate
                          tincidunt interdum feugiat nunc tellus varius.
                        </p>
                      </div>

                      <div className="text-right">
                        <Label style={styles.lableFont}>Mark as read</Label>
                      </div>
                    </Col>
                  </Row> */}
                </>
              ))}
            </CardBody>
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
  lableFont: {
    fontSize: 14,
    fontWeight: "600",
    color: "#438B44"
  },
  textAeraStyle: {
    opacity: "60%",
    webkitBoxShadow: "1px 3px 1px #9E9E9E",
    mozBoxShadow: "1px 3px 1px #9E9E9E",
    boxShadow: "1px 3px 1px #9E9E9E"
  },
  profileName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000000"
  },
  imgStyle: {
    borderRadius: 50,
    maxWidth: 70,
    height: 70
  }
}

const mapStateToProps = state => ({
  // notificaions: state.notificaions.notificaions
})

const mapDispatchToProps = dispatch => ({
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  getNotificaions: () => dispatch(getNotificaions()),
  replyNotificaions: data => dispatch(replyNotificaions(data)),
  readNotificaions: id => dispatch(readNotificaions(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Notification)
