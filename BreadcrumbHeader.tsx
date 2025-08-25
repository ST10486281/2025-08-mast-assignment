import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

type BreadcrumbItem = {
  label: string;
  to?: { name: string; params?: any };
};

type Props = {
  navigation: any;
  route: any;
};

export default function BreadcrumbHeader({ route, navigation }: Props) {
  const crumbs: BreadcrumbItem[] =
    route.params?.breadcrumbs ?? [
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
