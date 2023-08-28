import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Input } from "../../components/Input";
import { Container, Content, Icon } from "./styles";
import { useState } from "react";
import { groupCreate } from "../../storage/group/groupCreate";
import { AppError } from "../../utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [ group, setGroup ] = useState('')
  const navigation = useNavigation();

  async function handleNew () {
    try {
      if(group.trim().length === 0)
        return Alert.alert('Novo Grupo', 'Informe o nome da turma');

      await groupCreate(group);
      navigation.navigate('players', { group })

    } catch (err) {
      if(err instanceof AppError) {
        Alert.alert('Novo Grupo', err.message);
      } else {
        Alert.alert('Não foi possível criar um novo grupo.');
        console.log(err)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight 
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button 
          title="Criar"
          style={{marginTop: 20}}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}