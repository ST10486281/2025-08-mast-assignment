import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, IconButton, Portal, Modal } from 'react-native-paper';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import BreadcrumbHeader from './BreadcrumbHeader';
import DrawerMenuContent from './DrawerMenuContent';

const Stack = createNativeStackNavigator();

export default function App() {
  const navRef = useRef<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [active, setActive] = useState('home');

  return (
    <PaperProvider>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerTitle: () => <BreadcrumbHeader route={route} navigation={navigation} />,
            headerLeft: () => null,
            headerRight: () => (
              <IconButton icon="menu" onPress={() => setMenuVisible(true)} />
            ),
            contentStyle: { flex: 1 },
          })}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>

        {/* Drawer Menu */}
        <Portal>
          <Modal
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            contentContainerStyle={{
              backgroundColor: 'white',
              width: 300,
              height: '100%',
              alignSelf: 'flex-start',
              paddingTop: 24,
              justifyContent: 'flex-start',
              margin: 0,
            }}
          >
            <DrawerMenuContent
              active={active}
              setActive={setActive}
              onClose={() => setMenuVisible(false)}
              navigate={(name) => navRef.current?.navigate(name)}
            />
          </Modal>
        </Portal>
      </NavigationContainer>
    </PaperProvider>
  );
}
