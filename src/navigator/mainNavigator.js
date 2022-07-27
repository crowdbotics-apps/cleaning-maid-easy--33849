import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import SplashScreen from "../features/SplashScreen";
import SideMenu from './sideMenu';
//@BlueprintImportInsertion
// import Maps117690Navigator from '../features/Maps117690/navigator';
// import Add-Item117689Navigator from '../features/Add-Item117689/navigator';
// import Maps117685Navigator from '../features/Maps117685/navigator';
// import UserProfile117681Navigator from '../features/UserProfile117681/navigator';
// import Maps116478Navigator from '../features/Maps116478/navigator';
// import Add-Item116477Navigator from '../features/Add-Item116477/navigator';
// import Maps116473Navigator from '../features/Maps116473/navigator';
// import UserProfile116469Navigator from '../features/UserProfile116469/navigator';
// import Maps116429Navigator from '../features/Maps116429/navigator';
// import Add-Item116428Navigator from '../features/Add-Item116428/navigator';
// import Maps116424Navigator from '../features/Maps116424/navigator';
// import UserProfile116420Navigator from '../features/UserProfile116420/navigator';

/**
 * new navigators can be imported here
 */

const AppNavigator = {

    //@BlueprintNavigationInsertion
// Maps117690: { screen: Maps117690Navigator },
// Add-Item117689: { screen: Add-Item117689Navigator },
// Maps117685: { screen: Maps117685Navigator },
// UserProfile117681: { screen: UserProfile117681Navigator },
// Maps116478: { screen: Maps116478Navigator },
// Add-Item116477: { screen: Add-Item116477Navigator },
// Maps116473: { screen: Maps116473Navigator },
// UserProfile116469: { screen: UserProfile116469Navigator },
// Maps116429: { screen: Maps116429Navigator },
// Add-Item116428: { screen: Add-Item116428Navigator },
// Maps116424: { screen: Maps116424Navigator },
// UserProfile116420: { screen: UserProfile116420Navigator },

    /** new navigators can be added here */
    SplashScreen: {
      screen: SplashScreen
    }
};

const DrawerAppNavigator = createDrawerNavigator(
  {
    ...AppNavigator,
  },
  {
    contentComponent: SideMenu
  },
);

const AppContainer = createAppContainer(DrawerAppNavigator);

export default AppContainer;
