import React from "react"

import {
  Button,
  Input,
  Spinner,
} from "reactstrap"
//utils
import useForm from "../../utils/useForm"

import { connect } from "react-redux"

import { addServices} from "../../Containers/Services/redux/actions"


function AddServices(props) {
  const { closeModal, styles ,servicesError,requesting} = props

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
        props.addServices(apidata,closeModal)
      }

  return (
    <>
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
    </>
  )
}

const mapStateToProps = state => ({
    requesting: state.services.requesting,
    servicesData: state.services.servicesData,
    servicesError: state.services.servicesError,
  })
  
  const mapDispatchToProps = dispatch => ({
    addServices: (data, setModal) => dispatch(addServices(data, setModal)),
  })
  export default connect(mapStateToProps, mapDispatchToProps)(AddServices)
