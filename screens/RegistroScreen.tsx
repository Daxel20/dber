import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import { Alert } from 'react-native';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        console.log("REGISTRO CORRECTO");
        navigation.navigate('Drawer_Welcome');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);

        if (errorCode === 'auth/weak-password') {
          Alert.alert("Error", "La contraseña debe poseer al menos 6 caracteres");
        }
      });
  }

  return (
    <ImageBackground
      source={{uri:'https://c4.wallpaperflare.com/wallpaper/760/459/710/aoi-ogata-anime-girls-wallpaper-preview.jpg'}} // Reemplaza con la ruta correcta de tu imagen de fondo
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>RegistroScreen</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingrese email'
          onChangeText={(texto) => setCorreo(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingrese contraseña'
          onChangeText={(texto) => setContrasenia(texto)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese un nick"
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
        />
        <Button title='Registrarse' onPress={() => registro()} />
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
});
