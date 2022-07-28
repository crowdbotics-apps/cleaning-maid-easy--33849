import React, { useState, useEffect } from "react"

// components
import { Text, Button, Input, MainHeader, Header } from "src/components"
import {
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Image
} from "react-native"
import Images from "../../theme/Images"

import LinearGradient from "react-native-linear-gradient"
import { Dropdown } from "react-native-element-dropdown"

const ServiceDetail = props => {
  const {
    navigation: { navigate, goBack }
  } = props

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          mainText="Service Details"
          onPress={() => {
            goBack()
          }}
        />
        <View style={{ paddingHorizontal: 37, marginTop: 47 }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={Images.calender}
              style={{
                width: 18,
                height: 18
              }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ marginLeft: 22, fontSize: 14 }}>
                09 September 2021
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 21 }}>
            <Image
              source={Images.clockIcon}
              style={{
                width: 18,
                height: 18
              }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ marginLeft: 22, fontSize: 14 }}>
                09:00AM - 11:30AM
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 21 }}>
            <Image
              source={Images.mapIcon}
              style={{
                width: 18,
                height: 18
              }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ marginLeft: 22, fontSize: 14 }}>
                9400 Ninove Street, SA
              </Text>
            </View>
          </View>
          <Text style={{ marginTop: 46, opacity: 0.5 }}>
            Assigned Employee/ Team
          </Text>
          <Text style={{ marginTop: 15 }}>Basic Cleaning Team </Text>
          <Text style={{ marginTop: 24, opacity: 0.5 }}>Services </Text>
          <Text style={{ marginTop: 15 }}>Basic Cleaning </Text>
          <Text style={{ marginTop: 24, opacity: 0.5 }}>Frequency </Text>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Image
              source={Images.elipsIcon}
              style={{
                width: 18,
                height: 18
              }}
            />
            <Text style={{ marginLeft: 9 }}>4 weeks/ monthly </Text>
          </View>
          <Text style={{ marginTop: 24, opacity: 0.5 }}>Notes </Text>
          <View
            style={{
              marginTop: 5,
              paddingTop: 6, 
              paddingTop: 11,
              paddingLeft: 6,
              paddingRight: 15,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.00,
              
              elevation: 1,
            }}
          >
            <Text>
              Damp cloth wipe down of all walls (waist down) throughout the
              home.
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <TouchableOpacity
            style={{
              marginBottom: 22
            }}
            onPress={() => navigate("FeedBack")}
          >
            <LinearGradient
              colors={["#00B9F1", "#034EA2"]}
              style={{ height: 42, width: 207, borderRadius: 10 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "#FFFFFF",
                  lineHeight: 42
                }}
              >
                Reschedule
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

export default ServiceDetail
