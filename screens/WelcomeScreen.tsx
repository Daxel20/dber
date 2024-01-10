import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ImageBackground, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Drawer_Welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        switch (errorCode) {
          case "auth/invalid-credential":
            Alert.alert("ERROR", "Credenciales Incorrectas");
            break;
          case "auth/missing.password":
            Alert.alert("ERROR", "Contraseña Perdida");
            break;
          default:
            Alert.alert("ERROR");
            break;
        }
      });
  }

  return (
    <ImageBackground
      source={{uri:'https://c4.wallpaperflare.com/wallpaper/966/951/802/digital-digital-art-artwork-illustration-fantasy-art-hd-wallpaper-preview.jpg'}} // Reemplaza con la ruta correcta de tu imagen de fondo
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingresar email'
          keyboardType='email-address'
          onChangeText={(texto: any) => setCorreo(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder=" Ingresar contraseña"
          onChangeText={(texto: any) => setContrasenia(texto)}
          secureTextEntry
        />

        <Button title='Ingresar' onPress={() => login()} />

        <Text style={styles.registerLink} onPress={() => navigation.navigate('Registro')}>👉 Regístrate aquí 👈</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  registerLink: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
});
