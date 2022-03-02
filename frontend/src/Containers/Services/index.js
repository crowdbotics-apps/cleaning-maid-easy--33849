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
          <Card style={{ marginTop: 54, marginLeft: 54, marginRight: 54, opacity: 0.94 }}>
            <CardBody>

              <Table responsive >
                <thead style={{ opacity: 0.5 }}>
                  <tr>
                    <th style={styles.theadText}></th>
                    <th style={styles.theadText}>Service Name</th>
                    <th style={styles.theadText}>Service Description</th>
                    <th style={styles.theadText}>Service Price</th>
                    <th style={styles.theadText}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tdataText1}>1.</td>
                    <td style={styles.tdataText2}>Basic Cleaning</td>
                    <td style={styles.tdataText}>Top to bottom dusting/cleaning of surfaces and all floors throughout the home</td>
                    <td style={styles.tdataText}>$220.00</td>
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
                    <td style={styles.tdataText1}>6.</td>
                    <td style={styles.tdataText2}>Basic Cleaning</td>
                    <td style={styles.tdataText}>Top to bottom dusting/cleaning of surfaces and all floors throughout the home</td>
                    <td style={styles.tdataText}>$220.00</td>
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
                  style={styles.addBtnText}
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

const styles = {
  inputLineStyle: {
    backgroundColor: '#D9D9D9',
    height: 1
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
    color: '#000000'
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
    paddingTo: 20,
    paddingBottom: 30
  },
  tdataText1: {
    fontSize: 14,
    fontWeight: '500'
  },
  tdataText2: {
    fontSize: 14,
    fontWeight: '600'
  },
  tdataText: {
    fontSize: 12,
    fontWeight: '500'
  },
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    fontWeight: 'bold',
    fontSize: 17
  }
}