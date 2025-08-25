import React, { ReactNode } from 'react';
import { ImageBackground, Platform, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';

type QWrapperProps = {
  title: string;
  subtitle?: string;
  imageSource?: any;     // require(...) or { uri }
  children: ReactNode;
  heroHeight?: number;
  maxWidth?: number;     // desktop container width cap
  contentPadding?: number;
  overlayOpacity?: number;
};

export default function QWrapper({
  title,
  subtitle,
  imageSource,
  children,
  heroHeight,
  maxWidth = 1200,
  contentPadding = 20,
  overlayOpacity = 0.3,
}: QWrapperProps) {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;
  const height = heroHeight ?? (isDesktop ? 320 : 200);

  const HeroInner = (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      {/* centered container with max width */}
      <View
        style={{
          alignSelf: 'center',
          width: '100%',
          maxWidth,
          paddingHorizontal: contentPadding,
          paddingBottom: 20,
        }}
      >
        <Text
          variant={isDesktop ? 'headlineMedium' : 'titleLarge'}
          style={{ fontWeight: '700', color: 'white' }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text variant="titleSmall" style={{ color: 'white', marginTop: 4 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* HERO (full-bleed) */}
      {imageSource ? (
        <ImageBackground source={imageSource} resizeMode="cover" style={{ width: '100%', height }}>
          <View style={{ flex: 1, backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}>
            {HeroInner}
          </View>
        </ImageBackground>
      ) : (
        <View style={{ width: '100%', height, backgroundColor: '#ccc' }}>{HeroInner}</View>
      )}

      {/* PAGE BODY (centered, max width) */}
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: '100%',
            maxWidth,
            paddingHorizontal: contentPadding,
            paddingVertical: 24,
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
}
