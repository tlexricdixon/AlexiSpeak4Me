import React from 'react';
import { FlatList, Text } from 'react-native';
import { CommunicationItem } from '../../interfaces/CommunicationItem';
import WordItem from './WordItem';

interface InactiveWordsTabProps {
  inactiveWords: CommunicationItem[];
  onReactivate: (id: string) => void;
  fetchInactiveWords: () => void;
  currentTheme: any;
}

/**
 * ✅ Displays the list of inactive words
 * - Shows a message if there are no inactive words.
 * - Passes `onReactivate` function from parent.
 */
const InactiveWordsTab: React.FC<InactiveWordsTabProps> = ({
  inactiveWords,
  onReactivate,
  fetchInactiveWords,
  currentTheme,
}) => {
  return inactiveWords.length === 0 ? (
    <Text style={{ color: currentTheme.text, textAlign: 'center', marginVertical: 10 }}>
      No inactive words
    </Text>
  ) : (
    <FlatList
      data={inactiveWords}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <WordItem
          item={item}
          onDeactivate={async () => {
            await onReactivate(item.id);
            fetchInactiveWords(); // ✅ Refresh the list
          }}
        />
      )}
    />
  );
};

export default InactiveWordsTab;
