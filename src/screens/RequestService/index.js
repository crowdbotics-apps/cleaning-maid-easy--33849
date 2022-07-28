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
  TouchableOpacity,
  Image,
  Modal
} from "react-native"

import LinearGradient from "react-native-linear-gradient"
import { Dropdown } from "react-native-element-dropdown"
import {
  Datepicker,
  NativeDateService,
  withStyles
} from "@ui-kitten/components"
import DatePicker from "react-native-date-picker"
import Images from "../../theme/Images"

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

  const dateService = new NativeDateService("en", { format: "MM/DD/YYYY" })

  const openTimeModal = () => {
    ;<DatePicker
      mode="date"
      date={new Date()}
      // onDateChange={setBirthdayData}
      maximumDate={new Date()}
      style={{ backgroundColor: "white" }}
    />
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
            contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ marginHorizontal: 36 }}>
            <Text style={{ fontSize: 12, marginTop: 31, opacity: 0.4 }}>
              Time
            </Text>
            <TouchableOpacity
              onPress={() => {
                setActiveIcon("activeClock"), setActiveCalender("calender")
              }}
              style={{
                width: "100%",
                borderBottomWidth: 2,
                borderBottomColor: "#C4C4C4",
                height: 36,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 6
              }}
            >
              <Text style={{ paddingTop: 6, fontSize: 14, opacity: 0.5 }}>00:00 AA</Text>
              <Image
                source={
                  activeIcon === "clock" ? Images.clockIcon : Images.activeClock
                }
                style={{
                  width: 27,
                  height: 27
                }}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 12, marginTop: 28, opacity: 0.4 }}>
              Date
            </Text>
            <TouchableOpacity
              onPress={() => {
                setActiveCalender("activeCalender"), setActiveIcon("clock")
              }}
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "#C4C4C4",
                height: 36,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 6
              }}
            >
              <Text style={{ paddingTop: 6, fontSize: 14, opacity: 0.5 }}>mm/dd/yyyy</Text>
              <Image
                source={
                  activeCalender === "calender"
                    ? Images.calender
                    : Images.activeCalender
                }
                style={{
                  width: 27,
                  height: 27
                }}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 12, marginTop: 28, opacity: 0.4 }}>
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
              placeholderStyle={{opacity: 0.5}}
              onChange={item => {
                setServiceValue(item.value)
              }}
            />
            <Text style={{ fontSize: 12, marginTop: 28, opacity: 0.4 }}>
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
              placeholderStyle={{opacity: 0.5}}
              onChange={item => {
                setServiceValue(item.value)
              }}
            />
            <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 20 }}>Notes</Text>
          <TextInput
            style={{width: "100%",
            borderBottomColor: "#C4C4C4",
            paddingBottom: 0,
            borderBottomWidth: 1,
            color: "black"}}
            placeholder="Notes"
            placeholderTextColor='#C4C4C4'
          />
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center" }}
          ></View>
          <View style={{flex: 1, justifyContent: 'flex-end', paddingTop: 100}}>
          <TouchableOpacity
            style={{
              paddingBottom: 22,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white"
            }}
            onPress={() => navigate("ServiceDetail")}
          >
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
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* <Modal visible={true} style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              <DatePicker
                mode="date"
                date={new Date()}
                // onDateChange={setBirthdayData}
                maximumDate={new Date()}
                style={{backgroundColor: 'white'}}
              />
            </View>
          </Modal> */}
    </>
  )
}

export default RequestService
