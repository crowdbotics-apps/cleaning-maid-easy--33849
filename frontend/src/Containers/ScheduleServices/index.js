import React, { useState } from "react"
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
  Input
} from "reactstrap"
import Select from "react-select"
function ScheduleService() {
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
                  <div style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                    <i class="nc-icon nc-headphones pr-2"></i>
                    <label style={styles.inputStyle}>09 September 2021</label>
                  </div>
                  <div
                    className="mt-4"
                    style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}
                  >
                    <i class="nc-icon nc-headphones pr-2"></i>
                    <label style={styles.inputStyle}>09:00AM - 11:30AM</label>
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
                    <Input
                      style={styles.inputStyle}
                      className="border-top-0 border-right-0 border-left-0 p-0"
                    />
                  </div>

                  <Row
                    className="mt-4 "
                    style={{ justifyContent: "space-between" }}
                  >
                    <Col lg="6" md="6" sm="3">
                      <label style={styles.labelFont}>Services</label>
                      <Select
                        className="react-select primary mb-4"
                        classNamePrefix="react-select"
                        name="singleSelect"
                        // value={this.state.singleSelect}
                        // onChange={(value) =>
                        //   this.setState({ singleSelect: value })
                        // }
                        options={[
                          {
                            value: "",
                            label: "Single Option",
                            isDisabled: true
                          },
                          { value: "2", label: "4 weeks/ monthly" },
                          { value: "3", label: "Is great" }
                        ]}
                        placeholder="Single Select"
                      />
                    </Col>
                    <Col lg="6" md="6" sm="3">
                      <label style={styles.labelFont}>Frequency</label>
                      <Select
                        className="react-select primary "
                        classNamePrefix="react-select"
                        name="singleSelect"
                        // value={this.state.singleSelect}
                        // onChange={(value) =>
                        //   this.setState({ singleSelect: value })
                        // }
                        options={[
                          {
                            value: "",
                            label: "Single Option",
                            isDisabled: true
                          },
                          { value: "2", label: "Basic Cleaning" },
                          { value: "3", label: "Is great" }
                        ]}
                        placeholder="Single Select"
                      />
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <label style={styles.labelFont}>Price</label>
                    <Input
                      style={styles.inputStyle}
                      className="border-top-0 border-right-0 border-left-0 p-0 mb-4"
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
                        rows="3"
                        style={styles.textArea}
                        defaultValue="Oh so, your weak rhyme You doubt I'll bother,
                        reading into it"
                      />
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
                size="lg"
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
export default ScheduleService
