import { Alert, Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

export default function RecursosScreen() {
  const [imagen, setImagen] = useState('');

  const cargarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'test/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');
      Alert.alert('Mensaje', 'La imagen se subió con éxito');

      // Obtén la URL de la imagen si es necesario
      // const imageURL = await getDownloadURL(storageRef);
      // console.log('URL de descarga de la imagen', imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ImageBackground
      source={{uri: 'https://c4.wallpaperflare.com/wallpaper/398/773/180/mobile-suit-mobile-suit-gundam-unicorn-mech-anime-artwork-hd-wallpaper-preview.jpg'}} // Reemplaza con la ruta correcta de tu imagen de fondo
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>Subir Imagen desde la galería</Text>
        <Button title='Seleccionar imagen' onPress={() => cargarImagen()} />
        <Image source={{ uri: imagen }} style={styles.img} />
        <Button title='Cargar Imagen' onPress={() => subirImagen('avatar1')} />
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  img: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
