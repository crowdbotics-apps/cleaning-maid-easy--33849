import React from "react"

// components
import { Text } from "src/components"
import { Platform, SafeAreaView, ScrollView, TextInput } from "react-native"
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"

// styles
import { Images } from "src/theme"
import LinearGradient from "react-native-linear-gradient"

const ForgotPassword = props => {
  const {
    navigation: { navigate, goBack }
  } = props

  const { appLogo, backArrow } = Images

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ECECEC" }}>
        <Image
          source={appLogo}
          style={{
            width: 201,
            height: 74,
            marginTop: 27,
            alignSelf: "center",
            resizeMode: "contain"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 14
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => goBack()}
          >
            <Image
              source={backArrow}
              style={{
                width: 9,
                height: 18,
                alignSelf: "center",
                resizeMode: "contain"
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: "#0C4DA2"
            }}
          >
            Forgot Password?
          </Text>
          <View></View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              paddingHorizontal: 30,
              marginTop: 46,
              fontSize: 12,
              lineHeight: 15,
              textAlign: "center"
            }}
          >
            Please enter your email address below and we will send you
            instructions to reset your password
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
          style={{ flex: 1 }}
          enabled
        >
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={{ paddingHorizontal: 30, marginTop: 58 }}>
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
            </View>
            <View
              style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "flex-end",
                paddingTop: 100
              }}
            >
              <TouchableOpacity
                style={{ marginBottom: 80 }}
                onPress={() => navigate("ResetPassword")}
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
                    Send
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

export default ForgotPassword
