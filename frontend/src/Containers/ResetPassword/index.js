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

class ResetPassword extends React.Component {
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
                                            style={{ paddingBottom: 56 }}
                                            alt="..."
                                            src={require("assets/img/logo_img.png")}
                                        />
                                        </div>
                                        <h2 className="header text-center font-weight-bold" style={{ color: '#0C4DA2' }}>Reset Password</h2>
                                    </div>
                                    <div>
                                        <label style={{fontSize:12, textTransform:'uppercase'}}>New password</label>
                                        <FormGroup>
                                            <Input placeholder="" type="password" />
                                        </FormGroup>
                                        <label style={{fontSize:12, textTransform:'uppercase'}}>confirm new password</label>
                                        <FormGroup>
                                            <Input placeholder="" type="password"
                                                autoComplete="off" />
                                        </FormGroup>
                                    </div>
                                    {/* <card-footer> */}
                                    <div className="justify-content-center d-flex align-items-center">
                                        <Button
                                            // block
                                            className="mb-3 mt-4"
                                            style={{ background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)",paddingLeft:100,fontSize:18, paddingRight:100,}}
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Reset
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
                        backgroundImage: `url(${require("assets/images/background_img.png")})`,
                    }}
                />
            </div>
        );
    }
}

export default ResetPassword;
