import React, {useState, useEffect, useLayoutEffect} from "react";
import  {View, Text, FlatList, Image, TouchableOpacity} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from '@react-navigation/native';
import Estilos, { corPrincipal } from "../styles/Estilos.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {enderecoServidor} from "../utils.js"
import { useIsFocused } from "@react-navigation/native";
export default function Contas({navigation}) {
    const [dadosLista, setDadosLista] = useState([]);
    const [usuario, setUsuario] = useState();
    const isFocused = useIsFocused();
    const buscarDadosAPI = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/contas`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${usuario.token}`
                }
            })
            const dados = await resposta.json();
            setDadosLista(dados);
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
        }
    }
    useEffect(() => {
            if (isFocused) {
                buscarDadosAPI();
            }
        }
        , [isFocused, usuario]);
   
    useEffect(() => {
        buscarUsuarioLogado();
        }, [])
    // Executa essa função quando o componente é criado [] vazio
    useEffect(() => {
        buscarDadosAPI();
    }, [usuario]);
    const buscarUsuarioLogado = async () => {
        const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
        if (UsuarioLogado){
          setUsuario(JSON.parse(UsuarioLogado));
          console.log(UsuarioLogado);
         
        } else {
          navigation.navigate('Login');
        }
      }
 

    const exibirItemLista = ({item}) => {
        return (
            <TouchableOpacity style={Estilos.ItemLista}>
                <Image source={require('../assets/logo.png')}
                style={Estilos.imagemLista}
                />
                <View style={Estilos.textContainer}>
                    <Text>{item.tipo_conta}</Text>
                    <Text>{item.nome}</Text>
                </View>
                <MaterialIcons name="edit" size={24} color={'#008080'} style={Estilos.icon}
                    onPress={() => navigation.navigate('CadContas', {Conta: item})}
                />
                <MaterialIcons name="delete" size={24} color={'#e63946'} style={Estilos.icon}
                    onPress={() => botaoExcluir(item.id_conta)}
                />
            </TouchableOpacity>
        )
    }

    const botaoExcluir = async (id) => {
        try {
            const resposta = await fetch(`${enderecoServidor}/contas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${usuario.token}`,
                    'Content-Type': 'application/json'  
                }
                })
            if (resposta.ok) {
                buscarDadosAPI();
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('CadContas')}>
                    <MaterialIcons name="add" size={28} color={"#fff"} style={{marginRight: 15}}/>
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
            <Text>Contas</Text>
            <FlatList
            data={dadosLista}
            renderItem={exibirItemLista}
            keyExtractor={(item) => item.id_conta}
            />
            </View>
        </View>
    )
}

