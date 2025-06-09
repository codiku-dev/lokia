import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "@/pages/home";
import { ROUTES } from "@/lib/routes";
import { Other } from "@/pages/other";
import { SplashScreen } from "@/features/start-app/splashscreen";
import { AppProviders } from "@/providers/app-providers";
import { PermissionHandler } from '@/components/PermissionHandler';

const Stack = createNativeStackNavigator();

require("../../configs/reactotron-config");

export default function App(): React.JSX.Element {
  const [isReady, setIsReady] = useState(false);

  const loadApp = async () => {
    // async stuff here, when it's done the app with start outro animation
  }

  const onAppReady = () => {
    setIsReady(true);
  }

  if (isReady === false) {
    return <SplashScreen
      // If onStartLoading is specified it has to finish to trigger the outro animation
      onStartLoading={loadApp}
      onAnimationEnd={onAppReady}
    />
  }

  return (
    <AppProviders>
      <PermissionHandler />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES.HOME} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ROUTES.HOME} component={Home} />
          <Stack.Screen name={ROUTES.OTHER} component={Other} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProviders>
  );
}
