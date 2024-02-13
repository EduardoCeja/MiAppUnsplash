import React from 'react';
import { View, StyleSheet } from 'react-native';

//Se importa el componente ImageSearch desde el archivo imageSearch.js. Esto asume que tienes un archivo llamado imageSearch.js en la misma ubicación que este archivo y que exporta el componente ImageSearch.
import ImageSearch from './imageSearch';

//Componente principal de la aplicación
const App = () => {
  return (
    <View style={styles.container}>
      {/*Renderizado del componente*/}
      <ImageSearch />
    </View>
  );
};

//Se define Objeto para estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CEDFF6',
  },
});

export default App;
