import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, TextInput, Button, Avatar, Card } from 'react-native-paper';
import QWrapper from './QWrapper'; // <-- use the wrapper we made

export default function HelloScreen() {
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <QWrapper
        title="Details Page"
        subtitle="Welcome to my app…"
        imageSource={require('./assets/icon.png')} // or remove to use solid bg
        // heroHeight={220} // optional
      >
        <View style={{ alignItems: 'center', gap: 12 }}>
          <Card mode="elevated" style={{ padding: 16 }}>
              <View style={{ alignItems: 'center', gap: 12 }}>
                <Avatar.Image size={84} source={require('./assets/icon.png')} />
                <Text variant="headlineSmall">Hello</Text>
                <Text>Welcome to my app…</Text>

                <Text variant="titleSmall">{name ? `You typed: ${name}` : ''}</Text>

                <TextInput
                  mode="outlined"
                  label="Enter your name"
                  value={name}
                  onChangeText={setName}
                  style={{ width: '100%' }}
                />

                <Button mode="contained" onPress={() => alert(`Hello, ${name || 'there'}`)}>
                  Say Hello
                </Button>
              </View>
            </Card>
        </View>
      </QWrapper>
    </SafeAreaView>
  );
}



