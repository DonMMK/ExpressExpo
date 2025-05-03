import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle, 
  StyleProp 
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  icon,
}: ButtonProps) {
  const { theme } = useTheme();

  // Define variant styles
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderColor: 'transparent',
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          borderColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: colors.error,
          borderColor: 'transparent',
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: 'transparent',
        };
    }
  };

  // Define text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return theme.colors.primary;
      case 'primary':
      case 'secondary':
      case 'danger':
        return colors.white;
      default:
        return colors.white;
    }
  };

  // Define size styles
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 6,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 10,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
        };
    }
  };

  // Define text size based on button size
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return { fontSize: 14 };
      case 'large':
        return { fontSize: 18 };
      case 'medium':
      default:
        return { fontSize: 16 };
    }
  };

  const buttonStyles = [
    styles.button,
    getSizeStyle(),
    getVariantStyle(),
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    getTextSize(),
    { color: getTextColor() },
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles as ViewStyle}
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? theme.colors.primary : colors.white} />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyles as TextStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
});