import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('front', () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('front');
    AppRegistry.runApplication('front', { rootTag });
}