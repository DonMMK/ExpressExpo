import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { usePostHog } from '@/hooks/usePostHog';
import HeaderBar from '@/components/common/HeaderBar';
import SearchBar from '@/components/common/SearchBar';
import FeaturedItem from '@/components/discover/FeaturedItem';

const DUMMY_DATA = [
  {
    id: '1',
    title: 'Premium Subscription',
    description: 'Get access to all premium features',
    image: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    tag: 'PREMIUM'
  },
  {
    id: '2',
    title: 'Community Forum',
    description: 'Connect with other users',
    image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    tag: 'FREE'
  },
  {
    id: '3',
    title: 'Advanced Features',
    description: 'Explore advanced capabilities',
    image: 'https://images.pexels.com/photos/3184614/pexels-photo-3184614.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    tag: 'POPULAR'
  },
];

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const { capture } = usePostHog();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    capture('screen_view', { screen: 'Discover' });
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      capture('search', { query: text });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <HeaderBar title="Discover" />
      
      <View style={styles.content}>
        <SearchBar 
          value={search}
          onChangeText={handleSearch}
          placeholder="Search features, content, etc."
        />
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Featured Content
        </Text>
        
        <FlatList
          data={DUMMY_DATA}
          renderItem={({ item }) => (
            <FeaturedItem
              title={item.title}
              description={item.description}
              image={item.image}
              tag={item.tag}
              onPress={() => {
                capture('featured_item_selected', { item_id: item.id, title: item.title });
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginTop: 24,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
});