import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, Alert } from 'react-native';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);

  const buscarCep = async () => {
    // Valida se o CEP tem 8 dígitos
    if (cep.length !== 8 || isNaN(cep)) {
      Alert.alert('Erro', 'Digite um CEP válido com 8 números.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco(data);
        Keyboard.dismiss(); // Fecha o teclado
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar o CEP. Verifique sua conexão.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consulta de CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP (somente números)"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
      />

      <Button title="Buscar" onPress={buscarCep} />

      {endereco && (
        <View style={styles.resultado}>
          <Text style={styles.label}>Rua: {endereco.logradouro}</Text>
          <Text style={styles.label}>Bairro: {endereco.bairro}</Text>
          <Text style={styles.label}>Cidade: {endereco.localidade}</Text>
          <Text style={styles.label}>Estado: {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 15,
  },
  resultado: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
