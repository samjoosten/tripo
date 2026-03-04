import { Canvas, Circle, ImageSVG, LinearGradient, Skia, Text, useFont, vec } from '@shopify/react-native-skia';
import { Image, StyleSheet, View } from 'react-native';

const CANVAS_SIZE = 100;

const GRADIENTS = [
  ['#8ECAE6', '#99AFDA'],
  ['#A5DCEA', '#A5EAEA'],
  ['#AFE4C4', '#D8E4AF'],
  ['#F3E2B7', '#F3C2B7'],
  ['#A4ABE9', '#C8A4E9'],
];

const profileShape = Skia.SVG.MakeFromString(
  `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M37.9149 0.174315C49.9366 1.24613 55.4516 13.7015 58.6881 25.1875C61.3957 34.7964 60.1998 45.2101 52.385 51.5266C42.8962 59.1962 29.9611 63.2181 19.5496 56.8221C6.55812 48.8412 -3.50529 34.4503 1.16052 20.0586C5.87035 5.53108 22.5339 -1.19699 37.9149 0.174315Z" fill="#EAF8FF"/>
  </svg>`
)!;

type Props = {
  name: string;
  avatarUrl?: string | null;
  size?: number;
};

export const ProfileAvatar = ({ name, avatarUrl, size = CANVAS_SIZE }: Props) => {
  const fontSize = size / 3;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-require-imports
  const font = useFont(require('../../../../assets/fonts/ArchitectsDaughter-Regular.ttf'), fontSize);
  const gradient = GRADIENTS[name.length % GRADIENTS.length];

  if (!font) {
    return null;
  }

  if (avatarUrl) {
    return (
      <View style={[styles.imageContainer, { width: size, height: size }]}>
        <Image source={{ uri: avatarUrl }} style={styles.image} resizeMode='cover' />
      </View>
    );
  }

  const textX = size / 2 - font.measureText(name[0]).width / 2;
  const textY = size / 2.1 + font.measureText(name[0]).height / 2;

  return (
    <Canvas style={{ width: size, height: size }}>
      <Circle r={size / 2} cx={size / 2} cy={size / 2}>
        <LinearGradient start={vec(size / 2, 0)} end={vec(size / 2, size)} colors={gradient} />
      </Circle>
      <ImageSVG svg={profileShape} x={size / 5} y={size / 5} width={size * 0.6} height={size * 0.6} />
      <Text x={textX} y={textY} text={name[0].toUpperCase()} font={font} />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
