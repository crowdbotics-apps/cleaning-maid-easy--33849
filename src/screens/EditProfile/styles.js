import { StyleSheet, Platform } from "react-native"
import { Colors } from "src/theme"

export default StyleSheet.create({
  icon: {
    fontSize: 20,
    color: Colors.brightSun
  },
  login: {
    height: 50,
    width: 118,
    borderRadius: 25,
    backgroundColor: "#F44C28"
  },
  inputStyle: {
    backgroundColor: "rgba(35, 31, 32, 0.05)",
    opacity: 0.5,
    borderRadius: 5,
    paddingLeft: 20,
    flex: 1,
    height: Platform.OS === "ios" ? 40:null,
    color: 'black'
  },
  save: {
    height: 50,
    width: 118,
    borderRadius: 25,
    backgroundColor: "#11DE8A"
  },
  locationIconStyle: {
    backgroundColor: "rgba(35, 31, 32, 0.05)",
    opacity: 0.5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 20
  },
  locationInputStyle: {
    backgroundColor: "rgba(35, 31, 32, 0.05)",
    opacity: 0.5,
    paddingLeft: 20,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "rgba(2, 16, 22, 0.05)",
    height: Platform.OS === "ios" ? 40 : null,
    color: 'black'
  }
})
