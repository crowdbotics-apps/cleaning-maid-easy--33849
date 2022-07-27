import React, { useState, useEffect } from "react"

// components
import { Text, Button, Input, MainHeader, Header } from "src/components"
import {
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity
} from "react-native"

import LinearGradient from "react-native-linear-gradient"
import { Dropdown } from "react-native-element-dropdown"

const RequestService = props => {
  const {
    navigation: { navigate, goBack }
  } = props

  const [activeIcon, setActiveIcon] = useState("clock")
  const [activeCalender, setActiveCalender] = useState("calender")
  const [serviceValue, setServiceValue] = useState(false)

  const usStates = [
    {
      name: "Alabama",
      abbreviation: "AL"
    },
    {
      name: "Alaska",
      abbreviation: "AK"
    },
    {
      name: "American Samoa",
      abbreviation: "AS"
    }
  ]

  const stateData = () => {
    return usStates.map(item => {
      return { label: item.name, value: item.name }
    })
  }
  

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          mainText="Request Service "
          onPress={() => {
            goBack()
          }}
        />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{paddingBottom: 10}}
        >
          <View style={{ marginHorizontal: 36 }}>
            <Text style={{fontSize: 12, marginTop: 31 }}>
              Time
            </Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#C4C4C4",
                height: 45
              }}
            >
              <Input
                secureTextEntry={true}
                icon={activeIcon}
                placeholder="00:00 AA"
                onFocus={() => {
                  setActiveIcon("activeClock"), setActiveCalender("calender")
                }}
              />
            </View>
            <Text style={{ fontSize: 12, marginTop: 28 }}>
              Date
            </Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#C4C4C4",
                height: 45
              }}
            >
              <Input
                secureTextEntry={true}
                icon={activeCalender}
                placeholder="mm/dd/yyyy"
                onFocus={() => {
                  setActiveCalender("activeCalender"), setActiveIcon("clock")
                }}
              />
            </View>
            <Text style={{ fontSize: 12, marginTop: 28 }}>
              Service
            </Text>
            <Dropdown
              style={{ borderBottomWidth: 2, borderBottomColor: "#C4C4C4" }}
              iconStyle={{ color: "#438B44" }}
              data={stateData()}
              labelField="label"
              valueField="value"
              placeholder="Select..."
              value={serviceValue}
              onChange={item => {
                setServiceValue(item.value)
              }}
            />
            <Text style={{ fontSize: 12, marginTop: 28 }}>
              Frequency
            </Text>
            <Dropdown
              style={{ borderBottomWidth: 2, borderBottomColor: "#C4C4C4" }}
              iconStyle={{ color: "#438B44" }}
              data={stateData()}
              labelField="label"
              valueField="value"
              placeholder="Select..."
              value={serviceValue}
              onChange={item => {
                setServiceValue(item.value)
              }}
            />
            <Text style={{ fontSize: 12, marginTop: 28 }}>Notes</Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#C4C4C4",
                height: 45
              }}
            >
              <Input
                placeholder="Notes"
                onFocus={() => {
                  setActiveCalender("activeCalender"), setActiveIcon("clock")
                }}
                // multiline={true}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
      </View>
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity style={{ paddingBottom: 22,  justifyContent: "center", alignItems: "center", backgroundColor: 'white', }} onPress={()=> navigate('ServiceDetail')} >
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
              Request Service
            </Text>
          </LinearGradient>
        </TouchableOpacity>
    </>
  )
}

export default RequestService
