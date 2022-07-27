import { StyleSheet, Dimensions } from "react-native"
import { Colors } from "src/theme"
const { width, height } = Dimensions.get("window")

export default StyleSheet.create({
  icon: {
    fontSize: 20,
    color: Colors.brightSun
  },
  login: {
    height: 48,
    width: 198,
    borderRadius: 26,
    backgroundColor: "#F4753B"
  },
  boxShadow: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    // borderColor: "rgba(0, 0, 0, 0.07)",

    shadowColor:"rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  locationBox: {
    height: 85,
    borderRadius: 10,
    width: 104,
    backgroundColor: "#fff",
    marginTop: 100,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2
  },
  profileInfo: {
    height: height / 5,
    width: "100%",
    borderRadius: 15,
    backgroundColor: "red"
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
    color: "#231F20",
    textAlign: "center",
    marginTop: 45
  },
  subTextStyle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 25,
    color: "#231F20",
    textAlign: "center",
    marginTop: 11,
    opacity: 0.5
  },
  profileBox: {
    width: "100%",
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  profileUserInfo: {
    height: 144,
    borderColor: "rgba(0, 0, 0, 0.07)",
    marginTop: 21,
    borderWidth: 1,
    borderRadius: 10
  },
  linkedAeraStyle: {
    marginTop: 18,
    // borderWidth: 2,
    // borderColor: "rgba(0, 0, 0, 0.03)",
    height: 235,
    borderRadius: 10,
    backgroundColor: "#fff",
    // shadowColor: "rgba(0, 0, 0, 0.1)",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5
  },
  boxAera: {
    height: 70,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,
  }
})
