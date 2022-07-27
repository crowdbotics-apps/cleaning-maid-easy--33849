import React, { useState, useEffect } from "react"

// components
import { Text, MainHeader,Button, Input } from "src/components"
import {
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput
} from "react-native"
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"
import {
  GoogleSignin,
  statusCodes
} from "@react-native-google-signin/google-signin"
import { AccessToken, LoginManager } from "react-native-fbsdk"
import { connect } from "react-redux"
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

// styles
import { Images, } from "src/theme"
import LinearGradient from "react-native-linear-gradient"

const MainLogin = props => {
  const {
    navigation: { navigate },
    requesting
  } = props

  const { appLogo } = Images

  const stateSchema = {
    email: {
      value: "",
      error: ""
    },
    password: {
      value: "",
      error: ""
    }
  }

  const validationStateSchema = {
    email: {
      required: true,
      validator: validator.email
    },
    password: {
      required: true
      // validator: validator.password
    }
  }

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema
  )

  const userLogin = () => {
    const data = {
      username: state.email.value,
      password: state.password.value
    }
    // props.loginUser(data)
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <MainHeader mainText="Sign In"/>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
          style={{ flex: 1 }}
        >
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ paddingHorizontal: 30, marginTop: 58 }}>
              <Text style={{ fontSize: 12, marginBottom: 8 }}>EMAIL</Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 42,
                  borderRadius: 5,
                  color: "black"
                }}
              />
              <Text style={{ fontSize: 12, marginBottom: 8, marginTop: 17 }}>
                PASSWORD
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 42,
                  borderRadius: 5,
                  color: "black"
                }}
              />
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "#0C4DA2",
                  marginTop: 12,
                  textAlign: "right"
                }}
              >
                Forgot your password?
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={{ marginBottom: 27 }} onPress={()=> navigate('SignUp')}>
          <LinearGradient
            colors={["#00B9F1", "#034EA2"]}
            style={{ height: 42, width: 262, borderRadius: 10 }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: "#FFFFFF",
                lineHeight: 42
              }}
            >
              Sign In
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text>Don’t have an account?</Text>
          <Text
            style={{
              fontWeight: "700",
              textDecorationLine: "underline",
              marginBottom: 42
            }}
          >
            {" "}
            Click here
          </Text>
        </View>
      </View>
    </>
  )
}

export default MainLogin
