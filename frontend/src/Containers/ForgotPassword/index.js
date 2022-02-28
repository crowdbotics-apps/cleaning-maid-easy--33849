import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Col,
    Row,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { forgetPasswordRequest } from '../ForgotPassword/redux/actions'
import useForm from '../../utils/useForm';


const ForgotPassword = (props) => {
const {forgetPasswordRequest}=props

const stateSchema = {
    email: {
       value: '', 
       error: '' 
      }
  };
  const validationStateSchema = {
    email: {
      required: true,
    //   validator: validator.email,
    },
  };

  const { state, handleOnChange, disable } = useForm(
    stateSchema, 
    validationStateSchema
    );

const forgotPasswordSendLink=()=>{
    const data={
        email:state.email.value
    }
    forgetPasswordRequest(data)
}

    return (
        <div className="login-page">
            <Container>
                <Row>
                    {/* <Col className="ml-auto mr-auto" lg="1" md="4">
                            <div>
                                <Button style={{ display: "contents" }} onClick={this.goBack}>
                                    <i class="nc-icon nc-minimal-left" style={{ fontSize: 43, color: '#3B7936' }} />
                                </Button>
                            </div>
                        </Col> */}
                    <Col className="ml-auto mr-auto" lg="5" md="12">
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
                                    <h2 className="header text-center font-weight-bold" style={{ color: '#0C4DA2' }}>Forgot Password</h2>
                                </div>
                                <p className="text-center" style={{ fontSize: 14, paddingBottom: 40 }}>Please enter your email address below and we will send you instructions to reset your password</p>
                                <div>
                                    <label style={{ fontSize: 12, textTransform: 'uppercase' }}>Email</label>
                                    <FormGroup>
                                        <Input placeholder="" type="email" onChange={(e) => handleOnChange('email', e.target.value)} />
                                    </FormGroup>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        className="mb-3 mt-4"
                                        style={{ background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)", paddingLeft: 100, fontSize: 18, paddingRight: 100, }}
                                        onClick={forgotPasswordSendLink}
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div
                className="full-page-background"
                style={{
                    backgroundImage: `url(${require("assets/images/background_img.png")})`,
                }}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    // data: state.login.data,
    // requesting: state.login.requesting,
    // error: state.login.error
});

const mapDispatchToProps = (dispatch) => ({
    forgetPasswordRequest: (data) => dispatch(forgetPasswordRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
