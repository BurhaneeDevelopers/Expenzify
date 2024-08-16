import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View } from "react-native";
import { Home3 } from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ----- SCREENS
import HomeScreen from "./Screens/HomeScreen";
import SignInScreen from "./Screens/SigninScreen";

// ----- PROVIDERS
import { ExpenseProvider } from "./context/useExpense";
import { AuthProvider, useAuth } from "./context/useAuth";

const navTheme = DefaultTheme;
navTheme.colors.background = "#f9f9f9";

// TAB BOTTOM NAVIGATOR
const Tab = createBottomTabNavigator();
const StackScreen = () => {
  return <TabNavigator Tab={Tab} />;
};

// STACK NAVIGATOR
const Stack = createStackNavigator();

export const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {(props) => <StackScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="UnAuthenticate"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {(props) => <UnAuthenticatedNavigator {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export const UnAuthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Authenticate"
        component={AuthenticatedNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(false);

  const setUserSignedIn = async () => {
    try {
      const session = await AsyncStorage.getItem("sessionId");
      if (session) {
        setUser(true);
      } else {
        setUser(false);
      }
    } catch (error) {
      console.error("Error checking authentication state:", error);
    }
  };

  useEffect(() => {
    setUserSignedIn();
  }, []);

  if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
  } else {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  // Override Text scaling in input fields
  if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
  } else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }
  return (
    <ContextProviders>
      <NavigationContainer theme={navTheme}>
        <StatusBar
          animated={true}
          backgroundColor="#ff0000"
          // barStyle="dark-content"
        />

        {user ? (
          <AuthenticatedNavigator Stack={Stack} StackScreen={StackScreen} />
        ) : (
          <UnAuthenticatedNavigator Stack={Stack} />
        )}
      </NavigationContainer>
    </ContextProviders>
  );
}

const ContextProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </AuthProvider>
  );
};

const TabNavigator = ({ Tab }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: "#4F46E5",
          // borderTopLeftRadius: 24,
          // borderTopRightRadius: 24,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: { display: "none" },
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({ focused, size }) => {
            return (
              <View className="items-center">
                {focused ? (
                  <>
                    <Home3 size="28" className="text-white" variant="Bold" />
                    <Text
                      className={`text-white
                       text-sm text-center , ${focused ? "font-bold" : ""}`}
                    >
                      Home
                    </Text>
                  </>
                ) : (
                  <>
                    <Home3 size="28" color="#fff" />
                    <Text
                      className={`text-white text-sm text-center , ${
                        focused ? "" : ""
                      }`}
                    >
                      Home
                    </Text>
                  </>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
