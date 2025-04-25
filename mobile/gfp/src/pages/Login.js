import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as animar from 'react-native-animatable'
import { enderecoServidor } from '../utils';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// '#00f2fe'
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function botaoEntrar() {

    try{
        if(email == '' || senha == ''){
            throw new Error('Preencha todos os campos!');
        }  
        //Autenticando utilizando a API de backend com o fetch 
        const resposta = await fetch(`${enderecoServidor}/usuarios/login`, 
            {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    email: email, 
                    senha: senha, 
                })
            }
        ) 
        if(!resposta.ok){
            const dados = await resposta.json();
            AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados)); 
            navigation.navigate('MenuPrincipal'); 
        } else {
            throw new Error('Email ou senha incorretos!');
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error); 
        alert(error.message); 
        return; 
    }
}  

   
  
  return (
    <LinearGradient
      colors={['#000080', '#000']}
      style={styles.container}
    >
      <animar.View style={styles.box} animation="fadeInUp" duration={1500}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
       
        <TouchableOpacity style={styles.botao} onPress={botaoEntrar}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('MenuTopTab')}>
          <Text style={styles.botaoTexto}>Entrar no TopTab</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('MenuBottomTab')}>
          <Text style={styles.botaoTexto}>Entrar no BottomTab</Text>
        </TouchableOpacity>
       
        {/* <TouchableOpacity>
          <Text style={styles.registro}>Criar uma conta</Text>
        </TouchableOpacity> */}
      </animar.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    box: {
      width: '85%',
      padding: 30,
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      elevation: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: '#222',
      fontWeight: 'bold',
      marginBottom: 30,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#fff',
      fontSize: 16,
      color: '#333'
    },
    botao: {
      width: '100%',
      backgroundColor: '#000080',
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
    },
    botaoTexto: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    registro: {
      marginTop: 15,
      color: '#000080',
      fontWeight: '600'
    }
  });

export default Login;
