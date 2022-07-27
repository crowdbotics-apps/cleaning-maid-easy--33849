import React from "react"

// components
import { Input as UIKInput } from "@ui-kitten/components"
import { View, TouchableOpacity, Image, TextInput} from "react-native"
import Error from "src/components/ErrorBox"
import { Icon } from "native-base"

// styles
import { Layout, Gutters, Colors } from "src/theme"
import Styles from "./styles"
import Images from "../../theme/Images"

const Input = ({
  value,
  onChangeText,
  placeholder,
  password,
  keyboardType = "default",
  onSubmitEditing,
  returnKeyType,
  maxLength,
  style,
  error,
  transparent,
  autoFocus,
  multiline,
  onPress,
  icon,
  PlaceholderImages,
  onFocus,
  showIcon,
  editProfile
}) => {
  const {
    wrapper,
    input,
    text,
    height,
    iconStyle,
    transparentInput,
    transparentInputText,
    multilineInput,
    editWrapper,
    editInput
  } = Styles
  const { row, alignItemsCenter } = Layout
  const { regularRMargin } = Gutters
  return (
    <>
      <View
        style={[row, alignItemsCenter, editProfile ? editWrapper : wrapper]}
      >
        {showIcon && <PlaceholderImages />}
        <TextInput
          value={value}
          // secureTextEntry={password && icon==='eye' }
          icon="icon"
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={"#231F2050"}
          size="small"
          style={[
            editProfile ? editInput : input,
            !multiline && height,
            style,
            transparent && transparentInput,
            {
              width: "100%",
              color: "black",
              backgroundColor: "white",
              paddingBottom: 0,
              textAlignVertical: 'bottom'

            }
          ]}
          keyboardType={keyboardType}
          textStyle={[
            text,
            !multiline && height,
            transparent && transparentInputText,
            multiline && multilineInput
          ]}
          autoCapitalize="none"
          autoFocus={autoFocus}
          maxLength={maxLength}
          onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
          returnKeyType={returnKeyType}
          multiline={multiline}
          onFocus={onFocus}
        />
        {icon && (
          <TouchableOpacity onPress={onPress} style={[regularRMargin]}>
            {icon === "clock" ? (
              <View style={{marginTop: 15}}>
                <Image
                  source={Images.clockIcon}
                  style={{
                    width: 27,
                    height: 27,
                    alignSelf: "center",
                    resizeMode: "contain",
                    borderWidth: 1
                  }}
                />
                </View>
            ) : icon === "activeClock" ? (
              <View style={{marginTop: 15}}>
                <Image
                  source={Images.activeClock}
                  style={{
                    width: 27,
                    height: 27,
                    alignSelf: "center",
                    resizeMode: "contain"
                  }}
                />
                </View>
            ) : icon === "calender" ? (
              <View style={{marginTop: 15}}>
                <Image
                  source={Images.calender}
                  style={{
                    width: 27,
                    height: 27,
                    alignSelf: "center",
                    resizeMode: "contain"
                  }}
                />
                </View>
            ) : icon === "activeCalender" ? (
              <View style={{marginTop: 15}}>
                <Image
                  source={Images.activeCalender}
                  style={{
                    width: 27,
                    height: 27,
                    alignSelf: "center",
                    resizeMode: "contain"
                  }}
                />
                </View>
            ) : null}

            {/* <Icon type="FontAwesome" name={icon} style={iconStyle} /> */}
          </TouchableOpacity>
        )}
        {/* { location && </Images.EyeIcon>} */}
      </View>
      <Error errors={error} />
    </>
  )
}

export default Input
