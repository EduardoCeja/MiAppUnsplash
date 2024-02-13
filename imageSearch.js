//Importación de biblioteca "React"
//Importación de Hooks {useState, useEffect} para el manejo de estado y efectos  
import React, { useState, useEffect } from 'react';
import { View, //es un componente contenedor que se utiliza para agrupar otros componentes o elementos.
    TextInput, //es un componente de entrada de texto que permite al usuario ingresar texto. 
    FlatList, //es un componente para renderizar listas largas y optimizadas que contienen elementos de desplazamiento, como listas de elementos.
    Image, //es un componente para mostrar imágenes.
    Modal, //es un componente que muestra un contenido 
    StyleSheet, //es un módulo que proporciona estilos en línea para componentes de React Native.
    TouchableOpacity, //es un componente que puede manejar el tacto, lo que significa que puede detectar presiones en la pantalla.
    Text,//es un componente para mostrar texto.
    Pressable //es un componente que puede manejar eventos touch.
 } from 'react-native';

import axios from 'axios';//Biblioteca para realizar solicitudes HTTP

const ImageSearch = () => {
  //Inicialización de estados
  const [query, setQuery] = useState('');//Estado para almacenar la consulta de búsqueda
  const [images, setImages] = useState([]);//Estado para almacenar la lista de imágenes de la búsqueda
  const [selectedImage, setSelectedImage] = useState(null);//Estado para almacenar la imagen seleccionada
  const [selectedImageTitle, setSelectedImageTitle] = useState('');//Estado para almacenar el título de la imagen seleccionada
  const [randomImages, setRandomImages] = useState([]);//Estado para almacenar la lista de imágenes aleatorias
  const [emptySearchError, setEmptySearchError] = useState(false);//Estado para indicar si ha ocurrido un error de búsqueda vacía

  //Efecto para obtener imágenes aleatorias al cargar el componente
  useEffect(() => {
    fetchRandomImages();
  }, []);


  //Esta línea es una función asíncrona llamada fetchRandomImages, esta función se utilizara para la generer las imagenes aleatorias 
  const fetchRandomImages = async () => {
    //Este bloque try-catch maneja errores que puedan ocurrir durante la ejecución de la función. Si se produce algún error dentro del bloque try, se captura y se maneja en el bloque catch.
    try {
      //Solicitud de petición GET, se utiliza la palabra clave 'await' para esperar a que la solicitud se acomplete y se almacene en la respuetsa en la variable "response"
      const response = await axios.get(`https://api.unsplash.com/photos/random`, {
        //parametros de la solicitud GET 
        params: {
          count: 50, //Parametro de limite de número de imágenes aleatorias
          client_id: '_fJna3zX9Rkc8ViDM5Yhf0Sj7bgNPn7COANlFDdfluQ', //Clave de la API
        },
      });
      //Se mnda a llamar a la funcion para actualizar el estado con los datos de la respuesta
      setRandomImages(response.data);
    } catch (error) {//Si se produce algún error durante la ejecución de la función, se imprime un mensaje de error en la consola que incluye el error capturado.
      console.error('Error al recuperar imágenes aleatorias:', error);
    }
  };

  //Esta linea es una función asíncrona llamada searchImages esta funcion realizara la busqueda de imagenes según el termino de búsqueda proporcionado por el usuario
  const searchImages = async () => {
    //bloque if-else comprueba si el campo de búsqueda (query) está vacío o no. Si está vacío, establece el estado emptySearchError en true para indicar un error, y luego sale de la función utilizando return. De lo contrario, establece emptySearchError en false.
    if (query.trim() === '') {
      setEmptySearchError(true);
      return;
    } else {
      setEmptySearchError(false);
    }
    //Este bloque try-catch maneja errores que puedan ocurrir durante la ejecución de la función.
    try {
      //Solicitud de petición GET, se utiliza await para esperar a que la solicitud se acomplete y se almacene en la respuetsa en la variable "response"
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        //Parametros de la solicitud GET   
        params: {
          query: quer,//Parametro de búsqueda que es proporcionado por el usuario 
          client_id: '_fJna3zX9Rkc8ViDM5Yhf0Sj7bgNPn7COANlFDdfluQ', //Clave de la API
          per_page: 10, //Parametro de limite de número de imágenes de busqueda
        },
      });
      //Se mnda a llamar a la funcion para actualizar el estado con los datos de la respuesta
      setImages(response.data.results);
    } catch (error) {//Si se produce algún error durante la ejecución de la función, se imprime un mensaje de error en la consola que incluye el error capturado.
      console.error('Error al obtener imagenes:', error);
    }
  };


  //Función que ejecuta una limpia de la busqueda de imagenes que proporciona el usuario 
  const clearSearch = () => {
    setQuery('');//Establece el estado de la consulta de búsqueda como una cadena vacía, lo que limpia el campo de búsqueda
    setImages([]);//Establece el estado de las imágenes como una matriz vacía, lo que borra la lista de imágenes de la búsqueda
  };

  //Función para actualizar las imágenes aleatorias
  const refreshRandomImages = () => {
    fetchRandomImages();//Llama a la función fetchRandomImages para obtener nuevas imágenes aleatorias y actualizar el estado randomImages
  };

  //Función para abrir imagenes seleccionadas
  const openImage = (imageUrl, imageTitle) => {
    setSelectedImage(imageUrl);//Establece la URL de la imagen seleccionada en el estado selectedImage
    setSelectedImageTitle(imageTitle);//Establece el título de la imagen seleccionada en el estado selectedImageTitle
  };

  //función para el renderizamiento de imagen, esto permite al usuario tocar la imagen para verla en un tamaño completo 
  const renderItem = ({ item }) => (
    //Componente TouchableOpacity  permite que el usuario interactúe con la imagen, ya que se activará una función cuando se toque.
    //Cuando el usuario toque la immagen manda a llamar la función openImage con dos argumentos, la URL de la imagen completa (item.urls.regular) y el título de la imagen (item.description).  
    <TouchableOpacity onPress={() => openImage(item.urls.regular, item.description)}>
      {/*La imagen en sí se muestra utilizando el componente Image, con la propiedad source que especifica la URI de la imagen (item.urls.thumb*/}
      <Image style={styles.image} source={{ uri: item.urls.thumb }} />
    </TouchableOpacity>
  );
