import React, { useState, useEffect } from "react"

// components
import { Text, Button, Input } from "src/components"
import {
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

// styles
import { Layout, Fonts, Images, Colors, Gutters } from "src/theme"
import LinearGradient from "react-native-linear-gradient"

const ForgotPassword = props => {
  const {
    navigation: { navigate }  } = props


  const { appLogo, backArrow } = Images

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
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
        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center', marginTop: 20,}}>
        <Image
          source={backArrow}
          style={{
            width: 19,
            height: 10,
            paddingLeft: 30,
            resizeMode: "contain",
          }}
        />
        </View>
          <Text
            style={{
              marginTop: 14,
              fontSize: 24,
              fontWeight: "700",
              color: "#0C4DA2",
            }}
          >
            Forgot Password?
          </Text>
          <View></View>
        </View>
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Text style={{paddingHorizontal: 30, marginTop: 46}}>Please enter your email address below and we will send you instructions to reset your password</Text>
          </View>
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={{ marginBottom: 80 }} onPress={()=> navigate('ResetPassword')}>
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
    </>
  )
}

export default ForgotPassword

