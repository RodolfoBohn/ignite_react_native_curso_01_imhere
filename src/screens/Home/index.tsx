import { Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import {styles} from './styles'
import { Participant } from "../../components/Participant";
import { useState } from "react";


export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState("")
  

  function handleAddParticipantClick(){
    if(participants.includes(participantName)) {
      return Alert.alert("Participante existente", "Já existe um participante com este nome")
    }

    setParticipants(initialState => [...initialState, participantName])
    setParticipantName("")
  }

  function handleRemoveParticipantClick(name: string){
    Alert.alert("Remover participante", `Tem certeza que você deseja remover o participante ${name}?`, [
      {
        text: 'Sim', 
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      }, 
      {
        text: 'Não', 
        style: 'cancel'
      }
    ])
  }


  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Quinta-feira, 14 de dezembro de 2023</Text>

      <View style={styles.form}>

        <TextInput 
        style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor='#6B6B6B'
        keyboardType="default"
        value={participantName}
        onChangeText={setParticipantName}
        />
        <TouchableOpacity 
        style={styles.button}
        onPress={handleAddParticipantClick}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {
      //Menos performático, carrega todos os componentes de uma vez. Para listas pequenas, não teria problema.
    }
      {/* <ScrollView 
        showsVerticalScrollIndicator={false}>
        {participants.map(participant => (
        <Participant 
          key={participant} 
          name={participant}  
          onRemove={handleRemoveParticipantClick} 
        />
        ))}
      </ScrollView> */}

      {
      //Mais performático, carrega os componentes de acordo com o que eles estão prestes a aparecer na tela, e remove os componentes que somem
      }
      <FlatList
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
            key={item} 
            name={item}  
            onRemove={() => handleRemoveParticipantClick(item)} 
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Não chegou ninguém ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  
  )
}

