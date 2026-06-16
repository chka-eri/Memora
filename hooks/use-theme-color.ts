import { useColorScheme } from '@/hooks/use-color-scheme';
import { COLORS } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof COLORS.light & keyof typeof COLORS.dark,
) {
  const theme = useColorScheme() ?? 'dark';
  const colorFromProps = props[theme];
  if (colorFromProps) return colorFromProps;
  return COLORS[theme][colorName] as string;
}
