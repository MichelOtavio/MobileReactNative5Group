import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },

    button: {
      backgroundColor: '#3897f0',
      width: '87%',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000',  
      shadowOffset: { width: 0, height: 2 },  
      shadowOpacity: 0.25,  
      shadowRadius: 3.84,  
      elevation: 5,  
    },

    buttonText: {
      color: '#fff',
      fontWeight: 'light',
      fontSize: 16,
  },

  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  logoImage: {
    width: 150,  // Largura da imagem do logo
    height: 150,  // Altura da imagem do logo
    marginBottom: 20,  // Espaçamento entre o logo e o texto "5 Group"
    resizeMode: 'contain',  // Garante que a imagem se ajuste ao container
  },

})