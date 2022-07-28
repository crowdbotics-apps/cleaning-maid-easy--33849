import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
// import BottomTabNavigator from '@/Navigators/Main'

// screens
import {MainSplashScreen, Register, ForgotPassword, ProfileScreen, EditProfile,MainLogin, SignUp, ResetPassword, RequestService, ServiceDetail, MyProfile, FeedBack, Notifications, EmployeeServiceDetails} from 'src/screens';

const authStack = createStackNavigator();

const AuthStackScreen = () => (
  <authStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="EmployeeServiceDetails"
  >
    <authStack.Screen name="MainSplashScreen" component={MainSplashScreen} />
    <authStack.Screen name="Register" component={Register} />
    <authStack.Screen
      name="EmployeeServiceDetails"
      component={EmployeeServiceDetails}
    />

    <authStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <authStack.Screen name="ProfileScreen" component={ProfileScreen} />
    <authStack.Screen name="EditProfile" component={EditProfile} />
    <authStack.Screen name="MainLogin" component={MainLogin} />
    <authStack.Screen name="SignUp" component={SignUp} />
    <authStack.Screen name="ResetPassword" component={ResetPassword} />
    <authStack.Screen name="RequestService" component={RequestService} />
    <authStack.Screen name="ServiceDetail" component={ServiceDetail} />
    <authStack.Screen name="MyProfile" component={MyProfile} />
    <authStack.Screen name="FeedBack" component={FeedBack} />
    <authStack.Screen name="Notifications" component={Notifications} />

    

  







  </authStack.Navigator>
)

export default AuthStackScreen
