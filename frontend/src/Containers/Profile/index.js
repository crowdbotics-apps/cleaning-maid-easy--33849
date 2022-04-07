import React, { useEffect, useState } from "react"

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
  Row
} from "reactstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"
import { Toaster } from "react-hot-toast"

//Actions
import { getUserInfo } from "./redux/actions"
import { renderHtmlText } from "../Services/redux/actions"

const Profile = props => {
  const { profileData } = props
  const [userInfo, setUserInfo] = useState(false)

  useEffect(() => {
    props.renderHtmlText("Profile")
    props.getUserInfo()
    const userData = sessionStorage.getItem("userInfo")
    setUserInfo(JSON.parse(userData))
  }, [])

  // const [profileImage, setProfileIMage] = useState(require("assets/img/default-avatar.png"))

  const profileImage = { image: require("assets/img/placeholder.jpg") }
  const { history } = props

  return (
    <>
      <Toaster position="top-center" />
      <div
        className="content "
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
                      src={
                        profileData
                          ? profileData.profile_picture
                          : userInfo && userInfo?.profile_picture
                          ? userInfo?.profile_picture
                          : profileImage.image
                      }
                    />
                  </div>
                  <div>
                    <label style={styles.userNameText}>
                      {userInfo.name ? userInfo.name : "Test User"}
                    </label>
                  </div>
                  <div>
                    <label style={styles.companyText}>
                      {userInfo.company_name
                        ? userInfo.company_name
                        : "Cleaning Maid Easy  "}
                    </label>
                  </div>
                  <div className="pt-2">
                    <img
                      className="pr-2"
                      alt="..."
                      src={require("assets/icons/mapPin.png")}
                      phone_img
                    />
                    <label style={styles.addressText}>
                      {" "}
                      {userInfo.address
                        ? userInfo.address
                        : "New jersey, New York"}
                    </label>
                  </div>
                  <div className="pt-2">
                    <img
                      className="pr-2"
                      alt="..."
                      src={require("assets/icons/phone_img.png")}
                    />
                    <label style={styles.addressText}>
                      {userInfo.phone_number
                        ? userInfo.phone_number
                        : "+92 302 1154779"}
                    </label>
                  </div>
                  <div style={{ paddingTop: 80 }}>
                    <Button
                      onClick={() => props.history.push("/admin/editProfile")}
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
    </>
  )
}

const mapStateToProps = state => ({
  profileData: state.profile.userInfo
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  renderHtmlText: data => dispatch(renderHtmlText(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = {
  cardStyle: {
    marginTop: 54,
    marginLeft: 54,
    marginRight: 54,
    opacity: 0.94
  },
  imagWrapper: {
    width: 194,
    height: 194,
    borderRadius: "50%"
  },
  userNameText: {
    fontWeight: "500",
    fontFamily: "Ubuntu",
    fontSize: 36,
    color: "black"
  },
  companyText: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    color: "black",
    fontSize: 18,
    opacity: 0.8
  },
  addressText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#000000",
    opacity: 0.5
  },
  editBtn: {
    background:
      "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF",
    borderRadius: 15,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Montserrat",
    paddingLeft: 79,
    paddingRight: 79,
    paddingTop: 17,
    paddingBottom: 16
  }
}
