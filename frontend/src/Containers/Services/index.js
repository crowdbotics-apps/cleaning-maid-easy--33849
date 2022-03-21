import React, { useEffect } from "react"

import { connect } from "react-redux"

//utils
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

//Actions
import { getServices, addServices, addServicesFailure } from "./redux/actions"

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
  Spinner
} from "reactstrap"
import { reduceEachLeadingCommentRange } from "typescript"

const Services = props => {
  const { servicesData, requesting, servicesError } = props

  const [modal, setModal] = React.useState(false)

  const stateSchema = {
    serviceName: {
      value: "",
      error: ""
    },
    serviceDescription: {
      value: "",
      error: ""
    },
    servicePrice: {
      value: "",
      error: ""
    }
  }

  const validationStateSchema = {
    serviceName: {
      required: true
    },
    serviceDescription: {
      required: true
    },
    servicePrice: {
      required: true
    }
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  // Toggle for Modal
  const toggle = () => {
    const apidata = {
      name: state.serviceName.value,
      description: state.serviceDescription.value,
      price: state.servicePrice.value
    }
    props.addServices(apidata, setModal)
  }

  const closeModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    props.getServices()
  }, [])

  return (
    <div
      className="content "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${require("assets/images/bg_content.png")})`,
        flex: 1
      }}
    >
      <Modal isOpen={modal} closeModal={closeModal}>
        <div style={{ height: 600 }}>
          <div className="modal-header border-bottom-0">
            <button
              aria-hidden={true}
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={closeModal}
            >
              <i
                style={{
                  color:
                    "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF"
                }}
                className="nc-icon nc-simple-remove"
              />
            </button>
            <div>
              <label className="mt-5" style={styles.titleTextStyle}>
                Add Service
              </label>
            </div>
          </div>
          <div className="modal-body ">
            <label style={styles.labelTextStyle}>Service Name</label>
            <Input
              style={styles.inputTextStyle}
              className="border-0 pl-0"
              onChange={e => handleOnChange("serviceName", e.target.value)}
            />
            <div style={styles.inputLineStyle} />
            {servicesError.name && (
              <label style={{ color: "red" }}>{servicesError.name}</label>
            )}
            <div className="mt-4">
              <label style={styles.labelTextStyle}>Service Description</label>
              <Input
                style={styles.inputTextStyle}
                className="border-0 pl-0"
                onChange={e =>
                  handleOnChange("serviceDescription", e.target.value)
                }
              />
              <div style={styles.inputLineStyle} />
            </div>
            {servicesError.description && (
              <label style={{ color: "red" }}>
                {servicesError.description}
              </label>
            )}

            <div className="mt-4">
              <label style={styles.labelTextStyle}>Service Price</label>
              <Input
                style={styles.inputTextStyle}
                className="border-0 pl-0"
                onChange={e => handleOnChange("servicePrice", e.target.value)}
              />
              <div style={styles.inputLineStyle} />
            </div>
            {servicesError.price && (
              <label style={{ color: "red" }}>{servicesError.price}</label>
            )}
          </div>
        </div>
        <div className="modal-footer border-top-0  justify-content-center">
          <Button
            className="mb-3"
            style={styles.btnTextStyle}
            onClick={toggle}
            disabled={disable}
          >
            {requesting ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Save Service"
            )}
          </Button>
        </div>
      </Modal>
      <Row>
        <Col md="12">
          <Card
            style={{
              marginTop: 54,
              marginLeft: 54,
              marginRight: 54,
              opacity: 0.94
            }}
          >
            <CardBody>
              <Table responsive>
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
                  {servicesData ? (
                    servicesData.map((item, i) => (
                      <tr>
                        <td style={styles.tdataText1}>{i + 1}.</td>
                        <td style={styles.tdataText2}>{item.name}</td>
                        <td style={styles.tdataText}>{item.description}</td>
                        <td style={styles.tdataText}>{item.price}</td>
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
                    ))
                  ) : (
                    <tr>
                      <td></td>
                      <td></td>
                      <td className="justify-content-center d-flex pt-7">
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
                      </td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="d-flex justify-content-end">
                <Button
                  className="mb-3 "
                  style={styles.addBtnText}
                  onClick={() => [
                    setModal(!modal),
                    props.addServicesFailure(false)
                  ]}
                >
                  Add Service
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  requesting: state.services.requesting,
  servicesData: state.services.servicesData,
  servicesError: state.services.servicesError
})

const mapDispatchToProps = dispatch => ({
  getServices: () => dispatch(getServices()),
  addServices: (data, setModal) => dispatch(addServices(data, setModal)),
  addServicesFailure: data => dispatch(addServicesFailure(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Services)

const styles = {
  inputLineStyle: {
    backgroundColor: "#D9D9D9",
    height: 1
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: "600",
    display: "grid"
  },
  labelTextStyle: {
    fontSize: 14,
    opacity: 0.5,
    fontWeight: "500",
    color: "#000000"
  },
  inputTextStyle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#000000"
  },
  btnTextStyle: {
    background:
      "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF",
    fontWeight: "bold",
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
    fontWeight: "500"
  },
  tdataText2: {
    fontSize: 14,
    fontWeight: "600"
  },
  tdataText: {
    fontSize: 12,
    fontWeight: "500"
  },
  addBtnText: {
    background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
    fontWeight: "bold",
    fontSize: 17
  }
}
