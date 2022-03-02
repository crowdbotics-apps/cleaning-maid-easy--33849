import React from "react";

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
  UncontrolledTooltip,
} from "reactstrap";
import Switch from "react-bootstrap-switch";

const Services = () => {

  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div className="content "
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(${require("assets/images/bg_content.png")})`,
        flex: 1
      }}
    >
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <div style={{ height: 600 }}>
          <div className="modal-header border-bottom-0">
            <button
              aria-hidden={true}
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={toggle}
            >
              <i style={{ color: 'linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF' }} className="nc-icon nc-simple-remove" />
            </button>
            <div>
              <label className="mt-5" style={styles.titleTextStyle} >Add Service</label>
            </div>
          </div>
          <div className="modal-body ">

            <label style={styles.labelTextStyle}>Service Name</label>
            <Input style={styles.inputTextStyle} className="border-0 pl-0" />
            <div style={styles.inputLineStyle} />
            <div className="mt-4">
              <label style={styles.labelTextStyle}>Service Description</label>
              <Input style={styles.inputTextStyle} className="border-0 pl-0" />
              <div style={styles.inputLineStyle} />
            </div>

            <div className="mt-4">
              <label style={styles.labelTextStyle}>Service Price</label>
              <Input style={styles.inputTextStyle} className="border-0 pl-0" />
              <div style={styles.inputLineStyle} />
            </div>
          </div>
        </div>
        <div className="modal-footer border-top-0  justify-content-center">
          <Button
            className="mb-3"
            style={styles.btnTextStyle}
            onClick={toggle}
          >
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
                <Input placeholder="Search" type="search" name="search" style={styles.searchStyle}
                  onChange={(e) => console.log(e)}
                />

                <img
                  className="ml-3"
                  style={styles.filterImg}
                  src={require("assets/icons/filter_btn.png")}
                />
                <h7 className="pl-2">Filter</h7>
                <Button
                  style={styles.addBtnText}
                  onClick={toggle}
                >
                  Add Customer
                </Button>
              </div>
              <Table responsive='xl' bordered >
                <thead style={{ opacity: 0.5 }}>
                  <tr>
                    <th style={styles.theadText}>Client Information</th>
                    <th style={styles.theadText}>Service History</th>
                    <th style={styles.theadText}>Preferred Services</th>
                    <th style={styles.theadText}>Other</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="align-top">
                      <div className="d-flex" style={{ paddingLeft: 13, paddingRight: 11 }}>
                        <h5 style={{ paddingRight: 10 }}>1.</h5>
                        <div style={{ width: '100%', paddingTop: 5 }}>
                          <label style={styles.clientStyle}>Full Name</label>
                          <br></br>
                          <label style={styles.clientDataTextStyle}>Jenny Wilson</label>
                          <br></br>
                          <label style={styles.clientStyle}>Email</label>
                          <br></br>
                          <label style={styles.clientDataTextStyle}>jennuwilson@email.com</label>
                          <br></br>
                          <label style={styles.clientStyle}>Company Name</label>
                          <br></br>
                          <label style={styles.clientDataTextStyle}>/</label>
                          <br></br>
                          <div className='text-right'>
                            <img
                              src={require("assets/icons/dot_icon.png")}
                            />
                          </div>

                        </div>
                      </div>
                    </td>
                    <td className="align-top" style={{maxHeight:390}}>
                      <div style={{ paddingLeft: 18, paddingRight: 20, overflowY:'scroll', maxHeight:395 }}>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>09/09/2021 - Basic Cleaning ($40)</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                       
                        
                      </div>
                    </td>
                    <td className="align-top">
                      <div style={{ paddingLeft: 18, paddingRight: 20 }}>
                        <div className="d-flex justify-content-between">
                          <h7>-Basic Cleaning</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>-Windows Inside</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h7>-Windows Outside</h7>
                          <i className="fa fa-circle" style={{ color: '#A8CEFF', fontSize: 'large' }} />
                        </div>
                      </div>
                    </td>
                    <td className="align-top">
                      <div className="pl-3 pr-3">
                        <div className=" d-flex justify-content-between">
                        <h7>Notifications</h7>
                        <Switch
                          offColor="success"
                          offText=""
                          onColor="primary"
                          onText=""
                        />{" "}
                        </div>
                      <div>
                        <label>
                        Notes
                        </label>
                        <p>
                        Nulla euismod non eget id mi feugiat imperdiet. Porta vitae eleifend turpis a, cras bibendum nibh viverra amet. Nibh quisque eleifend consequat dolor eget id dolor.
                        </p>
                      </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );

}

export default Services;

const styles = {
  inputLineStyle: {
    backgroundColor: '#D9D9D9',
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
    display: 'grid'
  },
  labelTextStyle: {
    fontSize: 14,
    opacity: 0.5,
    fontWeight: '500',
    color: '#000000',
  },
  inputTextStyle: {
    fontWeight: '500',
    fontSize: 18,
    color: '#000000'
  },
  btnTextStyle: {
    background: "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF",
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 50,
    paddingRight: 50
  },
  theadText: {
    paddingLeft:20,
    borderLeft: "1px solid rgb(212, 212, 212)",
    width:295
  },
  searchStyle: {
    height: 32,
    borderRadius: 20,
    backgroundColor: '#EBEBEB',
    color: 'black',
    maxWidth: 590,
    paddingLeft: 39,
  },
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 'auto'
  },
  searchImg: {
    height: 20,
    width: 20,
    position: 'absolute',
    marginLeft: 10
  },

  filterImg: {
    height: 26,
    width: 26
  },
  clientStyle: {
    fontWeight: '500',
    fontSize: 12,
    color: '#000000',
    opacity: 0.4
  },
  clientDataTextStyle: {
    fontWeight: '500',
    fontSize: 12,
    color: '#000000'
  },

}