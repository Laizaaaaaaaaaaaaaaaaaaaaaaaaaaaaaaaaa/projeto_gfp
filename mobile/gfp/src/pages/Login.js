import { View, Text, TextInput, TouchableOpacity, Switch} from 'react-native';
import Estilos from '../styles/Estilos';
import { enderecoServidor } from '../utils';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({ navigation }) {
  navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setlembrar] = useState(false);

  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      console.log('buscando usuario logado');
      const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
      console.log(UsuarioLogado);
     
      if (UsuarioLogado) {
        const usuario = JSON.parse(UsuarioLogado)
        console.log(usuario);
       
        if (usuario.lembrar == true) {
          navigation.navigate('MenuPrincipal');
        }
      }
    }
    buscarUsuarioLogado();
  }, [])

  async function botaoEntrar() {
    try {
      if (email === "" || senha === "") {
        throw new Error("Preencha todos os campos!");
      }

      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        await AsyncStorage.setItem('UsuarioLogado', JSON.stringify({...dados, lembrar}));
        navigation.navigate('MenuPrincipal');
      } else {
        throw new Error('Email ou senha incorretos ❌');
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(error.message);
    }
  }

  return (
    <View style={Estilos.conteudo}>
      <View style={Estilos.loginContainer}>
        <View style={Estilos.iconContainer}>
          <Text style={{ fontSize: 29, color: Estilos.corPrincipal, fontWeight: 'bold' }}>Acesse sua Conta</Text>
        </View>

        <Text style={Estilos.label}>Email</Text>
        <TextInput
          placeholder="Digite seu Email"
          placeholderTextColor="#aaa"
          style={Estilos.input}
          onChangeText={setEmail}
          value={email}
        />

        <Text style={Estilos.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={Estilos.input}
          onChangeText={setSenha}
          value={senha}
        />

        <TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, alignItems: 'center'}}>
            <Switch value={lembrar} onValueChange={setlembrar}/>
            <Text>Lembrar-me</Text>
          </View>

          <Text style={Estilos.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Estilos.button} onPress={botaoEntrar}>
          <Text style={Estilos.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={Estilos.secondaryButton}>
          <Text style={Estilos.secondaryButtonText}>Solicitar Acesso</Text>
        </TouchableOpacity> */}

        <Text style={Estilos.bottomText}>
          Não tem uma conta? <Text style={Estilos.linkText}>Cadastre-se</Text>
        </Text>
      </View>
    </View>
  );
}