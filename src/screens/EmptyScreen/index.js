import React, { useState } from "react"

// components
import { Text } from "src/components"
import { SafeAreaView, View } from "react-native"
import { Layout, Fonts, Images, Colors, Gutters } from "src/theme"


const EmptyScreen = props => {
  const {
    navigation: { navigate },
  } = props

  const { row, fill, center, rowReverse } = Layout
  
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[center, {flex: 1}]}>
        <Text text="Coming Soon" style={{fontSize: 40}} bold />
        </View>
       
      </SafeAreaView>
    </>
  )
}

export default EmptyScreen
