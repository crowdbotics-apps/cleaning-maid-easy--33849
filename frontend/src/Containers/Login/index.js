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
import { Link } from "react-router-dom";
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     document.body.classList.toggle("login-page");
    // }
    // componentWillUnmount() {
    //     document.body.classList.toggle("login-page");
    // }
    render() {
        return (
            <div className="login-page">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" lg="5" md="6">
                            <Form action="" className="form" method="">
                                <div className="card-login">
                                    <div>
                                    <div className="justify-content-center d-flex align-items-center">
                                    <img
                                            style={{ paddingBottom: 56, alignSelf:'center' }}
                                            alt="..."
                                            src={require("assets/img/logo_img.png")}
                                        />
                                    </div>
                                       
                                        <h2 className="header text-center font-weight-bold" style={{ color: '#0C4DA2', }}>Sign In</h2>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 12, textTransform: 'uppercase' }}>Email</label>
                                        <FormGroup>
                                            <Input placeholder="" type="email" />
                                        </FormGroup>
                                        <label style={{ fontSize: 12, textTransform: 'uppercase' }}>Password</label>
                                        <FormGroup>
                                            <Input placeholder="" type="password"
                                                autoComplete="off" />
                                        </FormGroup>
                                    </div>
                                    <card-footer>
                                        <div className="justify-content-center d-flex align-items-center">
                                            <Button
                                                // block
                                                className="mb-3 mt-4"
                                                style={{ background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)", fontSize: 18, paddingLeft:100, paddingRight:100}}
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                Sign in
                                            </Button>
                                        </div>
                                        <div className="text-center">
                                            <Link to="/auth/forgetPassword">
                                                <text style={{ fontSize: 12, textDecorationLine: 'underline', }}>Forgot your password?</text>
                                            </Link>
                                        </div>
                                        <div className="justify-content-center d-flex align-items-center">
                                            <Button
                                                // block
                                                className="mb-3"
                                                style={{ background: "linear-gradient(258.61deg, #E6DE18 -13.41%, #438B44 82.44%)", fontWeight: '600',paddingLeft:38, paddingRight:38, fontSize: 18, marginTop: 50 }}
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                Super Admin Sign In
                                            </Button>
                                        </div>
                                    </card-footer>
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

export default ForgotPassword;
