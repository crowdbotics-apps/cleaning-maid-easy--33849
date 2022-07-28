import React from "react"

// components
import { Text, Header } from "src/components"
import { SafeAreaView, View, TouchableOpacity, Image } from "react-native"
import Images from "../../theme/Images"

import LinearGradient from "react-native-linear-gradient"
import { Rating } from "react-native-ratings"

const FeedBack = props => {
  const {
    navigation: { navigate, goBack }
  } = props

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          mainText="Rate Our Service"
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
          <Text
            style={{
              marginTop: 41,
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            Rating{" "}
          </Text>
          <View style={{ marginTop: 27 }}>
            <Rating ratingCount={5} imageSize={52} startingValue={3} />
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              paddingBottom: 22
            }}
            onPress={() => navigate("Notifications")}
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
                Rate Our Service
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

export default FeedBack
