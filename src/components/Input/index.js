import React from 'react';

// components
import {Input as UIKInput} from '@ui-kitten/components';
import {View, TouchableOpacity} from 'react-native';
import Error from 'src/components/ErrorBox';
import {Icon} from 'native-base';

// styles
import {Layout, Gutters, Colors} from 'src/theme';
import Styles from './styles';
import Images from '../../theme/Images';


const Input = ({
  value,
  onChangeText,
  placeholder,
  password,
  keyboardType = 'default',
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
  } = Styles;
  const {row, alignItemsCenter} = Layout;
  const {regularRMargin} = Gutters;
  return (
    <>
      <View style={[row, alignItemsCenter, editProfile ? editWrapper : wrapper]}>
      {showIcon && <PlaceholderImages/>}
        <UIKInput
          value={value}
          secureTextEntry={password && icon==='eye' }
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#231F2050'}
          size="small"
          style={[
            editProfile ? editInput : input,
            !multiline && height,
            style,
            transparent && transparentInput,
          ]}
          keyboardType={keyboardType}
          textStyle={[
            text,
            !multiline && height,
            transparent && transparentInputText,
            multiline && multilineInput,
          ]}
          autoCapitalize="none"
          autoFocus={autoFocus}
          maxLength={maxLength}
          onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
          returnKeyType={returnKeyType}
          multiline={multiline}
          onFocus={onFocus}
        />
        { icon && (
          <TouchableOpacity onPress={onPress} style={regularRMargin}>
          {
            icon==='eye' ?  <Images.HideIcon/> :   <Images.EyeIcon/>
          }
          
            {/* <Icon type="FontAwesome" name={icon} style={iconStyle} /> */}
          </TouchableOpacity>
         )}
         {/* { location && </Images.EyeIcon>} */}
      </View>
      <Error errors={error} />
    </>
  );
};

export default Input;
