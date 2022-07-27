import React from "react"
import { Text, View, ImageBackground, Image } from "react-native"
// components
import { Layout, Images } from "src/theme"

const {splashScreen} = Images

const SplashScreen = () => {
  const { fill, center } = Layout
  return ( 
    <ImageBackground
    source={splashScreen}
    style={{
      flex: 1,
      justifyContent: "center",
      resizeMode: "cover",
      height: "100%",
      width: "100%",
    }}
  />
  )
}
export default SplashScreen
