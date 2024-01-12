import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useDispatch} from 'react-redux';
import Home from '../../screens/home';
export type StackNavigationParams = {
  splash: undefined;
  home: undefined;
  grade: undefined;
  word: undefined;
  find: undefined;
  memory: undefined;
  bingo: undefined;
  practice: undefined;
  setting: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
