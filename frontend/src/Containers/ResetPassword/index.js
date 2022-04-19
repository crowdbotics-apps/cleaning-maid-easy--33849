import React from "react"

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Col,
  Row,
  Spinner
} from "reactstrap"

import { connect } from "react-redux"
import { resetNewPassword } from "../ForgotPassword/redux/actions"
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"
import { Toaster } from "react-hot-toast"

const ResetPassword = props => {
  const { requesting } = props
  const stateSchema = {
    new_password1: {
      value: "",
      error: ""
    },
    new_password2: {
      value: "",
      error: ""
    }
  }

  const getUrls=window.location.href.split('set-new-password/')[1].split('/')

  console.log("window.location.href",getUrls[0]);

  const validationStateSchema = {
    new_password1: {
      required: true,
      validator: validator.password
    },
    new_password2: {
      required: true,
      validator: validator.password
    }
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  const resetPassword = () => {
    const data = {
      new_password1: state.new_password1.value,
      new_password2: state.new_password2.value,
      uid:getUrls[0],
      token:getUrls[1]
    }
    props.resetNewPassword(data)
  }

  return (
    <div className="login-page">
         <Toaster/>
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="5" md="6">
            <Form action="" className="form" method="">
              <div className="card-login">
                <div>
                  <div className="justify-content-center d-flex align-items-center">
                    <img
                      style={{ paddingBottom: 56 }}
                      alt="..."
                      src={require("assets/img/logo_img.png")}
                    />
                  </div>
                  <h2
                    className="header text-center font-weight-bold"
                    style={{ color: "#0C4DA2" }}
                  >
                    Reset Password
                  </h2>
                </div>
                <div>
                  <label style={{ fontSize: 12, textTransform: "uppercase" }}>
                    New password
                  </label>
                  <FormGroup>
                    <Input
                      placeholder=""
                      type="password"
                      onChange={e =>
                        handleOnChange("new_password1", e.target.value)
                      }
                    />
                      {state.new_password1.error && (
                      <label style={{ color: "red" }}>
                        {state.new_password1.error}
                      </label>
                    )}
                  </FormGroup>
                  <label style={{ fontSize: 12, textTransform: "uppercase" }}>
                    confirm new password
                  </label>
                  <FormGroup>
                    <Input
                      placeholder=""
                      type="password"
                      autoComplete="off"
                      onChange={e =>
                        handleOnChange("new_password2", e.target.value)
                      }
                    />
                      {state.new_password2.value && state.new_password1.value !== state.new_password2.value && (
                      <label style={{ color: "red" }}>
                        Password don't match
                      </label>
                    )}
                  </FormGroup>
                </div>
                {/* <card-footer> */}
                <div className="justify-content-center d-flex align-items-center">
                  <Button
                    // block
                    className="mb-3 mt-4"
                    style={{
                      background:
                        "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",
                      paddingLeft: 100,
                      fontSize: 18,
                      paddingRight: 100
                    }}
                    disabled={disable || state.new_password1.value !== state.new_password2.value}
                    onClick={() => resetPassword()}
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
                      "Reset"
                    )}
                  </Button>
                </div>
                {/* </card-footer> */}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require("assets/images/background_img.png")})`
        }}
      />
    </div>
  )
}
const mapStateToProps = state => ({
  requesting: state.forgotPassword.requesting
})

const mapDispatchToProps = dispatch => ({
  resetNewPassword: data => dispatch(resetNewPassword(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
