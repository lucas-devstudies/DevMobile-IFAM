import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text, Card, ActivityIndicator } from 'react-native-paper';
import {styles} from './styles'

export default function Index() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [endereco, setEndereco] = useState<any>(null);

  const buscarCep = async () => {
    if (cep.length !== 8) {
      Alert.alert("Erro", "O CEP deve ter 8 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert("Ops!", "CEP não encontrado.");
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao serviço.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Busca CEP 📍</Text>

      <TextInput
        label="Digite o CEP (ex: 69151000)"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        mode="outlined"
        maxLength={8}
        style={styles.input}
      />

      <Button 
        mode="contained" 
        onPress={buscarCep} 
        loading={loading}
        style={styles.button}
      >
        Buscar Endereço
      </Button>

      {endereco && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{endereco.logradouro}</Text>
            <Text variant="bodyMedium">Bairro: {endereco.bairro}</Text>
            <Text variant="bodyMedium">{endereco.localidade} - {endereco.uf}</Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}