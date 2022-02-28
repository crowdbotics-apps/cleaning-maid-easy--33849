/*!

=========================================================
* Paper Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  ModalHeader,
  ModalBody,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

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
        <div style={{height:600}}>
        <div className="modal-header border-bottom-0">
          <button
            aria-hidden={true}
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggle}
          >
             <i style={{color:'linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF'}} className="nc-icon nc-simple-remove" />
          </button>
          <div>
          <label className="mt-5" style={{ fontSize: 24, fontWeight: "600" ,display: 'grid'}} >Add Service</label>
          </div>
        </div>
        <div className="modal-body ">

        <label style={{ fontSize: 14, fontWeight: '500' }}>Service Name</label>
          <Input className="border-top-0 border-right-0 border-left-0 pl-0" />

          <div className="mt-4">
          <label style={{ fontSize: 14, fontWeight: '500' }}>Service Description</label>
          <Input className="border-top-0 border-right-0 border-left-0 pl-0" />
          </div>

          <div className="mt-4">
          <label style={{ fontSize: 14, fontWeight: '500' }}>Service Price</label>
          <Input className="border-top-0 border-right-0 border-left-0 pl-0" ></Input>
          </div>
        </div>
        </div>
        <div className="modal-footer border-top-0  justify-content-center">
           <Button 
            className="mb-3"
            style={{ background: "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF", fontWeight: 'bold', fontSize: 14, paddingLeft: 50, paddingRight: 50 }}
            onClick={toggle}
          >
            Save Service
          </Button>
        </div>
      </Modal>
      <Row>
        <Col md="12">
          <Card style={{ marginTop: 54, marginLeft: 54, marginRight: 54, opacity: 0.94 }}>
            <CardBody>

              <Table responsive >
                <thead style={{ opacity: 0.5 }}>
                  <tr>
                    <th style={{paddingTo:20, paddingBottom:30}}></th>
                    <th style={{paddingTo:20, paddingBottom:30}}>Service Name</th>
                    <th style={{paddingTo:20, paddingBottom:30}}>Service Description</th>
                    <th style={{paddingTo:20, paddingBottom:30}}>Service Price</th>
                    <th style={{paddingTo:20, paddingBottom:30}}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontSize: 14, fontWeight: '500' }}>1.</td>
                    <td style={{ fontSize: 14, fontWeight: '600' }}>Basic Cleaning</td>
                    <td style={{ fontSize: 12, fontWeight: '500' }}>Top to bottom dusting/cleaning of surfaces and all floors throughout the home</td>
                    <td style={{ fontSize: 12, fontWeight: '500' }}>$220.00</td>
                    <td className="text-right">
                      <Button
                        className="btn-icon btn-neutral"
                        size="sm"
                        type="button"
                      >
                        <img
                          alt="..."
                          src={require("assets/images/delete_btn.png")}
                        />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: 14, fontWeight: '500' }}>6.</td>
                    <td style={{ fontSize: 14, fontWeight: '600' }}>Basic Cleaning</td>
                    <td style={{ fontSize: 12, fontWeight: '500' }}>Top to bottom dusting/cleaning of surfaces and all floors throughout the home</td>
                    <td style={{ fontSize: 12, fontWeight: '500' }}>$220.00</td>
                    <td className="text-right">
                      <Button
                        className="btn-icon btn-neutral"
                        size="sm"
                        type="button"
                      >
                        <img
                          alt="..."
                          src={require("assets/images/delete_btn.png")}
                        />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="d-flex justify-content-end">
                <Button
                  className="mb-3 "
                  style={{ background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)", fontWeight: 'bold', fontSize: 17, }}
                  onClick={toggle}
                >
                  Add Service
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );

}

export default Services;
