import React from 'react'

// components
import { SafeAreaView, Image, Text } from 'react-native'
import {  View } from 'native-base'
import { Images } from "src/theme"


const MainHeader = (props) => {
    const { mainText  } = props
    const { appLogo, backArrow } = Images
  return (
    <SafeAreaView>
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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              marginTop: 14,
              fontSize: 24,
              fontWeight: "700",
              color: "#0C4DA2"
            }}
          >
            {mainText}
          </Text>
        </View>
    </SafeAreaView>
  )
}

export default MainHeader
