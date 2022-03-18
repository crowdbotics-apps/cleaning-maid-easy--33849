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

const Profile = (props) => {
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
                            <div className="text-center" style={{ paddingBottom: 75 }}>
                                <div className="pt-5 pb-3">
                                    <img
                                        style={styles.imagWrapper}
                                        alt="..."
                                        src={require("assets/img/ayo-ogunseinde-2.jpg")}
                                    />
                                </div>
                                <div>
                                    <label style={styles.userNameText}>Ronald Richards</label>
                                </div>
                                <div>
                                    <label style={styles.companyText}>Maid Service LLC</label>
                                </div>
                                <div className="pt-2">
                                    <img
                                        className="pr-2"
                                        alt="..."
                                        src={require("assets/icons/mapPin.png")}
                                        phone_img
                                    />
                                    <label style={styles.addressText}> 3517 W. Gray St. Utica, Pennsylvania 57867</label>
                                </div>
                                <div className="pt-2">
                                    <img
                                        className="pr-2"
                                        alt="..."
                                        src={require("assets/icons/phone_img.png")}

                                    />
                                    <label style={styles.addressText}>
                                        (308) 555-0121
                                    </label>
                                </div>
                                <div style={{ paddingTop: 80 }}>
                                    <Button
                                    onClick={()=>props.history.push('/admin/editProfile')}
                                        style={styles.editBtn}
                                    >
                                        Edit
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);


const styles = {
    cardStyle: {
        marginTop: 54,
        marginLeft: 54,
        marginRight: 54,
        opacity: 0.94
    },
    imagWrapper: {
        width: 194,
        heigt: 194,
        borderRadius: '50%'
    },
    userNameText: {
        fontWeight: '500',
        fontFamily: 'Ubuntu',
        fontSize: 36,
        color: 'black'
    },
    companyText: {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        color: 'black',
        fontSize: 18,
        opacity: 0.8
    },
    addressText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000000',
        opacity: 0.5
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
    }

}