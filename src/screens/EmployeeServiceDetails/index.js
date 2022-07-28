import React, { useState, useEffect } from "react"

// components
import { Text, Button, Input, MainHeader, Header } from "src/components"
import {
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image
} from "react-native"
import Images from "../../theme/Images"

import LinearGradient from "react-native-linear-gradient"
import { Dropdown } from "react-native-element-dropdown"

const EmployeeServiceDetails = props => {
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
        <ScrollView style={{ flex: 1 }}>
          <Header
            mainText="Service Details"
            onPress={() => {
              goBack()
            }}
          />

          <View style={styles.checkButton}>
            <Image
              source={Images.checkInIcon}
              style={{ width: 30, height: 30, marginLeft: 10, marginRight: 40 }}
            />

            <Text style={{ fontSize: 14, marginVertical: 7 }}>CHECK IN</Text>
          </View>

          <View style={styles.checkButton}>
            <Image
              source={Images.checkOutIcon}
              style={{ width: 30, height: 30, marginLeft: 10, marginRight: 40 }}
            />

            <Text style={{ fontSize: 14, marginVertical: 7 }}>CHECK OUT</Text>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 27 }}>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#d3d3d3",
                paddingBottom: 10
              }}
            >
              <Image
                source={Images.calender}
                style={{
                  width: 18,
                  height: 18
                }}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={{ marginLeft: 22, fontSize: 14 }}>
                  09 September 2021
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 21,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#d3d3d3",
                paddingBottom: 10
              }}
            >
              <Image
                source={Images.clockIcon}
                style={{
                  width: 18,
                  height: 18
                }}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={{ marginLeft: 22, fontSize: 14 }}>
                  09:00AM - 11:30AM
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 21,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#d3d3d3",
                paddingBottom: 10
              }}
            >
              <Image
                source={Images.mapIcon}
                style={{
                  width: 18,
                  height: 18
                }}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={{ marginLeft: 22, fontSize: 14 }}>
                  9400 Ninove Street, SA
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 32,
              marginHorizontal: 20
            }}
          >
            <View>
              <Text style={{ fontSize: 14, color: "grey", fontWeight: "500" }}>
                Client Name
              </Text>

              <Text style={{ fontSize: 14, color: "#000", marginTop: 15 }}>
                Rosemary Byrd
              </Text>
            </View>

            <View style={{ marginLeft: 70 }}>
              <Text style={{ fontSize: 14, color: "grey", fontWeight: "500" }}>
                Number
              </Text>

              <Text style={{ fontSize: 14, color: "#000", marginTop: 15 }}>
                (704) 555-0127
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 32,
              marginHorizontal: 20
            }}
          >
            <View>
              <Text style={{ fontSize: 14, color: "grey", fontWeight: "500" }}>
                Assigned Employee/ Team
              </Text>

              <Text style={{ fontSize: 14, color: "#000", marginTop: 15 }}>
                Basic Cleaning Team
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 32,
              marginHorizontal: 20
            }}
          >
            <View>
              <Text style={{ fontSize: 14, color: "grey", fontWeight: "500" }}>
                Services
              </Text>

              <Text style={{ fontSize: 14, color: "#000", marginTop: 15 }}>
                Basic Cleaning
              </Text>
            </View>

            <View style={{ marginLeft: 70 }}>
              <Text style={{ fontSize: 14, color: "grey", fontWeight: "500" }}>
                Frequency
              </Text>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={Images.elipsIcon}
                  style={{
                    width: 18,
                    height: 18,
                    marginTop: 16,
                    marginRight: 10,
                    marginLeft: 5
                  }}
                />
                <Text style={{ fontSize: 14, color: "#000", marginTop: 15 }}>
                  4 weeks/ monthly
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 28, marginHorizontal: 20 }}>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "grey" }}>
              Description
            </Text>

            <TextInput style={styles.input} />
          </View>

          <View style={{ marginTop: 5, marginHorizontal: 20 }}>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "grey" }}>
              Notes
            </Text>

            <TextInput style={[styles.input, { marginBottom: 30 }]} />
          </View>
          <TouchableOpacity
            style={{
              marginBottom:22,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              marginHorizontal: 80
            }}
            onPress={() => navigate("ServiceDetail")}
          >
            <LinearGradient
              colors={["#00B9F1", "#034EA2"]}
              style={{ height: 42, borderRadius: 10 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "#FFFFFF",
                  lineHeight: 42,
                  marginHorizontal: 50
                }}
              >
                Upload Image
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  checkButton: {
    marginHorizontal: 100,
    height: 36,
    backgroundColor: "#fff",
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 5
  },
  input: {
    height: 101,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 0
    },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
    borderRadius: 5
  }
})

export default EmployeeServiceDetails
