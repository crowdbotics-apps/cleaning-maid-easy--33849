import React, { useState, useEffect } from "react"

// components
import { Text, Button, Input, Loader } from "src/components"
import { StatusBar, Platform, SafeAreaView, Dimensions } from "react-native"
import { Icon, Container } from "native-base"
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native"
import { Tooltip } from "react-native-elements"
import { connect } from "react-redux"
import { useIsFocused } from "@react-navigation/native"
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu"

// styles
import styles from "./styles"
import { Layout, Fonts, Images, Colors, Gutters } from "src/theme"

//actions
import { profileDataAction } from "../../screenRedux/myProfileRedux"

const ProfileScreen = props => {
  const {
    navigation: { navigate },
    profileData
  } = props

  const [visible, setVisible] = useState(false)
  const [focusField, setFocusField] = useState(false)

  const { width, height } = Dimensions.get("window")

  const { row, fill, center, rowReverse } = Layout
  const {
    mediumHPadding,
    largeVMargin,
    mediumVMargin,
    regularRMargin,
    smallHPadding,
    mediumTMargin,
    small2xTMargin,
    smallTMargin,
    small2xHPadding,
    regularHMargin,
    regularVMargin,
    small2xBMargin,
    smallVPadding,
    small2xLMargin,
    smallVMargin,
    smallBMargin,
    largeTMargin
  } = Gutters
  const { titleRegular, textMedium } = Fonts
  const {
    icon,
    login,
    textStyle,
    subTextStyle,
    profileBox,
    profileUserInfo,
    linkedAeraStyle,
    locationBox,
    boxAera
  } = styles

  const {
    Threedots,
    ImagePBackground,
    ProfileImage,
    LocationImage,
    CouponsImage,
    BookingImage,
    Rectangle,
    MapIcon,
    CircleIcon
  } = Images

  const arrayData = [
    {
      name: "Name:",
      Discription:
        profileData && profileData.name
          ? profileData.name
          : profileData.username
    },
    { name: "Email:", Discription: profileData && profileData.email },
    { name: "Location:", Discription: profileData && profileData.location },
    { name: "Zip Code:", Discription: profileData && profileData.zip_code },
    {
      name: "Phone Number:",
      Discription: profileData && profileData.phone_number
    }
  ]

  const isFocused = useIsFocused()

  const hideMenu = () => {
    setVisible(false)
  }

  useEffect(() => {
    isFocused && !profileData && props.profileDataAction(props.user.id)
  }, [isFocused])

  return (
    <SafeAreaView style={{ backgroundColor: "#FBFBFD", flex: 1 }}>
      <ScrollView
        style={[small2xBMargin, { backgroundColor: "#FBFBFD", flex: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[small2xHPadding, largeTMargin]}>
          <Loader isLoading={props.requesting} />
          <View style={[row, { justifyContent: "space-between" }]}>
            <View></View>
            <Text text="My Profile" style={{ fontSize: 20 }} bold />
            <Menu
              visible={visible}
              anchor={
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => setVisible(true)}
                >
                  <Threedots />
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}
            >
              <MenuItem
                onPress={() => {
                  hideMenu(), navigate("EditProfile")
                }}
              >
                <Text text="Edit Profile" />
              </MenuItem>
            </Menu>
          </View>
          <View style={[center]}>
            <View
              style={{
                height: 132,
                width: 132,
                borderRadius: 61,
                backgroundColor: "#C4C4C4",
                top: 30,
                borderRadius: 100,
                zIndex: 1
              }}
            >
              <Image
                source={
                  profileData && profileData.profile_image !== null
                    ? { uri: profileData.profile_image }
                    : Images.userImage
                }
                style={{ height: 132, width: 132, borderRadius: 100 }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: -30,
                right: 0,
                marginRight: width * 0.2,
                zIndex: 1
              }}
            >
              <CircleIcon />
            </View>
          </View>
          <View style={profileBox}>
            <ImageBackground
              source={Rectangle}
              style={{ height: 102, width: 192 }}
            >
              <Text
                text={
                  profileData && profileData.name
                    ? profileData.name
                    : profileData.username
                }
                style={textStyle}
              />
              {profileData && profileData.location && (
                <View style={[center, { flexDirection: "row" }]}>
                  <MapIcon style={{ marginTop: 11, marginRight: 7 }} />
                  <Text
                    text={` ${profileData && profileData.location}`}
                    style={subTextStyle}
                  />
                </View>
              )}
            </ImageBackground>
          </View>

          <View style={[row, { justifyContent: "space-between" }]}>
            <View style={[center]}>
              <View style={styles.boxShadow}>
                <LocationImage />
              </View>
              <View style={locationBox}>
                <Text
                  text="Visited Places"
                  style={[
                    smallTMargin,
                    { opacity: 0.5, textAlign: "center", marginTop: 30 }
                  ]}
                />
                <Text
                  text="24"
                  style={[smallTMargin, { textAlign: "center" }]}
                  bold
                />
              </View>
            </View>
            <View style={[center]}>
              <View style={styles.boxShadow}>
                <BookingImage />
              </View>
              <View style={locationBox}>
                <Text
                  text="Visited Places"
                  style={[
                    smallTMargin,
                    { opacity: 0.5, textAlign: "center", marginTop: 30 }
                  ]}
                />
                <Text
                  text="24"
                  style={[smallTMargin, { textAlign: "center" }]}
                  bold
                />
              </View>
            </View>
            <View style={[center]}>
              <View style={styles.boxShadow}>
                <CouponsImage />
              </View>
              <View style={locationBox}>
                <Text
                  text="Visited Places"
                  style={[
                    smallTMargin,
                    { opacity: 0.5, textAlign: "center", marginTop: 30 }
                  ]}
                />
                <Text
                  text="24"
                  style={[smallTMargin, { textAlign: "center" }]}
                  bold
                />
              </View>
            </View>
          </View>
          <Text
            text="Personal Information"
            style={{ fontSize: 18, marginTop: 48 }}
            bold
          />
          <View style={[profileUserInfo]}>
            <View style={[regularHMargin, regularVMargin]}>
              {arrayData.map(item => (
                <View style={[row, { justifyContent: "space-between" }]}>
                  <Text
                    text={item.name}
                    style={{ color: "rgba(35, 31, 32, 0.5)", lineHeight: 25 }}
                  />
                  <Text text={item.Discription} bold />
                </View>
              ))}
            </View>
          </View>
          <Text
            text="Linked Account"
            style={{ fontSize: 18, marginTop: 28 }}
            bold
          />
          <View style={[smallHPadding, smallVPadding, linkedAeraStyle]}>
            <View
              style={[smallHPadding, smallVPadding, smallBMargin, row, boxAera]}
            >
              <View style={{ height: 50, width: 50, borderRadius: 25 }}>
                <Image
                  source={Images.userImage}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
              </View>
              <View style={[small2xLMargin]}>
                <Text text="Jessica Jeniffer" style={{ fontSize: 14 }} bold />
                <Text text="Wife" style={{ fontSize: 12, opacity: 0.5 }} />
              </View>
            </View>
            <View
              style={[
                smallHPadding,
                smallVPadding,
                // smallVMargin,
                row,
                boxAera
              ]}
            >
              <View style={{ height: 50, width: 50, borderRadius: 25 }}>
                <Image
                  source={Images.userImage}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
              </View>
              <View style={[small2xLMargin]}>
                <Text text="Jessica Jeniffer" style={{ fontSize: 14 }} bold />
                <Text text="Wife" style={{ fontSize: 12, opacity: 0.5 }} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.login.userDetail,
  profileData: state.myProfileReducer.profileData,
  requesting: state.myProfileReducer.requesting
})

const mapDispatchToProps = dispatch => ({
  profileDataAction: data => dispatch(profileDataAction(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
