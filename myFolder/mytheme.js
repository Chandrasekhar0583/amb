import { DefaultTheme } from 'react-native-paper';

const MyThemeAMB = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    // Dominant baby pink color scheme
    primary: '#E8B3BC',           // Main accent color (baby pink)
    accent: '#E8B3BC',            // Used for highlights

    // Backgrounds
    background: '#FFF0F3',        // Baby pink-tinted soft background
    surface: '#FFFFFF',           // Used for cards, surfaces
    boxBackground: '#FFE6EC',     // Light pink boxes/cards

    // Text & icons
    text: '#3E3E3E',              // Dark grey text for readability
    icon: '#3E764B',              // Deep green for visual contrast
    buttonText: '#3E3E3E',        // Button text for contrast

    // Buttons
    buttonBackground: '#E8B3BC',  // Baby pink buttons
    border: '#D9A0A7',            // Soft pink borders

    // Bottom tab bar / headers
    tabBarBackground: 'rgb(249, 211, 220)',  // Light pink tab bar
    headerBackground: '#E8B3BC',  // Baby pink headers
    headerText: ' #3E764B',
    // Other states
    disabled: '#F0C6CC',          // Faded pink for disabled
    error: '#D32F2F',             // Standard error red
    success: '#3E764B',           // Green for success messages
  },
};

export default MyThemeAMB;
