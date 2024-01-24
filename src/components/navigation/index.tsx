import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useDispatch} from 'react-redux';
import Home from '../../screens/home';
import Splash from '../../screens/splash';
import PrePrimary from '../../screens/preprimary';
import Question from '../../screens/question';
import Setting from '../../screens/setting';
export type StackNavigationParams = {
  splash: undefined;
  home: undefined;
  preprimary: undefined;
  question: undefined;
  setting: {
    page: string;
  };
};
const Navigation = () => {
  const dispatch = useDispatch();
  const Stack = createStackNavigator<StackNavigationParams>();
  return (
    <NavigationContainer
      onStateChange={state => {
        const name = state?.routes[state.index].name;
        dispatch({
          type: 'sightCards/setPageChange',
          payload: name,
        });
      }}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="splash">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="preprimary" component={PrePrimary} />
        <Stack.Screen name="question" component={Question} />
        <Stack.Screen name="setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
