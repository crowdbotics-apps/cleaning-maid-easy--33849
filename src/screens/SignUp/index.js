import React, { useState, useEffect } from "react"

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

// styles
import LinearGradient from "react-native-linear-gradient"

const SignUp = props => {
  const {
    navigation: { navigate },
    requesting
  } = props

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ECECEC" }}>
        <MainHeader mainText="Sign Up" />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingHorizontal: 30, marginTop: 58, flex: 1 }}>
            <Text style={{ fontSize: 12, marginBottom: 8 }}>Full name</Text>
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
              EMAIL
            </Text>
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
              PHONE NUMBER
            </Text>
            <TextInput
              keyboardType="phone-pad"
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
            <Text style={{ fontSize: 12, marginBottom: 8, marginTop: 17 }}>
              CONFIRM PASSWORD
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginBottom: 27, marginTop: 47 }}
              onPress={() => navigate("ForgotPassword")}
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
                  Sign Up
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
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default SignUp
