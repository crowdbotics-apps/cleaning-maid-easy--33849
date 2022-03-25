import Footer from "components/Footer/Footer";
import React, { useState,useEffect } from "react";

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
} from "reactstrap";

import { connect } from "react-redux";
import {renderHtmlText} from '../Services/redux/actions'
function Employees(props) {
  const [selectedClient, setSelectedClient] = useState("none");

  const [modal, setmodal] = useState(false);
  const toggle = () => {
    setmodal(!modal);
  };
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
  }

  // function ComponentDidMount() {
  //   ('[data-toggle="tooltip"]').tooltip();
  // }

  useEffect(()=>{
    props.renderHtmlText('Employees')
  },[])
  return (
    <>
      <div className="content "
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
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
                      <th>Team</th>
                      <th>Team</th>
                    </tr>
                  </thead>
                  <tbody style={{

                    overflowX: 'auto',
                    overflowY: 'hidden'
                    // overflow-y: auto;    
                    // overflow-x: hidden
                  }}
                  >
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={styles.trheight}>
                      <td style={styles.tdFont}>
                        1
                      </td>
                      <td style={styles.tdFont}>Jane Cooper</td>
                      <td>2464 Royal Ln. Mesa, New Jersey 45463</td>
                      <td>
                        <div
                          style={{
                            display: "block",
                          }}
                        >
                          <p id="TooltipExample" className="mb-0">
                            Company Name
                          </p>
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="TooltipExample"
                            trigger="click"

                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
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
                                  yes
                                </Label>
                              </div>
                              <div>
                                <Label check>
                                  <Input type="checkbox" />
                                  no
                                </Label>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>(205) 555-0100</td>
                      <td>Wall Team</td>
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
                                maxWidth: 15,
                              }}
                              alt="..."
                              src={require("assets/icons/down_btn.png")}
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Outside Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Oven Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Basic Cleaning Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Windows Team
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Baseboard Team
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="pr-2">
                            <img
                              alt="..."
                              src={require("assets/icons/pencil_btn.png")}
                            />
                          </div>
                          <div>
                            <img
                              alt="..."
                              src={require("assets/icons/delete_btn.png")}

                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                  </tbody>
                </Table>
              </CardBody>

              <CardFooter style={styles.stylefootter}>
                <Button
                  style={styles.btnColor}
                  color="white"
                  title=""
                  type="button"
                  onClick={() => {
                    setmodal(!modal);
                  }}
                >
                  Add Employee{" "}
                </Button>

                <Modal isOpen={modal} toggle={toggle}>
                  <div className="modal-header border-bottom-0">
                    <label style={{ fontSize: 24, fontWeight: "600" }}>
                      Add Employee
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
                    <label>First Name</label>
                    <Input className="border-top-0 border-right-0 border-left-0" />
                    <label className="mt-3">Last Name</label>
                    <Input className="border-top-0 border-right-0 border-left-0 pl-0" />
                    <label className="mt-3">Company Name</label>

                    <Input className="border-top-0 border-right-0 border-left-0 pl-0" />
                    <div style={styles.companyshow}>
                      Display Company Name:
                      <Label>
                        <Input type="checkbox" class="custom-control-input" />
                        yes
                      </Label>
                      <Label check>
                        <Input type="checkbox" />
                        no
                      </Label>
                    </div>

                    <label className="mt-3">Phone Number</label>
                    <Input className="border-top-0 border-right-0 border-left-0 pl-0"></Input>
                    <label className="mt-3">Address</label>
                    <Input className="border-top-0 border-right-0 border-left-0 pl-0"></Input>

                    <label className="mt-3">Team</label>
                    <div style={styles.mainstyle}>
                      <select
                        style={styles.selectStyle}
                        value={selectedClient}
                        onChange={handleSelectChange}
                      >
                        {" "}

                        <option value="none" selected disabled hidden></option>
                        <Row>
                          <option value="Windows Inside Team">Windows Inside Team</option>

                          <option value="Inside Oven Team">Inside Oven Team</option>
                        </Row>
                        <option value="Inside Fridge Team">Inside Fridge Team</option>
                        <option value="Basic Cleaning Team">Basic Cleaning Team</option>
                        <option value="Windows Outside Team">Windows Outside Team</option>
                        <option value="Baseboard Team">Baseboard Team</option>
                        <option value="Wall Team">Wall Team</option>

                      </select>
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
                      >
                        Add Employee{" "}
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
  );
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
    paddingLeft: 27,
    // justifyContent:'flex-end'

  },
  trHeading: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.5,
    height: 70,
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
    justifyContent: "center",
  },
  stylefootter: {
    alignSelf: "end ",
    marginBottom: 33
  },
  modalImg: {
    alignSelf: "end",
    maxWidth: 25,
    backgroundColor: "transparent",
  },
  btnColor: {
    background: "linear-gradient(#00B9F1, #034EA2)",
    borderRadius: 15,
    fontSize: 17,
    fontWeight: '600'
  },
  tooggleStyle: {
    backgroundColor: "transparent",
    padding: 0
  },
  companyshow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 21,
  },
  mainstyle: {
    borderBottom: "1px solid #DDDDDD",
    display: " flex",

    flexDirection: "rowReverse",
    alignItems: "flexEnd",
  },
  selectStyle: {
    outline: 'none',
    width: 400,
    border: 0,
    backgroundColor: "transparent",
  },
};

const mapDispatchToProps = dispatch => ({
  renderHtmlText: data => dispatch(renderHtmlText(data))
})
export default connect(null, mapDispatchToProps)(Employees)