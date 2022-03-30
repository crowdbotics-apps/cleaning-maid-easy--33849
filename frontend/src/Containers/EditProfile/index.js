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
import ImageUpload from "../../components/CustomUpload/ImageUpload"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

// Actions
import { editUserInfo } from "../Profile/redux/actions"
import {renderHtmlText} from '../Services/redux/actions'

const EditProfile = props => {
  const { history , requesting} = props
  const [userInfo, setUserInfo] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    props.renderHtmlText("Edit Profile")
    const userData = sessionStorage.getItem("userInfo")

    setUserInfo(JSON.parse(userData))
  }, [])

  useEffect(() => {
    if (userInfo) {
      handleOnChange("fullName", userInfo.name)
      handleOnChange("company_name", userInfo.company_name)
      handleOnChange("address", userInfo.address)
      handleOnChange("phone_number", userInfo.phone_number)
      handleOnChange("profileImage", userInfo.profile_picture)
      setSelectedImage(userInfo.profile_picture)
    }
  }, [userInfo])

  const stateSchema = {
    fullName: {
      value: "",
      error: ""
    },
    company_name: {
      value: "",
      error: ""
    },
    address: {
      value: "",
      error: ""
    },
    phone_number: {
      value: "",
      error: ""
    },
    profileImage: {
      value: "",
      error: ""
    }
  }

  const validationStateSchema = {
    fullName: {
      //   required: true
    },
    company_name: {
      //   required: true
    },
    address: {
      // required: true
    },
    phone_number: {
      //   required: true,
      validator: validator.phone
    },
    profileImage: {
      //   required: true,
      validator: validator.phone
    }
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )
  const updateProfile = () => {
    const data = new FormData()
    data.append("name", state.fullName.value)
    data.append("company_name", state.company_name.value)
    data.append("address", state.address.value)
    data.append("phone_number", state.phone_number.value)
    // data.append('profile_picture', {
    //     uri: "file:///...",
    //     type: `${selectedImage?.type}`,
    //     name: `${selectedImage?.name}`,
    //   });
    // data.append("profile_picture", selectedImage)
    props.editUserInfo(data, userInfo.id)
  }

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
      <Row>
        <Col md="12">
          <Card style={styles.cardStyle}>
            <CardBody>
              <div className="mx-auto pb-2" style={{ maxWidth: 436 }}>
                <div className="pt-4 pb-3">
                  <div>
                    <ImageUpload
                      height={109}
                      width={109}
                      mainImg={true}
                      mainImage={setSelectedImage}
                    />
                  </div>
                </div>
                <div>
                  <label style={styles.labelTextStyle}>Full Name</label>
                  <Input
                    style={styles.inputTextStyle}
                    className="border-0 pl-0"
                    value={state.fullName.value}
                    onChange={e => handleOnChange("fullName", e.target.value)}
                  />
                  <div style={styles.inputLineStyle} />

                  <div className="mt-4">
                    <label style={styles.labelTextStyle}>Company Name</label>
                    <Input
                      style={styles.inputTextStyle}
                      className="border-0 pl-0"
                      value={state.company_name.value}
                      onChange={e =>
                        handleOnChange("company_name", e.target.value)
                      }
                    />
                    <div style={styles.inputLineStyle} />
                  </div>

                  <div className="mt-4">
                    <label style={styles.labelTextStyle}>Address</label>
                    <Input
                      style={styles.inputTextStyle}
                      className="border-0 pl-0"
                      value={state.address.value}
                      onChange={e => handleOnChange("address", e.target.value)}
                    />
                    <div style={styles.inputLineStyle} />
                  </div>
                  <div className="mt-4">
                    <label style={styles.labelTextStyle}>Contact Number</label>
                    <Input
                      style={styles.inputTextStyle}
                      className="border-0 pl-0"
                      value={state.phone_number.value}
                      onChange={e =>
                        handleOnChange("phone_number", e.target.value)
                      }
                    />
                    <div style={styles.inputLineStyle} />
                  </div>
                </div>
                <div className="pt-4 text-center">
                  <Button onClick={updateProfile} style={styles.editBtn}>
                      {
                          requesting ? (
                            <Spinner size="sm" />
                          ):"Save"
                      }
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  requesting: state.profile.requesting,
})

const mapDispatchToProps = dispatch => ({
  // loginRequest: (data) => dispatch(loginRequest(data)),
  editUserInfo: (data, id) => dispatch(editUserInfo(data, id)),
  renderHtmlText: (data) => dispatch(renderHtmlText(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

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
    borderRadius: "50%"
  },
  labelTextStyle: {
    fontSize: 14,
    opacity: 0.5,
    fontWeight: "500",
    color: "#000000"
  },
  uploadText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#034EA2",
    backgroundColor: "white",
    border: 0,
    boxShadow: "none",
    outline: "none"
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
  },
  inputTextStyle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#000000"
  },
  inputLineStyle: {
    backgroundColor: "#D9D9D9",
    height: 1
  }
}
