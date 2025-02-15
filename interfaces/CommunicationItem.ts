/**
 * Represents a single communication word/item used in the app.
 */
export interface CommunicationItem {
    id: string; // Unique identifier for each word
    text: string; // Word or phrase displayed
    image: string; // Path to the image (URI or require statement)
    category: string; // Category for sorting (e.g., 'Basic Needs', 'Feelings')
    isFavorite: boolean; // Marks frequently used words
    isCustom: boolean; // Flags words added by caregivers
    isDefault: boolean; // ✅ Identifies built-in words that cannot be deleted
    order: number; // Determines manual sorting order
    lastUsed: number | null; // Stores timestamp of last usage
    accessibilityLabel: string; // For screen reader accessibility
    isActive: boolean; // ✅ Indicates if word is active or not  
  }
  
