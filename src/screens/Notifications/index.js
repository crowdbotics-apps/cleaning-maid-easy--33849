import React from "react"

// components
import { Text, Header } from "src/components"
import { SafeAreaView, View, TouchableOpacity, Image } from "react-native"
import Images from "../../theme/Images"

import LinearGradient from "react-native-linear-gradient"
import { Rating } from "react-native-ratings"
import { ScrollView } from "react-native-gesture-handler"

const Notifications = props => {
  const {
    navigation: { navigate, goBack }
  } = props

  let newArray = [1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,,11,1,]

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Header mainText="Notifications" showArrow />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 51 }}>
          {newArray.map(() => (
            <View
              style={{
                paddingLeft: 25,
                flexDirection: "row",
                paddingRight: 59
              }}
            >
              <Image
                source={Images.notificationImage}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25
                }}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={{ marginRight: 8, fontSize: 12, fontWeight: '600', color: '#034EA2' }}>
                  Basic Cleaning service is complete. Would you like to rate
                  this service?
                </Text>
                <Text style={{textAlign: "right", fontSize: 10, color: '#034EA2'}}>2h ago</Text>
              </View>
            </View>
          ))}
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Notifications
