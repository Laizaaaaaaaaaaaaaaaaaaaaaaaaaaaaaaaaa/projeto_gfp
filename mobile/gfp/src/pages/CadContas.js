import React, { useState, useEffect, useLayoutEffect} from "react";
import {View, Text, FlatList, Image, TouchableOpacity, TextInput, Switch} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from '@react-navigation/native';
import Estilos, { corPrincipal } from "../styles/Estilos.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {enderecoServidor} from "../utils.js"


export default function CadContas({ navigation, route}){

    const [inputNome, setInputNome] = useState("");
    const [inputTipo, setInputTipo] = useState("");
    const [inputSaldo, setInputSaldo] = useState("");
    const [inputContaPadrao, setInputContaPadrao] = useState(false);
    const [usuario, setUsuario] = useState("");
   
    // Hook para verificar se a tela está em foco
   


    // Executa essa função quando o componente é criado [] vazio
   
     useEffect(() => {
            buscarUsuarioLogado();
            }, [])
   
    useEffect(() => {
        if(route.params && route.params.Conta){
            setInputNome(route.params.Conta.nome)
            setInputTipo(route.params.Conta.tipo_conta)
            setInputSaldo(route.params.Conta.saldo)
            setInputContaPadrao(route.params.Conta.conta_padrao)
        }
    }, [route.params])
    const buscarUsuarioLogado = async () => {
        const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
        if (UsuarioLogado){
          setUsuario(JSON.parse(UsuarioLogado));
          console.log(UsuarioLogado);
         
        } else {
          navigation.navigate('Login');
        }
      }

     useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={botaoSalvar}>
                        <MaterialIcons name="save" size={28} color={"#fff"} style={{marginRight: 15}}/>
                    </TouchableOpacity>
                )
            })
        }, [navigation, inputNome, inputTipo, inputSaldo, inputContaPadrao])

    const botaoSalvar = async () => {

        try {
            const dados = {
                nome: inputNome,
                tipo_conta: inputTipo,
                saldo: inputSaldo,
                conta_padrao: inputContaPadrao
            }
            let endpoint = `${enderecoServidor}/contas`;
            let metodo = "POST";

            if(route.params && route.params.Conta){
                endpoint = `${enderecoServidor}/contas/${route.params.Conta.id_conta}`;
                metodo = "PUT";
            }
            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario.token}`
                },
                body: JSON.stringify(dados)
            })
   
            if (resposta.ok) {
                alert("Conta cadastrada com sucesso!");
                navigation.goBack();
            }      
        } catch (error) {
            console.error('Erro ao salvar conta:', error);
           
        }
       
    }

    return (
   
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <Text>Nome da Conta:</Text>
                <TextInput
                placeholder="Digite o nome da conta"
                style={Estilos.inputCad}
                value={inputNome}
                onChangeText={(text) => setInputNome(text)}
                />
                   
                <Text>Tipo da Conta:</Text>
                <TextInput
                placeholder="Digite o Tipo da conta"
                style={Estilos.inputCad}
                value={inputTipo}
                onChangeText={(text) => setInputTipo(text)}
                />

                <Text>Saldo da Conta:</Text>
                <TextInput
                placeholder="Digite o Saldo da conta"
                style={Estilos.inputCad}
                value={inputSaldo}
                onChangeText={(text) => setInputSaldo(text)}
                />
                <View>
                    <Switch value={inputContaPadrao}
                    onValueChange={setInputContaPadrao}
                    />
                <Text>Conta Padrão</Text>
                </View>
            </View>
        </View>
    )
}

