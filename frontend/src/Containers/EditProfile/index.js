import React, { useEffect, useState } from "react";

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
    Container,
    Spinner,
    UncontrolledAlert,
    Col,
    Row,
} from "reactstrap";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import useForm from '../../utils/useForm';
import validator from '../../utils/validation';

//Actions
// import { loginRequest,resetMsg } from './redux/actions'

const EditProfile = (props) => {
    const { history } = props;

    return (
        <div className="content "
            style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${require("assets/images/bg_content.png")})`,
                flex: 1
            }}
        >
            <Row>
                <Col md="12">
                    <Card style={styles.cardStyle}>
                        <CardBody>
                            <div className="mx-auto pb-2" style={{maxWidth: 436 }}>
                                <div className="pt-4 pb-3">
                                    <img
                                        style={styles.imagWrapper}
                                        alt="..."
                                        src={require("assets/img/ayo-ogunseinde-2.jpg")}
                                    />
                                    <div>
                                        <button style={styles.uploadText}>
                                            Upload Photo
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label style={styles.labelTextStyle}>Full Name</label>
                                    <Input style={styles.inputTextStyle} className="border-0 pl-0" />
                                    <div style={styles.inputLineStyle}/>

                                    <div className="mt-4">
                                        <label style={styles.labelTextStyle}>Company Name</label>
                                        <Input style={styles.inputTextStyle} className="border-0 pl-0" />
                                        <div style={styles.inputLineStyle}/>
                                    </div>

                                    <div className="mt-4">
                                        <label style={styles.labelTextStyle}>Address</label>
                                        <Input style={styles.inputTextStyle} className="border-0 pl-0" />
                                        <div style={styles.inputLineStyle}/>
                                    </div>
                                    <div className="mt-4">
                                        <label style={styles.labelTextStyle}>Contact Number</label>
                                        <Input style={styles.inputTextStyle} className="border-0 pl-0" />
                                        <div style={styles.inputLineStyle}/>
                                    </div>
                                </div>
                                <div className="pt-2 text-center">
                                    <Button
                                        style={styles.editBtn}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = (state) => ({
    // data: state.login.user.key,
    // requesting: state.login.requesting,
    // error: state.login.error
});

const mapDispatchToProps = (dispatch) => ({
    // loginRequest: (data) => dispatch(loginRequest(data)),
    // resetMsg: () => dispatch(resetMsg())
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);


const styles = {
    cardStyle: {
        marginTop: 54,
        marginLeft: 54,
        marginRight: 54,
        opacity: 0.94
    },
    imagWrapper: {
        width: 109,
        heigt: 109,
        borderRadius: '50%'
    },
    labelTextStyle: {
        fontSize: 14,
        opacity:0.5,
        fontWeight: '500',
        color:'#000000'
    },
    uploadText: {
        fontWeight: '600',
        fontSize: 12,
        color: '#034EA2',
        backgroundColor: 'white',
        border: 0,
        boxShadow: 'none',
        outline: 'none'
    },
    editBtn: {
        background: "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF",
        borderRadius: 15,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Montserrat',
        paddingLeft: 79,
        paddingRight: 79,
        paddingTop: 17,
        paddingBottom: 16
    },
    inputTextStyle: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000000'
    },
    inputLineStyle: {
        backgroundColor: '#D9D9D9',
        height: 1
    }

}