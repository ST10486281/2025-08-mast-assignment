// HomeScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { View, useWindowDimensions, Platform } from 'react-native';
import { Button, Text, Card, Dialog, Portal } from 'react-native-paper';
import QWrapper from './QWrapper';

type Product = { id: number; title: string; description: string };

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;

  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'Product A', description: 'This is product A' },
    { id: 2, title: 'Product B', description: 'This is product B' },
    { id: 3, title: 'Product C', description: 'This is product C' },
    { id: 4, title: 'Product D', description: 'This is product D' },
  ]);

  const [selected, setSelected] = useState<Product | null>(null);

  // Set breadcrumbs for Home (just "Home")
  useLayoutEffect(() => {
    navigation.setOptions({
      // @ts-ignore
      params: {
        breadcrumbs: [{ label: 'Home', to: { name: 'Home' } }],
      },
    });
  }, [navigation]);

  const confirmDelete = () => {
    if (selected) {
      setProducts((prev) => prev.filter((p) => p.id !== selected.id));
      setSelected(null);
    }
  };

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
                <Button textColor="red" onPress={() => setSelected(p)}>
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </View>

      {/* Confirmation Dialog */}
      <Portal>
        <Dialog visible={!!selected} onDismiss={() => setSelected(null)}>
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete{' '}
              <Text style={{ fontWeight: 'bold' }}>{selected?.title}</Text>?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSelected(null)}>Cancel</Button>
            <Button textColor="red" onPress={confirmDelete}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </QWrapper>
  );
}
