import { Canvas, Circle, ImageSVG, LinearGradient, Skia, Text, useFont, vec } from '@shopify/react-native-skia';

import { sv } from 'shared/lib/theme';

const CANVAS_SIZE = 100;
const PROFILE_SHAPE_SIZE = 60;

const GRADIENTS = [['#8ECAE6', '#99AFDA']];

const profileShape = Skia.SVG.MakeFromString(
  `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M37.9149 0.174315C49.9366 1.24613 55.4516 13.7015 58.6881 25.1875C61.3957 34.7964 60.1998 45.2101 52.385 51.5266C42.8962 59.1962 29.9611 63.2181 19.5496 56.8221C6.55812 48.8412 -3.50529 34.4503 1.16052 20.0586C5.87035 5.53108 22.5339 -1.19699 37.9149 0.174315Z" fill="#EAF8FF"/>
  </svg>`
)!;

type Props = {
  name: string;
};

const ProfileAvatar = ({ name }: Props) => {
  const fontSize = sv('text.lg');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-require-imports
  const font = useFont(require('../../../../assets/fonts/ArchitectsDaughter-Regular.ttf'), fontSize);

  if (!font) {
    return null;
  }

  const textX = CANVAS_SIZE / 2 - font.measureText(name[0]).width / 2;
  const textY = CANVAS_SIZE / 2 + font.measureText(name[0]).height / 2;

  return (
    <Canvas style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
      <Circle r={CANVAS_SIZE / 2} cx={CANVAS_SIZE / 2} cy={CANVAS_SIZE / 2}>
        <LinearGradient start={vec(CANVAS_SIZE / 2, 0)} end={vec(CANVAS_SIZE / 2, CANVAS_SIZE)} colors={GRADIENTS[0]} />
      </Circle>
      <ImageSVG svg={profileShape} x={20} y={20} width={PROFILE_SHAPE_SIZE} height={PROFILE_SHAPE_SIZE} />
      <Text x={textX} y={textY} text={name[0]} font={font} />
    </Canvas>
  );
};

export default ProfileAvatar;
