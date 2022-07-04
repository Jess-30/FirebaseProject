
import React, { useState, useEffect } from "react";
import { Text, View, Button } from 'react-native';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth'


export default function InicioSesion({ navigation }){
    const [usuario, setusuario] = useState("");
    const [password, setpassword] = useState("");
    const auth = getAuth();

    const registrar = function () {
        createUserWithEmailAndPassword(auth, usuario, password)
        .then((userCredential)=>{console.log(userCredential) 
            const user= userCredential.user;
        })
        .catch((error)=>{
            console.log(error)
            alert("El usuario se registró correctamente")
        });
        console.log(password);
        console.log(usuario);
        console.log("Registar");
    }
    const ingresar = function () {
        signInWithEmailAndPassword(auth, usuario, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigation.navigate('Subir')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Usuario y contraseña incorrectos");

  });
  }
    return (
        <View style={{ flex: 1, padding:100, alignItems: "center" }}>
            
            <h3>Ingresa tu correo o usuario</h3>
            <br/>
            <input onChange={(e) => setusuario(e.nativeEvent.target.value)} type={Text}></input>
            <br/>
            <h3>Ingresa tu contraseña</h3>
            <br/>
            <input onChange={(e) => setpassword(e.nativeEvent.target.value)} type={Text}></input>
            <br/>
            <Button title="Iniciar sesión"  onPress={() => ingresar()}></Button>
            <br/>
            <Button title="Registrarme" onPress={() => registrar()}></Button>
            
        </View>
    )
    
}