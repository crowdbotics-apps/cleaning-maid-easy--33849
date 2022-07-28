import React, { useState, useEffect } from "react"

// components
import { Text, Button, Input } from "src/components"
import { launchImageLibrary } from "react-native-image-picker"
import { StatusBar, Platform, Dimensions, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient"
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

//actions"
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

  // useEffect(() => {
  //   if (profileData) {
  //     handleOnChange(
  //       "name",
  //       profileData.name ? profileData.name : profileData.username
  //     )
  //     handleOnChange("email", profileData.email)
  //     profileData.location && handleOnChange("location", profileData.location)
  //     profileData.zip_code && handleOnChange("zipcode", profileData.zip_code)
  //     profileData.phone_number &&
  //       handleOnChange("phoneNumber", profileData.phone_number)
  //     setProfileImage(profileData.profile_image)
  //   }
  // }, [profileData])

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
      style={[{ flex: 1, backgroundColor: "#FFFFFF" }]}
    >
      <ScrollView style={{paddingBottom: 10}}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 24, lineHeight: 28 }}>Edit Profile</Text>
          <Image
            source={Images.userImage}
            style={{
              width: 145,
              height: 145,
              borderRadius: 73,
              marginTop: 38
            }}
          />
          <Text
            style={{
              marginTop: 12,
              fontSize: 12,
              color: "#438B44",
              fontWeight: "600"
            }}
          >
            Edit Photo
          </Text>
        </View>
        <View style={{ paddingHorizontal: 30, marginTop: 26 }}>
          <Text style={{ opacity: 0.4, fontSize: 12 }}>Full Name</Text>
          <TextInput
            style={[inputStyle]}
            placeholder="Name"
            placeholderTextColor='#C4C4C4'
          />
           <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 20 }}>Email</Text>
          <TextInput
          keyboardType="email-address"
            style={[inputStyle]}
            placeholder="Email"
            placeholderTextColor='#C4C4C4'
          />
           <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 20 }}>Company Name</Text>
          <TextInput
            style={[inputStyle]}
            placeholder="Company Name"
            placeholderTextColor='#C4C4C4'
          />
           <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 20 }}>Phone number</Text>
          <TextInput
          keyboardType="phone-pad"
            style={[inputStyle]}
            placeholder="Phone number"
            placeholderTextColor='#C4C4C4'
          />
          <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 20 }}>Zip Code</Text>
          <TextInput
            style={[inputStyle]}
            placeholder="Zip Code"
            placeholderTextColor='#C4C4C4'
          />
           <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 20 }}>Address</Text>
          <TextInput
            style={[inputStyle]}
            placeholder="Address"
            placeholderTextColor='#C4C4C4'
          />
            <TouchableOpacity
              style={{
                paddingBottom: 22,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 21
              }}
              onPress={() => navigate("RequestService")}
            >
              <LinearGradient
                colors={["#00B9F1", "#034EA2"]}
                style={{ height: 42, width: 141, borderRadius: 10 }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    color: "#FFFFFF",
                    lineHeight: 42,
                    fontWeight: "700"
                  }}
                >
                  Save
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfile
