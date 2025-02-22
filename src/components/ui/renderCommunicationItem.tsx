import React from 'react';
import { ListRenderItem } from 'react-native';
import CommunicationButton from './CommunicationButtons'; // ✅ Import CommunicationButton
import { CommunicationItem } from '../../interfaces/CommunicationItem'; // ✅ Import CommunicationItem from a shared type file

/**
 * 🟢 Renders a communication item inside the FlatList.
 * - Uses `CommunicationButton` to display the word & image.
 * - Supports **swipe gestures** for interaction.
 */
const renderCommunicationItem: ListRenderItem<CommunicationItem> = ({ item }) => (
  <CommunicationButton
    item={item}
    onSwipeLeft={() => console.log(`Swiped Left: ${item.text}`)} // ✅ Placeholder swipe function
  />
);

export default renderCommunicationItem;



