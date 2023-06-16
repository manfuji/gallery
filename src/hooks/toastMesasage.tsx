import {Alert} from 'react-native';
import {IToast} from '../constants/types/toast';

// Inside your component or function
export const showAlert = ({title, message}: IToast) => {
  Alert.alert(
    title, // Alert title
    message, // Alert message
    [
      {
        text: 'OK', // Button text
        onPress: () => {
          // Callback function when the button is pressed
          console.log('OK pressed');
        },
      },
    ],
    {cancelable: false}, // Whether the alert can be dismissed by tapping outside (default is true)
  );
};

// Usage
// showAlert();
