import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from '@react-navigation/native';
import Estilos, { corPrincipal } from "../styles/Estilos.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enderecoServidor } from "../utils.js";
import { useIsFocused } from "@react-navigation/native";

export default function Categorias({ navigation }) {
  const [dadosLista, setDadosLista] = useState([]);
  const [usuario, setUsuario] = useState(); 
  const [atualizando, setAtualizando] = useState(false);

  const isFocused = useIsFocused();
  const buscarDadosAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/categorias`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      const dados = await resposta.json();
      console.log("Categorias recebidas:", dados);
      setDadosLista(dados);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };
  useEffect(() => {
      buscarDadosAPI();
    }, [usuario])
  useEffect(() => {
    buscarUsuarioLogado();
  }, []);
  // Executa essa função quando o componente é criado [] vazio
  useEffect(() => {
    buscarDadosAPI();
  }, [usuario]);
  const buscarUsuarioLogado = async () => {
    const UsuarioLogado = await AsyncStorage.getItem("UsuarioLogado");
    if (UsuarioLogado) {
      setUsuario(JSON.parse(UsuarioLogado));
      console.log(UsuarioLogado);
    } else {
      navigation.navigate("Login");
    }
  };

  const exibirItemLista = ({ item }) => {
    return (
      <TouchableOpacity style={Estilos.ItemLista}>
        <Text style={Estilos.itemLista}> 
            <View style={{
                backgroundColor: '#000', 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                alignItems: 'center',
                justifyContent: 'center', 
            }}>

            </View>

        </Text>
        {/* <Image
        //   source={require("../assets/logo2.png")}
        source={{ uri: `${enderecoServidor}/imagens/${item.icone}` }}
          style={Estilos.imagemLista}
        /> */}
        <MaterialIcons
        name={item.icone}
        size={24}
        style={Estilos.imagemLista}
        />
        <View style={Estilos.textContainer}>
          <Text>{item.nome}</Text>
          <Text>{item.tipo_transacao}</Text>
          <Text>Usuário: {item.nome_usuario}</Text>
        </View>
        <MaterialIcons name="edit" size={24} color={'#008080'} style={Estilos.icon}
                    onPress={() => navigation.navigate('CadCategorias', {Conta: item})}
                />
        <MaterialIcons
          name="delete"
          size={24}
          color={"#e63946"}
          style={Estilos.icon}
          onPress={() => botaoExcluir(item.id_categoria)}
        />
      </TouchableOpacity>
    );
  };

  const botaoExcluir = async (id) => {
    try {
      const resposta = await fetch(`${enderecoServidor}/categorias/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${usuario.token}`,
          "Content-Type": "application/json",
        },
      });
      if (resposta.ok) {
        buscarDadosAPI();
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("CadCategorias")}>
          <MaterialIcons
            name="add"
            size={28}
            color={"#fff"}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={Estilos.conteudoHeader}>
      <View style={Estilos.conteudoCorpo}>
        <Text>Categorias</Text>
        <FlatList
          data={dadosLista}
          renderItem={exibirItemLista}
          keyExtractor={(item) => item.id_categoria}
          refreshControl={
            <RefreshControl refreshing={atualizando} onRefresh={buscarDadosAPI} colors={{corPrincipal}}/>  
          }
        />
      </View>
    </View>
  );
}
