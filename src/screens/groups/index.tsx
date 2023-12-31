import { Alert, FlatList, StyleSheet, Text } from 'react-native';
import { Container } from './styles';
import { Header } from '../../components/Header';
import { Highlight } from '../../components/Highlight';
import { GroupCard } from '../../components/GroupCard';
import { useEffect, useState, useCallback } from 'react';
import { ListEmpty } from '../../components/ListEmpty';
import { Button } from '../../components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { groupsGetAll } from '../../storage/group/groupsGetAll';
import { Loading } from '../../components/Loading';


export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();  

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await groupsGetAll();
      
      setGroups(data);
    } catch (err) {
      Alert.alert("Turmas", "Não foi possível carregar as turmas")
      console.log('erro:', err);
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []))

  return (
    <Container>
      <Header showBackButton={false}/>
      <Highlight
        title="Turmas"
        subtitle="Jogue com a sua turma"
      />
      {isLoading ? <Loading /> : 
      
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item} 
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length == 0 && { flex: 1}}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          }
        />
      }

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}