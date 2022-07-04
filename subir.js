import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import { FirebaseApp } from 'firebase/app';
import {getStorage, ref, uploadString, listAll, getDownloadURL } from "firebase/storage";
import {signOut, getAuth } from "firebase/auth";

import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import { ScrollView } from 'react-native-gesture-handler';

export default function Subir({navigation}) {

    
    const auth = getAuth();
    const storage = getStorage();

    const listRef = ref(storage, 'imagenes/');
    const [imagen, setImagen] = useState([]);
    const nuevas =[];
    
     const Ver = () => {
   
    listAll(listRef)
    .then((res) => {
        res.items.forEach((itemRef) => {
            getDownloadURL(ref(itemRef))
            .then((url) => {
              
                imagen.push(url);
                 
                 console.log(imagen)
             })
            
        });
        setImagen([nuevas]);
        
        
    }).catch((error) => {
        console.log(error);
    });
    }
    

    const subirImagen = async (uri) => {
        const response = await fetch(uri);
        const blob = await response;
        console.log(blob)

        const storage = getStorage();
        const rand = Math.random()* 5;
        const storageRef = ref(storage, `imagenes/imagen_${rand}.png`);

        uploadString(storageRef, blob.url, 'data_url').then((snapshot) => {
            console.log(snapshot)
            alert("Imagen subida correctamente")
        });
    }
    const seleccionarImagen = async () => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
        console.log(resultPermissions);
        const resultPermissionsCamera = resultPermissions.permissions.status;
        if (resultPermissionsCamera === "denied") {
            alert("No tienes los permisos necesarios");
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                ellowsEditing: true,
                aspect: [4, 3]
            });
            console.log(result);
            subirImagen(result.uri);
        }
    }

    
    const cerrarSesion = () => {
        signOut(auth)
        .then(() => {
            console.log('Se ha cerrado sesion con exito');
            navigation.navigate('Login')
        })
        .catch((error) => console.log(error));
    }

    return (
        <View style={{ flex: 1, padding:24, justifyContent: "center", alignItems: "center" }}>
            <ScrollView>
            <Button title="Subir Imagen" onPress={seleccionarImagen}></Button>
            <br></br>
            <Button  title="Cerrar sesion" onPress={() => cerrarSesion()}></Button>
            <br></br>
            <Button  title="Ver imagenes" onPress={()=>Ver()}></Button>
            <br></br>
            {imagen.map(imagen=>{
            <Text>Holas</Text>
            })
        }

            </ScrollView>
            
        </View>
    )
}