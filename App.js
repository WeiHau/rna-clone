import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators, //https://stackoverflow.com/questions/48018666/how-to-change-the-direction-of-the-animation-in-stacknavigator
  createStackNavigator, //https://reactnavigation.org/docs/stack-navigator/
} from "@react-navigation/stack";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//import TempComponent from "./TempComponent";

// pages
import home from "./pages/home";
import anime from "./pages/anime";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          headerMode="none"
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name="Home" component={home} />
          <Stack.Screen name="Anime" component={anime} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
