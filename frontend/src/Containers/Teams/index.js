import React, { useState } from "react";

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
} from "reactstrap";
import CardFooter from "reactstrap/lib/CardFooter";
function Teams() {
  const [modal, setmodal] = useState(false);
  const toggle = () => {
    setmodal(!modal);
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className="content"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${require("assets/images/bg_content.png")})`,
        flex: 1,
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
                    <tr>
                      <td className="text-center " style={styles.textFont}>
                        1
                      </td>
                      <td className="" style={styles.textFont}>
                        Basic Cleaning Team
                      </td>
                      <td style={{ width: "52%",borderLeft:"" }}>
                        <Button
                          style={styles.addBtn}
                          color="white"
                          title=""
                          type="button"
                          size="sm"
                        >
                          Jane Cooper
                        </Button>
                        <Button
                          style={styles.addBtn}
                          color="white"
                          title=""
                          type="button"
                          size="sm"
                        >
                          Jane Cooper
                        </Button>
                        <Button
                          style={styles.addBtn}
                          color="white"
                          title=""
                          type="button"
                          size="sm"
                        >
                          Jane Cooper
                        </Button>
                        <Button
                          style={styles.addBtn}
                          color="white"
                          title=""
                          type="button"
                          size="sm"

                        >
                          Jane Cooper
                        </Button>
                      </td>
                      <td
                        style={styles.borderBottom}
                        className="text-center "
                      >
                         <img className="mr-3"
                         style={styles.imgStyle}
                          alt="..."
                          src={require("assets/icons/pencil_btn.png")}
                        />
                        <img
                          style={styles.imgStyle}
                          // style={{marginLeft:50}}
                          alt="..."
                          src={require("assets/icons/delete_btn.png")}
                        />
                      </td>

                      <td rowSpan="7" style={{borderLeft:"1px solid rgb(212, 212, 212)"}}>
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
                    </tr>

                         {/* for bottom border */}
                    <tr>
                      <td className="text-center" style={styles.textFont}>
                        1
                      </td>

                      <td style={styles.textFont}>
                        Basic Cleaning Team
                      </td>

                      <td
                        style={styles.borderBottom}>
                        <Button
                          style={styles.addBtn}
                          color="white"
                          title=""
                          type="button"
                          size="sm"
                        >
                          Jane Cooper
                        </Button>
                        <Button
                          style={styles.addBtn}
                          color="white"
                          title=""
                          type="button"
                          size="sm"
                        >
                          Jane Cooper
                        </Button>
                      </td>

                      <td
                        style={styles.borderBottom}
                        className="text-center "
                      >
                         <img className="mr-3"
                         style={styles.imgStyle}
                          alt="..."
                          src={require("assets/icons/pencil_btn.png")}
                        />
                        <img
                          style={styles.imgStyle}
                          // style={{marginLeft:50}}
                          alt="..."
                          src={require("assets/icons/delete_btn.png")}
                        />
                      </td>

                    </tr>
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
                onClick={() => {
                  setmodal(!modal);
                }}
              >
                Add Team{" "}
              </Button>
              <Modal isOpen={modal} toggle={toggle}>
                <div className="modal-header border-bottom-0">
                  <label style={{ fontSize: 24, fontWeight: "600" }}>
                    Save Teams
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
                  <label>First Name</label>
                  <Input style={styles.inputTextStyle} className="border-0 pl-0" />
              <div style={styles.inputLineStyle} />
                  <label className="mt-4 mb-4 ">Last Name</label>
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
                      onChange={(e) => console.log(e)}
                    />
                  </div>

                  <div style={styles.mainDiv}>
                    <div>
                      <img
                        width={44}
                        height={44}
                        style={{ borderRadius: 30 }}
                        alt="..."
                        className="img"
                        src={require("assets/img/mike.jpg")}
                      />
                      <label className="pl-3" style={{
                        fontSize: 18, fontWeight: "500" }}>
                    Save Teams
                  </label>
                    </div>
                    <div>
                      <input
                        style={styles.checkBoxStyle}
                        type="checkbox"
                        onChange={() => {
                          setIsChecked(!isChecked);
                        }}
                      />
                      <span
                        className={`checkbox ${
                          isChecked ? "checkbox--active" : ""
                        }`}
                        // This element is purely decorative so
                        // we hide it for screen readers
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ justifyContent: "center" }}
                  className="modal-footer border-top-0 "
                >
                  <div>
                    <Button
                      style={{
                        background: "linear-gradient(#E6DE18, #438B44)",
                        borderRadius: 15,
                      }}
                      color="white"
                      title=""
                      type="button"
                      size="lg"
                    >
                      Save Team{" "}
                    </Button>
                  </div>
                </div>
              </Modal>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
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
    paddingBottom: 35,
  },
  textFont: {
    fontSize: 14,

    fontWeight: "600",
    borderBottom: "1px solid rgb(212, 212, 212)",

  },
  addBtn: {
    background: "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(131.42deg, #00B9F1 13.37%, #034EA2 104.38%), #C4C4C4",
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  btnStyle: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%), linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), #FFFFFF",
    borderRadius: 10,
    fontSize:14,
    fontWeight:'bold',
  },
  searchImg: {
    height: 20,
    width: 20,
    position: "absolute",
    marginLeft: 10,
  },
  searchStyle: {
    height: 32,
    borderRadius: 20,
    backgroundColor: "#EBEBEB",
    color: "black",
    maxWidth: 436,
  },
  mainDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    alignItems:'center'
  },
  checkBoxStyle: {
    width: 21,
    height: 21,
  },
  imgStyle:{
     maxWidth: 25 ,
                          height:25
  },
  borderBottom:{
     borderBottom: "1px solid rgb(212, 212, 212)" 

    },
  borderRight:{ 
    borderRight: "1px solid rgb(212, 212, 212)" },
    inputLineStyle: {
      backgroundColor: '#D9D9D9',
      height: 1
    },
};
export default Teams;
