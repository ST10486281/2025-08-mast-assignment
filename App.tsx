// App.tsx
import React from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

type BreadcrumbItem = {
  label: string;
  to?: { name: string; params?: any }; // optional target to navigate when tapped
};

type BreadcrumbHeaderProps = {
  navigation: any;
  route: any;
};

function BreadcrumbHeader({ route, navigation }: BreadcrumbHeaderProps) {
  // Prefer breadcrumbs set by the screen; fall back to a simple one.
  const crumbs: BreadcrumbItem[] =
    route.params?.breadcrumbs ??
    [
      { label: 'Home', to: { name: 'Home' } },
      ...(route.name !== 'Home' ? [{ label: route.name }] : []),
    ];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('./assets/icon.png')}
        style={{ width: 36, height: 36, resizeMode: 'contain', marginRight: 8 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          const onPress = () => {
            if (c.to) navigation.navigate(c.to.name, c.to.params);
          };
          return (
            <View key={idx} style={{ flexDirection: 'row', alignItems: 'center' }}>
              {idx > 0 && <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{' › '}</Text>}
              {c.to && !isLast ? (
                <Pressable onPress={onPress}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{c.label}</Text>
                </Pressable>
              ) : (
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{c.label}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerTitle: () => <BreadcrumbHeader route={route} navigation={navigation} />,
            headerLeft: () => null, // keep your no-back-arrow choice
            contentStyle: { flex: 1 },
          })}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* keep your existing screen if you still want it */}
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
