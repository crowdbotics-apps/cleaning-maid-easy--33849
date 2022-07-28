import React from "react"

// components
import { Text, MainHeader } from "src/components"
import { Platform, SafeAreaView, ScrollView, TextInput } from "react-native"
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"
import { Dimensions } from "react-native"

// styles
import { Images } from "src/theme"
import LinearGradient from "react-native-linear-gradient"

const MainLogin = props => {
  const {
    navigation: { navigate },
    requesting
  } = props

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

  const { height } = Dimensions.get("window")
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECECEC" }}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={100}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <MainHeader mainText="Sign In" />
          <View
            style={{
              paddingHorizontal: 30,
              marginTop: 58,
              flex: 1
            }}
          >
            <Text style={{ fontSize: 12, marginBottom: 8 }}>EMAIL</Text>
            <TextInput
              keyboardType="email-address"
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
              secureTextEntry={true}
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
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              flex: 1,
              marginTop: height * 0.25
            }}
          >
            <TouchableOpacity
              style={{ marginBottom: 27 }}
              onPress={() => navigate("SignUp")}
            >
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
            <View style={{ flexDirection: "row", flex: 1 }}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MainLogin