//Renderizado
  return (

    //Se utiliza un componente View como contenedor principal para organizar los elementos de la interfaz de usuario.
    <View>
      {/* "TextInput" permite al usuario ingresar texto para realizar una búsqueda de imágenes. El valor de este campo está vinculado al estado query y se actualiza mediante la función setQuery cuando cambia el texto.*/}
      <TextInput
        style={styles.input}//Estilos
        placeholder="Busqueda de imagenes" 
        value={query}// El valor del estado query se muestra en el campo de entrada y se actualiza cuando el usuario ingresa texto.
        onChangeText={text => setQuery(text)}//Este prop define una función que se llama cada vez que el usuario modifica el texto en el campo de entrada. 
      />

      {/*Pressable como botón para iniciar la búsqueda de imágenes, cuando se presiona este botón, se ejecuta la función searchImages.*/}
      <Pressable style={styles.button} onPress={searchImages}>
         <Text style={styles.btnTextoNuevaCita}>Busqueda de imagenes</Text>
      </Pressable >
      {/*Si hay un error de búsqueda vacía (emptySearchError es verdadero), se muestra un mensaje de error.*/}
      {emptySearchError && (
        <Text style={styles.errorText}>Por favor ingrese un término de búsqueda</Text>
      )}
      {/*Si hay imágenes en la lista (images.length > 0), se muestra un botón "Limpiar" que llama a la función clearSearch para borrar la búsqueda actual y reiniciarla.*/}
      {images.length > 0 && (
        <Pressable onPress={clearSearch}  style={styles.buttonLimpiar}>
            <Text style={styles.btnTextoNuevaCita}>Limpiar</Text>
        </Pressable>
      )}


      {/*Se utiliza un componente FlatList para mostrar la lista de imágenes obtenidas de la búsqueda. Cada elemento de la lista se renderiza utilizando la función renderItem.*/}
      <FlatList
        data={images}//Este prop especifica la fuente de datos para la lista, que en este caso es el estado images que contiene la lista de imágenes obtenidas de la búsqueda.
        renderItem={renderItem} //Este prop especifica la función que se utilizará para renderizar cada elemento de la lista
        keyExtractor={(item) => item.id}//Este prop especifica cómo se extrae la clave única de cada elemento de la lista.
        numColumns={2}//Este prop especifica el número de columnas en las que se mostrarán los elementos de la lista.
      />


      <View style={styles.sectionContainer}>
        {/*Boton refrescar cuando se presiona, llama a la función refreshRandomImages para obtener nuevas imágenes aleatorias.*/}
        <Pressable style={styles.buttonRefresh} onPress={refreshRandomImages}> 
          <Text style={styles.btnTextoNuevaCita}>Refrescar</Text>
        </Pressable>
      </View>


      {/*Componente para mostrar la lista de imágenes aleatorias.*/}
      <FlatList
        data={randomImages} //Este prop especifica la fuente de datos para la lista, que en este caso es el estado images que contiene la lista de imágenes obtenidas de la búsqueda.
        renderItem={renderItem}//La función renderItem toma un elemento de datos y devuelve un componente que representa ese elemento en la lista.
        keyExtractor={(item) => item.id}//En este caso, se utiliza la propiedad id de cada elemento como clave única.
        numColumns={2}//Este prop especifica el número de columnas en las que se mostrarán los elementos de la lista.
      />



      {/*Modal para que se muestra la imagen seleccionda en pantalla completa, junto con su titulo*/}
      <Modal
        visible={!!selectedImage} //Determina si el modal está visible o no. Se establece en !!selectedImage, lo que significa que el modal se muestra si selectedImage no es nulo.
        transparent={true}//Se establece en true, lo que significa que el fondo del modal es transparente, permitiendo que los elementos de la aplicación subyacente sean visibles.
        onRequestClose={() => setSelectedImage(null)}//Especifica una función que se llama cuando se solicita cerrar el modal. En este caso, la función setSelectedImage(null) se ejecuta cuando se intenta cerrar el modal, lo que establece selectedImage en nulo y oculta el modal.
      >

      <View style={styles.modalContainer}>
        {/*Componente de botón que se utiliza para cerrar el modal cuando se presiona, al presionar este botón, se ejecuta la función setSelectedImage(null), lo que oculta el modal al establecer selectedImage en nulo.*/}
        <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
          <Text style={styles.closeText}>Cerrar</Text>
        </TouchableOpacity>
        {/*Componente de imagen que muestra la imagen seleccionada en el modal, la URI de la imagen se obtiene del estado selectedImage*/}
        {/*La propiedad resizeMode se utiliza para asegurarse de que la imagen se ajuste dentro del área del modal sin distorsionarse.*/}
        <Image style={styles.modalImage} source={{ uri: selectedImage }} resizeMode="contain" />
        {/*Componente de texto que muestra el tituño de la imagen*/}
        <Text style={styles.imageTitle}>{selectedImageTitle}</Text>
      </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#006AF6',
    color: '#fff', 
    padding: 10, 
    margin: 5, 
    borderRadius: 10, 
    width: '80%',
    marginLeft: 90,
  },
  buttonRefresh:{
    backgroundColor: '#006AF6', 
    color: '#fff', 
    padding: 5,
    margin: 5, 
    borderRadius: 10, 
    width: '35%',
    marginLeft: '35%',
  },
  buttonLimpiar:{
    backgroundColor: '#006AF6', 
    color: '#fff', 
    padding: 5, 
    margin: 5, 
    borderRadius: 10, 
    width: '35%',
    marginLeft: '40%',
  },
  btnTextoNuevaCita: {
    textAlign:'center',
    color: '#FFF',
    fontSize:18,
    fontWeight:'900',
    textTransform:'uppercase'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    margin: 20,
    marginRight:50,
    marginLeft: 10,
    borderRadius:20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '90%',
    height: '60%',
    aspectRatio: 1,
    borderRadius:20
  },
  imageTitle: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#006AF6',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 10,
    marginBottom: 10,
  },

});

export default ImageSearch;
