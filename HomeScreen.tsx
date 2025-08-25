// HomeScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, useWindowDimensions, Platform } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import QWrapper from './QWrapper';

const products = [
  { id: 1, title: 'Product A', description: 'This is product A' },
  { id: 2, title: 'Product B', description: 'This is product B' },
  { id: 3, title: 'Product C', description: 'This is product C' },
  { id: 4, title: 'Product D', description: 'This is product D' },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;

  // Set breadcrumbs for Home (just "Home")
  useLayoutEffect(() => {
    navigation.setOptions({
      // Breadcrumbs accept any depth; Home is just itself.
      // We also add navigation targets for clickable items.
      // Here only one item so no separators beyond it.
      // Keeping explicit to show the pattern.
      // You can omit this; App.tsx has a sensible fallback.
      // Included for clarity/consistency.
      // @ts-ignore
      params: {
        breadcrumbs: [{ label: 'Home', to: { name: 'Home' } }],
      },
    });
  }, [navigation]);

  return (
    <QWrapper
      title="Ivan's app"
      subtitle="Subheading goes here"
      imageSource={require('./assets/icon.png')}
    >
      <View>
        <Text variant="titleLarge">Welcome!</Text>


        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: isDesktop ? 'space-between' : 'center',
            gap: 16,
            marginTop: 16,
          }}
        >
          {products.map((p) => (
            <Card key={p.id} style={{ width: isDesktop ? '48%' : '100%' }}>
              <Card.Title title={p.title} />
              <Card.Content>
                <Text>{p.description}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => navigation.navigate('Details')}>View</Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </View>
    </QWrapper>
  );
}
