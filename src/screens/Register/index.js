import React, {useState} from 'react';
import {Content, Icon, Container} from 'native-base';
import {CheckBox} from 'react-native-elements';
import {View, TouchableOpacity} from 'react-native';

// components
import {Text, Button, Input} from 'src/components';
import {Layout, Fonts, Gutters} from 'src/theme';

// styles
import styles from './styles';

const Register = props => {
  const {
    navigation: {navigate},
  } = props;

  const [checked, setChecked] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const {row, fill, center} = Layout;

  const {
    mediumHPadding,
    largeVMargin,
    mediumVMargin,
    regularLMargin,
    largeTMargin,
    smallVMargin,
  } = Gutters;
  const {titleRegular, textRegular, textMedium} = Fonts;
  const {icon, checkbox} = styles;

  return (
    <Container style={mediumHPadding}>
      <Text
        text="Sign up"
        color="primary"
        style={[titleRegular, largeVMargin]}
        center
        bold
      />
      <View style={[fill]}>
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Email" />
        <Input
          placeholder="Password"
          onPress={() => setPasswordShown(!passwordShown)}
          icon={passwordShown ? 'eye-slash' : 'eye'}
          password
        />
        <Input
          placeholder="Confirm Password"
          onPress={() => setConfirmPasswordShown(!confirmPasswordShown)}
          icon={confirmPasswordShown ? 'eye-slash' : 'eye'}
          password
        />
        <View style={[smallVMargin, center, row]}>
          <CheckBox
            containerStyle={checkbox}
            textStyle={textRegular}
            title="I agree to the Prompt terms and conditions"
            checked={checked}
            checkedColor="black"
            onPress={() => setChecked(!checked)}
          />
        </View>
        <Button text="Sign up" color="primary" block style={largeTMargin} />
        <TouchableOpacity
          style={[row, center, mediumVMargin]}
          onPress={() => navigate('Login')}>
          <Icon type="AntDesign" name="arrowleft" style={icon} />
          <Text
            text="Login"
            color="secondary"
            style={[textMedium, regularLMargin]}
            bold
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Register;
