import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ChevronRight } from "lucide-react-native";
import { colors } from "@/constants/colors";

interface FeaturedItemProps {
  title: string;
  description: string;
  image: string;
  tag?: string;
  onPress: () => void;
}

export default function FeaturedItem({
  title,
  description,
  image,
  tag,
  onPress,
}: FeaturedItemProps) {
  const { theme } = useTheme();

  // Determine tag background color
  const getTagColor = () => {
    switch (tag?.toUpperCase()) {
      case "PREMIUM":
        return colors.accent;
      case "FREE":
        return colors.success;
      case "POPULAR":
        return colors.secondary;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.dark ? "#000" : "#222",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.textContainer}>
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

        <ChevronRight size={20} color={theme.colors.textSecondary} />
      </View>

      {tag && (
        <View style={[styles.tag, { backgroundColor: getTagColor() }]}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 140,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    lineHeight: 20,
  },
  tag: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
});
