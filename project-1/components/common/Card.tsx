import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ViewStyle, 
  StyleProp 
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface CardProps {
  title: string;
  description: string;
  image: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  imageHeight?: number;
}

export default function Card({
  title,
  description,
  image,
  onPress,
  style,
  imageHeight = 160,
}: CardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.colors.card, shadowColor: theme.dark ? '#000' : '#222' },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: image }} 
        style={[styles.image, { height: imageHeight }]} 
        resizeMode="cover" 
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
        <Text 
          style={[styles.description, { color: theme.colors.textSecondary }]}
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
});