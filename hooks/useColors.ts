import { Colors, DarkColors } from '../constants/colors';
import { useColorScheme } from './use-color-scheme';

export const useColors = () => {
  const colorScheme = useColorScheme();
  
  return colorScheme === 'dark' ? DarkColors : Colors;
};
