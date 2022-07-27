import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { connect } from "react-redux"
import { navigationRef } from "./NavigationService"

import AuthStackScreen from "./AuthScreens"
import MainNavigator from "./Main"

const authStack = createStackNavigator()
const mainStack = createStackNavigator()
const Drawer = createDrawerNavigator()

const RootNavigationStack = props => {
  return (
    <NavigationContainer ref={navigationRef}>
      <authStack.Navigator screenOptions={{ headerShown: false }}>
        {props.accessToken ? (
          <authStack.Screen name="MainStack" component={MainNavigator} />
        ) : (
          <mainStack.Screen name="AuthStack" component={AuthStackScreen} />
        )}
      </authStack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = state => ({
  accessToken: state.login.accessToken
})

export default connect(mapStateToProps, null)(RootNavigationStack)
