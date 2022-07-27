import React from "react"

// components
import { Text, Button, Input, MainHeader } from "src/components"
import {
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput
} from "react-native"
import { Icon, Container } from "native-base"
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"
import { connect } from "react-redux"
import useForm from "../../utils/useForm"
import validator from "../../utils/validation"

// styles
import { Layout, Fonts, Images, Colors, Gutters } from "src/theme"
import LinearGradient from "react-native-linear-gradient"

const ResetPassword = props => {
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

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
      <MainHeader mainText="Reset Password"/>
          <ScrollView
          style={{flexGrow: 1}}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ paddingHorizontal: 30, marginTop: 58 }}>
              <Text style={{ fontSize: 12, marginBottom: 8 }}>NWE PASSWORD</Text>
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
              <Text style={{ fontSize: 12, marginBottom: 8, marginTop: 17 }}>
                CONFIRM NEW PASSWORD
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
            </View>
          </ScrollView>
      </SafeAreaView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={{ marginBottom: 80 }} onPress={()=> navigate('RequestService')} >
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
              Reset
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ResetPassword
