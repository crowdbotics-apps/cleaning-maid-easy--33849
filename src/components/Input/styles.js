import { StyleSheet, Platform } from "react-native"
import { Colors } from "src/theme"

export default StyleSheet.create({
  wrapper: {
    backgroundColor: "#FBFBFD",
    // borderColor: Colors.wildSand,
    borderRadius: 6
    // borderWidth:2
  },

  editWrapper: {
    backgroundColor: "rgba(35, 31, 32, 0.05)",
    borderRadius: 5
    // paddingLeft: 20
  },

  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#FBFBFD",
    borderWidth: 0,
    backgroundColor: "#FBFBFD",
  },
  editInput: {
    flex: 1,
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 0,
    backgroundColor: "transparent"
  },
  iconStyle: {
    fontSize: 40,
    color: "#F4753B"
  },
  text: {
    color: Colors.black,
    // fontFamily: 'Gilroy-ExtraBold',
    ...Platform.select({
      ios: {
        fontWeight: "bold"
      }
    })
  },
  height: {
    height: 45
  },
  transparentInput: {
    backgroundColor: "transparent",
    borderColor: Colors.biscay,
    color: Colors.white,
    marginHorizontal: 0
  },
  transparentInputText: {
    color: Colors.white
  },
  multilineInput: {
    minHeight: 120
  }
})
