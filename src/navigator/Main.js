import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

import { ProfileScreen, EditProfile, EmptyScreen } from "src/screens"
import { createStackNavigator } from '@react-navigation/stack';

import { Images } from "src/theme"
const { EmailIcon, HomeImage, DocumentImage, ProfilePic, Message, FocusDocument, FocusProfile, FocusEmail, UnfocusProfile, FocusHome } = Images

const mainStack = createStackNavigator();

// @refresh reset
const BottomNavigator = props => {
  const {
    route: { state }
  } = props

  return (
    <Tab.Navigator initialRouteName="EmptyScreen" screenOptions={
      {
        tabBarStyle:  { paddingBottom:15}
      } }>
      <Tab.Screen
        name="EmptyScreen1"
        component={EmptyScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => focused ? <FocusHome/> : <HomeImage style={{opacity: 0.5}} />,
          header: ()=> null
        }}
      />

      <Tab.Screen
        name="EmptyScreen2"
        component={EmptyScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => focused ? <FocusEmail/> : <Message style={{opacity: 0.5}} />,
          header: ()=> null
        }}
      />

      <Tab.Screen
        name="EmptyScreen3"
        component={EmptyScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => focused ? <FocusDocument/> : <DocumentImage />,
          header: ()=> null
        }}
      />

      <Tab.Screen
        name="profileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => focused ? <FocusProfile/> : <UnfocusProfile />,
          header: ()=> null
        }}
      />
    </Tab.Navigator>
  )
}

const MainNavigator = () => (
  <mainStack.Navigator
    screenOptions={{ headerShown: false, animationEnabled: false }}
    initialRouteName="BottomBar"
  >
    <mainStack.Screen name="BottomBar" component={BottomNavigator} />
    <mainStack.Screen name="EditProfile" component={EditProfile} />
  </mainStack.Navigator>
);

export default MainNavigator
