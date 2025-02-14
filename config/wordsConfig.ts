export interface CommunicationItem {
    id: string;
    text: string;
    image: any;
  }
  
  // Default word list (modifiable via caregiver mode)
  export const defaultWords: CommunicationItem[] = [
    { id: '1', text: 'Eat', image: require('../assets/images/eat.png') },
    { id: '2', text: 'Drink', image: require('../assets/images/drink.png') },
    { id: '3', text: 'Restroom', image: require('../assets/images/restroom.png') },
    { id: '4', text: 'Happy', image: require('../assets/images/happy.png') },
    { id: '5', text: 'Sad', image: require('../assets/images/sad.png') },
    { id: '6', text: 'Angry', image: require('../assets/images/angry.png') },
    { id: '7', text: 'Yes', image: require('../assets/images/yes.png') },
    { id: '8', text: 'No', image: require('../assets/images/no.png') },
    { id: '9', text: 'Help', image: require('../assets/images/help.png') },
  ];
  