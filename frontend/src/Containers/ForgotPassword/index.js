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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this); // i think you are missing this
    }
    goBack() {
        this.props.history.goBack();
    }

    render() {
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
                                    <p className="text-center" style={{fontSize: 14, paddingBottom: 40 }}>Please enter your email address below and we will send you instructions to reset your password</p>
                                    <div>
                                        <label style={{ fontSize: 12, textTransform: 'uppercase' }}>Email</label>
                                        <FormGroup>
                                            <Input placeholder="" type="email" />
                                        </FormGroup>
                                    </div>
                                    {/* <card-footer> */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button
                                            // block
                                            className="mb-3 mt-4"
                                            style={{ background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)", paddingLeft: 100, fontSize: 18, paddingRight: 100, }}
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Send
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
                        backgroundImage: `url(${require("assets/img/background_img.png")})`,
                    }}
                />
            </div>
        );
    }
}

export default Login;
