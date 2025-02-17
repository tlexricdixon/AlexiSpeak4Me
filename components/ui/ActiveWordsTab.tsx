import React from 'react';
import { FlatList } from 'react-native';
import { CommunicationItem } from '../../interfaces/CommunicationItem';
import WordItem from './WordItem';

interface ActiveWordsTabProps {
  words: CommunicationItem[];
  onDeactivate: (id: string) => void;
}

/**
 * ✅ Displays the list of active words
 * - Uses `FlatList` for better performance.
 * - Passes `onDeactivate` function from parent for modularity.
 */
const ActiveWordsTab: React.FC<ActiveWordsTabProps> = ({ words, onDeactivate }) => {
  return (
    <FlatList
      data={words}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <WordItem item={item} onDeactivate={() => onDeactivate(item.id)} />
      )}
    />
  );
};

export default ActiveWordsTab;
