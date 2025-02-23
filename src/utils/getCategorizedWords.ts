import { CommunicationItem } from '../interfaces/CommunicationItem';
export const getCategorizedWords = (words: CommunicationItem[]) => {
  // ✅ Filter out inactive words
  const activeWords = words.filter((word) => word.isActive);

  const categorizedWords = activeWords.reduce((categories, word) => {
    if (!categories[word.category]) {
      categories[word.category] = [];
    }
    categories[word.category].push(word);
    return categories;
  }, {} as Record<string, CommunicationItem[]>);

  return Object.keys(categorizedWords).map((category) => ({
    title: category,
    data: categorizedWords[category],
  }));
};

