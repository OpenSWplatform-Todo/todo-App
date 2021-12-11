import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 

import RandomScreen from './src/screens/Random'; 
import RandomD from './src/screens/Random2'; 

const Stack = createStackNavigator(); 
function App() { 
    return ( 
    <NavigationContainer> 
        <Stack.Navigator initialRouteName="Random"> 
            <Stack.Screen name="Random" component={RandomScreen} 
                options={{ 
                    title: 'Random',
                    headerTintColor: '#00462a',
                    headerTitleStyle: {
                    fontSize: 36,
                },
                }}/> 
            <Stack.Screen name="Random2" component={RandomD} 
                options={{ 
                    title: 'Random', 
                    headerTintColor: '#00462a',
                    headerTitleStyle: {
                    fontSize: 36,
                },
                }}/> 
         </Stack.Navigator> 
     </NavigationContainer> 
     );
}; 
     
     
export default App;
