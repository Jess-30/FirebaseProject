import { createStackNavigator } from "@react-navigation/stack";

import Users from "./Users";
import User from "./User";
import Subir from "./subir";
import InicioSesion from "./InicioSesion";
const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio sesion" component={InicioSesion} /> 
      <Stack.Screen name="Subir" component={Subir} /> 
      <Stack.Screen name="User" component={User} />
      
     

    </Stack.Navigator>
  );
}
