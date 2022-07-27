import React from "react"

// components
import { Text } from "src/components"
import { SafeAreaView } from "react-native"
import { View, Image, TouchableOpacity, ImageBackground } from "react-native"

import { Images, } from "src/theme"
import LinearGradient from 'react-native-linear-gradient';

const MainSplashScreen = props => {
  const {
    navigation: { navigate },
    requesting
  } = props

  const {appLogo } = Images


 
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={Images.backgroundImage}
          style={{
            flex: 1,
          }}
        >
          <Image
            source={appLogo}
            style={{
              width: 321,
              height: 118,
              marginTop: 100,
              alignSelf: "center",
              resizeMode: "contain"
            }}
          />
          <View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginTop: 27, fontSize: 12}}>User Type:</Text>
          <TouchableOpacity style={{marginTop: 33}} onPress={()=>navigate('MainLogin')}>    
          <LinearGradient
          colors={['#00B9F1', '#034EA2']}
          style={{height: 50, width: 262, borderRadius: 10,}}
        >
          <Text style={{textAlign: 'center', flex: 1, fontSize: 18, color: '#FFFFFF', lineHeight: 42}}>Client</Text>
          </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 20}}>    
          <LinearGradient
          colors={['#E6DE18', '#438B44']}
          style={{height: 50, width: 262, borderRadius: 10,}}
        >
          <Text style={{textAlign: 'center', flex: 1, fontSize: 18, color: '#FFFFFF', lineHeight: 42}}>Employee</Text>
          </LinearGradient>
          </TouchableOpacity>
          </View>

          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  )
}

export default MainSplashScreen
