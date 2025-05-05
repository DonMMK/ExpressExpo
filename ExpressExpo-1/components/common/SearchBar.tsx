import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { IconSymbol } from "@/components/ui/IconSymbol"; // ✅ New import

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search",
  onClear,
}: SearchBarProps) {
  const { theme } = useTheme();

  const handleClear = () => {
    onChangeText("");
    onClear?.();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <IconSymbol
        name="magnifyingglass"
        size={20}
        color={theme.colors.textSecondary}
        style={styles.icon}
      />

      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textTertiary}
        returnKeyType="search"
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <IconSymbol name="xmark.circle.fill" size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  clearButton: {
    padding: 4,
  },
});
