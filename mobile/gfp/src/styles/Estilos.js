import { StyleSheet } from 'react-native';

export const corPrincipal = '#00C896';
export const corSecundaria = '#00c3ff';
export const corTextos = '#1a1a1a';
export const corFundo = '#f5f9ff';

const Estilos = StyleSheet.create({
     conteudo: {
    flex: 1,
    backgroundColor: corFundo,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    color: corTextos,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: corPrincipal,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'right',
    color: corSecundaria,
    marginBottom: 10,
  },
  bottomText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
  linkText: {
    color: corSecundaria,
    fontWeight: 'bold',
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
  },
  ItemLista: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 15,
      marginVertical: 6,
      marginHorizontal: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
  },
  imagemLista: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 16,
      backgroundColor: '#e0e0e0',
  },
  textContainer: {
      flex: 1,
      justifyContent: 'center',
  },
  icon: {
      marginLeft: 10,
  },
  tipoConta: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
  },
  nomeLista: {
      fontSize: 14,
      color: '#666',
  }, 
  inputCard: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff', 
  }

})


export default Estilos