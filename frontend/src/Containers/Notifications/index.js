import React, { useState,useEffect} from "react"

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
import { connect } from "react-redux"
import {renderHtmlText} from '../Services/redux/actions'

function Notifiaction(props) {
    useEffect(()=>{
        props.renderHtmlText('Notifiaction')
    },[])
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
              <Row className="mt-3 ">
                <Col lg="1"></Col>
                <Col lg="1" className="text-center text-lg-right">
                  <div>
                    <img
                      style={styles.imgStyle}
                      alt="..."
                      className="img"
                      src={require("assets/img/emilyz.jpg")}
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
                      urna odio gravida nunc, ultrices. Sed vulputate tincidunt
                      interdum feugiat nunc tellus varius.
                    </p>
                  </div>
                  <div className="d-flex">
                    <FormGroup>
                      <Input
                        className="textarea"
                        type="textarea"
                        cols="100"
                        rows="4"
                        placeholder="Leave a note here..."
                        style={styles.textAeraStyle}
                        //   defaultValue="Oh so, your weak rhyme You doubt I'll bother,
                        // reading into it"
                      />
                    </FormGroup>
                  </div>
                  <div className="text-right">
                    <Label style={styles.lableFont}>Send</Label>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3 ">
                <Col lg="1"></Col>
                <Col lg="1" className="text-center text-lg-right">
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
                      urna odio gravida nunc, ultrices. Sed vulputate tincidunt
                      interdum feugiat nunc tellus varius.
                    </p>
                  </div>

                  <div className="text-right">
                    <Label style={styles.lableFont}>Mark as read</Label>
                  </div>
                </Col>
              </Row>
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

const mapDispatchToProps = dispatch => ({
  renderHtmlText: data => dispatch(renderHtmlText(data))
})
export default connect(null, mapDispatchToProps)(Notifiaction)
