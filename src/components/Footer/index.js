import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Footer as NBFooter, FooterTab, Icon } from 'native-base';

// components
import { Text } from 'src/components';
import { Global } from 'src/theme';

// styles
import styles from './styles';

const routes = [
  {
    icon: 'caret-left',
    text: 'BACK',
    iconType: 'FontAwesome'
  },
  {
    icon: 'format-list-bulleted',
    text: 'DASHBOARD',
    iconType: 'MaterialIcons'
  },
  {
    icon: 'home',
    iconType: 'MaterialIcons'
  },
  {
    icon: 'tune',
    text: 'PREF',
    iconType: 'MaterialIcons'
  },
  {
    icon: 'caret-right',
    text: 'FORWARD',
    iconType: 'FontAwesome'
  },
];

const Footer = () => {
  const { footer, touch, icon } = styles;
  const { galleryBg, borderT, borderDustyGray } = Global

  return (
    <NBFooter>
      <FooterTab style={[footer, galleryBg, borderT, borderDustyGray]}>
        {routes.map((screen, i) => (
          <TouchableOpacity
            key={i}
            style={touch}
          >
            <Icon
              type={screen.iconType}
              name={screen.icon}
              style={icon}
            />
            <Text
              text={screen.text}
              color="tertiary"
              small
            />
          </TouchableOpacity>
        ))}
      </FooterTab>
    </NBFooter>
  );
};

export default Footer;
