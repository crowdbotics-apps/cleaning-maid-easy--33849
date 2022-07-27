import React, { useState, useEffect } from "react"

// components
import { Text, Button, Input } from "src/components"
import { launchImageLibrary } from "react-native-image-picker"
import { StatusBar, Platform, Dimensions } from "react-native"
import { Icon, Container } from "native-base"
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from "react-native"
import { connect } from "react-redux"
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

// styles
import styles from "./styles"
import { Layout, Fonts, Images, Colors, Gutters } from "src/theme"
import { ScrollView } from "react-native-gesture-handler"

//actions
import { editProfile } from "../../screenRedux/editProfileRedux"
import { SafeAreaView } from "react-navigation"

const EditProfile = props => {
  const {
    navigation: { navigate, goBack },
    profileData
  } = props

  const [passwordShown, setPasswordShown] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [fileName, setFileName] = useState(false)
  const [focusField, setFocusField] = useState(false)

  const { row, fill, center, rowReverse } = Layout
  const {
    mediumHPadding,
    largeVMargin,
    mediumVMargin,
    regularRMargin,
    smallHPadding,
    mediumTMargin,
    small2xTMargin,
    smallTMargin,
    small2xHPadding,
    smallBMargin,
    small2xBPadding,
    largeHMargin,
    largeTMargin,
    small2xRPadding,
    largeHPadding
  } = Gutters
  const { titleRegular, textMedium } = Fonts
  const {
    icon,
    login,
    inputStyle,
    save,
    locationIconStyle,
    locationInputStyle
  } = styles

  const stateSchema = {
    name: {
      value: "",
      error: ""
    },
    email: {
      value: "",
      error: ""
    },
    location: {
      value: "",
      error: ""
    },
    zipcode: {
      value: "",
      error: ""
    },
    phoneNumber: {
      value: "",
      error: ""
    }
  }

  const validationStateSchema = {
    name: {
      required: true
    },
    email: {
      // required: true,
      validator: validator.email
    },
    location: {
      required: true
    },
    zipcode: {
      required: false
    },
    phoneNumber: {
      required: true
    }
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  const { AppLogo, BackArrow, LocationIcon, HidePassword } = Images

  const { width } = Dimensions.get("window")

  useEffect(() => {
    if (profileData) {
      handleOnChange(
        "name",
        profileData.name ? profileData.name : profileData.username
      )
      handleOnChange("email", profileData.email)
      profileData.location && handleOnChange("location", profileData.location)
      profileData.zip_code && handleOnChange("zipcode", profileData.zip_code)
      profileData.phone_number &&
        handleOnChange("phoneNumber", profileData.phone_number)
      setProfileImage(profileData.profile_image)
    }
  }, [profileData])

  const { EditIcon } = Images

  const launchImage = () => {
    const options = {
      quality: 0,
      includeBase64: true
    }
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton)
      } else {
        if (response && response.assets && response.assets[0].uri) {
          setFileName(response?.assets[0]?.fileName)
          setProfileImage(response?.assets[0]?.uri)
        }
      }
    })
  }

  const saveProfile = () => {
    const formData = new FormData()
    {
      profileImage &&
        fileName &&
        formData.append("profile_image", {
          uri:
            Platform.OS === "android"
              ? profileImage
              : profileImage.replace("file://", ""),
          type: "image/jpeg",
          name: fileName
        })
    }
    formData.append("name", state.name.value)
    formData.append("phone_number", state.phoneNumber.value)
    formData.append("location", state.location.value)
    props.editProfile(formData, props.user?.id)
  }

  return (
    <SafeAreaView
      style={[smallHPadding, { flex: 1, backgroundColor: "#FBFBFD" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            center,
            largeTMargin,
            row,
            { justifyContent: "space-between" }
          ]}
        >
          <TouchableOpacity onPress={() => goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <Text text="Edit Profile" style={{ fontSize: 20 }} bold />
          <View />
        </View>
        <View style={[center]}>
          <View
            style={{
              height: 132,
              width: 132,
              borderRadius: 61,
              backgroundColor: "#C4C4C4",
              top: 26,
              borderRadius: 100,
              zIndex: 1
            }}
          >
            {/* <ProfileImage /> */}
            {profileImage ? (
              <Image
                source={{
                  uri: profileImage
                }}
                style={{ height: 132, width: 132, borderRadius: 100 }}
              />
            ) : (
              <Image
                source={Images.userImage}
                style={{ height: 132, width: 132, borderRadius: 100 }}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => launchImage()}
            style={{
              position: "absolute",
              bottom: -10,
              right: 0,
              marginRight: width * 0.28,
              zIndex: 1
            }}
          >
            <EditIcon />
          </TouchableOpacity>
        </View>
        <Text
          text="Edit your details"
          style={[largeTMargin, { fontSize: 18 }]}
          bold
        />
        <View
          style={[
            smallHPadding,
            small2xBPadding,
            small2xTMargin,
            { backgroundColor: "white", borderRadius: 10 }
          ]}
        >
          <Text
            text="Name"
            style={[small2xTMargin, { fontSize: 14 }, smallBMargin]}
            bold
          />
          <TextInput
            style={[inputStyle]}
            value={state.name.value}
            onChangeText={value => handleOnChange("name", value)}
            placeholder="Name"
            placeholderTextColor={'#231F2050'}
          />
          <Text text={state.name.error} style={{ color: "red" }} />
          <Text
            text="Email"
            style={[small2xTMargin, { fontSize: 14 }, smallBMargin]}
            bold
          />
          <TextInput
            style={[inputStyle]}
            value={state.email.value}
            onChangeText={value => handleOnChange("email", value)}
            placeholder="Email"
            editable={false}
          />
          <Text text={state.email.error} style={{ color: "red" }} />
          <Text
            text="Location"
            style={[small2xTMargin, { fontSize: 14 }, smallBMargin]}
            bold
          />
          <View style={[row, { justifyContent: "space-between" }]}>
            <TextInput
              style={[locationInputStyle]}
              value={state.location.value}
              onChangeText={value => handleOnChange("location", value)}
              placeholder="Location"
              placeholderTextColor={'#231F2050'}
            />
            <View style={[center, locationIconStyle, small2xRPadding]}>
              <LocationIcon />
            </View>
          </View>
          <Text text={state.location.error} style={{ color: "red" }} />
          <Text
            text="ZipCode"
            style={[small2xTMargin, { fontSize: 14 }, smallBMargin]}
            bold
          />
          <TextInput
            style={[inputStyle]}
            value={state.zipcode.value}
            onChangeText={value => handleOnChange("zipcode", value)}
            placeholder="ZipCode"
            keyboardType="numeric"
            placeholderTextColor={'#231F2050'}
          />
          <Text text={state.zipcode.error} style={{ color: "red" }} />
          <Text
            text="Phone Number"
            style={[small2xTMargin, { fontSize: 14 }, smallBMargin]}
            bold
          />
          <TextInput
            style={[inputStyle]}
            value={state.phoneNumber.value}
            onChangeText={value => handleOnChange("phoneNumber", value)}
            placeholder="Phone Number"
            keyboardType="numeric"
            placeholderTextColor={'#231F2050'}
          />
          <Text text={state.phoneNumber.error} style={{ color: "red" }} />

          <Text
            text="Password"
            style={[small2xTMargin, { fontSize: 14 }, smallBMargin]}
            bold
          />
          <View style={[row]}>
            <TextInput
              style={[inputStyle]}
              value={"9293929399"}
              secureTextEntry={true}
              // onChangeText={value => handleOnChange("phoneNumber", value)}
              // placeholder="Phone Number"
              editable={false}
            />
            <View style={[center, locationIconStyle, small2xRPadding]}>
              <HidePassword />
            </View>
          </View>
        </View>
        <View
          style={[
            row,
            largeHPadding,
            { marginTop: 23, justifyContent: "space-around" }
          ]}
        >
          <Button
            text="Cancel"
            color="primary"
            block
            style={login}
            center
            onPress={() => goBack()}
          />
          <Button
            text="Save"
            color="primary"
            block
            style={save}
            center
            onPress={() => saveProfile()}
            loading={props.requesting}
            disabled={disable}
          />
        </View>
        <View>
          <Text
            text="Delete Account"
            style={[
              smallHPadding,
              { fontSize: 14, color: "#FF6848", marginVertical: 31 }
            ]}
            bold
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  requesting: state.editProfileReducer.requesting,
  profileData: state.myProfileReducer.profileData,
  user: state.login.userDetail
})

const mapDispatchToProps = dispatch => ({
  editProfile: (data, id) => dispatch(editProfile(data, id))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
