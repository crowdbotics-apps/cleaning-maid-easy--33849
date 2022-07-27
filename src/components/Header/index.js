import React from 'react'

// components
import { SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import {  View } from 'native-base'
import { Images } from "src/theme"


const Header = (props) => {
    const { mainText , navigation, onPress } = props
    const { mainBackArrow } = Images
  return (
    <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16}}>
          <TouchableOpacity style={{justifyContent: 'center'}}  onPress={onPress}>
        <Image
          source={mainBackArrow}
          style={{
            width: 9,
            height: 18,
            alignSelf: "center",
            resizeMode: "contain",
          }}
        />
        </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              color: "#000000",
            }}
          >
            {mainText}
          </Text>
          <View></View>
        </View>
    </SafeAreaView>
  )
}

export default Header
