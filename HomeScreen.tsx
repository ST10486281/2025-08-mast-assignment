// HomeScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { View, useWindowDimensions, Platform } from 'react-native';
import { Button, Text, Card, Dialog, Portal, TextInput } from 'react-native-paper';
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

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      // @ts-ignore
      params: { breadcrumbs: [{ label: 'Home', to: { name: 'Home' } }] },
    });
  }, [navigation]);

  const confirmDelete = () => {
    if (deleteTarget) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const openEdit = (p: Product) => {
    setEditTarget(p);
    setEditTitle(p.title);
    setEditDesc(p.description);
  };

  const confirmEdit = () => {
    if (editTarget) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editTarget.id ? { ...p, title: editTitle, description: editDesc } : p
        )
      );
      setEditTarget(null);
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
                <Button onPress={() => openEdit(p)}>Edit</Button>
                <Button textColor="red" onPress={() => setDeleteTarget(p)}>
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </View>

      {/* Delete Dialog */}
      <Portal>
        <Dialog
          visible={!!deleteTarget}
          onDismiss={() => setDeleteTarget(null)}
          style={{ backgroundColor: 'white' }}   // 👈 plain white bg
        >
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete{' '}
              <Text style={{ fontWeight: 'bold' }}>{deleteTarget?.title}</Text>?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteTarget(null)}>Cancel</Button>
            <Button textColor="red" onPress={confirmDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={!!editTarget}
          onDismiss={() => setEditTarget(null)}
          style={{ backgroundColor: 'white' }}   // 👈 plain white bg
        >
          <Dialog.Title>Edit Product</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={editTitle}
              onChangeText={setEditTitle}
              style={{ marginBottom: 12 }}
            />
            <TextInput
              label="Description"
              value={editDesc}
              onChangeText={setEditDesc}
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditTarget(null)}>Cancel</Button>
            <Button onPress={confirmEdit}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </QWrapper>
  );
}
