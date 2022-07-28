import React, { useState, useEffect } from "react"

// components
import { Text, Button, Input, MainHeader, Header } from "src/components"
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  View,
  TouchableOpacity
} from "react-native"

import { Images } from "src/theme"

import LinearGradient from "react-native-linear-gradient"

const MyProfile = props => {
  const {
    navigation: { navigate, goBack }
  } = props

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <ImageBackground
            source={Images.profileBackGround}
            style={{
              height: 350,
              width: "100%"
            }}
          >
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={{ fontSize: 24, lineHeight: 28 }}>My Profile</Text>
              <Image
                source={Images.userImage}
                style={{
                  width: 145,
                  height: 145,
                  borderRadius: 73,
                  marginTop: 38
                }}
              />
            </View>
          </ImageBackground>
          <View style={{ paddingHorizontal: 30, marginTop: 31 }}>
            <Text style={{ opacity: 0.4, fontSize: 12 }}>Full Name</Text>
            <Text style={{ fontSize: 12, marginTop: 8 }}>Jenny Wilson</Text>
            <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 12 }}>
              Email
            </Text>
            <Text style={{ fontSize: 12, marginTop: 8 }}>
              jennywilson@email.com
            </Text>
            <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 12 }}>
              Company Name
            </Text>
            <Text style={{ fontSize: 12, marginTop: 8 }}>abc</Text>
            <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 12 }}>
              Phone number
            </Text>
            <Text style={{ fontSize: 12, marginTop: 8 }}>(505) 555-0125</Text>
            <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 12 }}>
              Zip Code
            </Text>
            <Text style={{ fontSize: 12, marginTop: 8 }}>95153</Text>
            <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 12 }}>
              Address
            </Text>
            <Text style={{ fontSize: 12, marginTop: 8 }}>
              9400 Ninove Street, SA
            </Text>
            <TouchableOpacity
              style={{
                paddingBottom: 22,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 21
              }}
              onPress={() => navigate("EditProfile")}
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
                  Edit Profile
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{marginTop: 14, fontSize: 12,marginBottom: 40, textAlign: 'center'}}>Cancel</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default MyProfile
