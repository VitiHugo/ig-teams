import { FlatList, StyleSheet, Text } from 'react-native';
import { Container } from './styles';
import { Header } from '../../components/Header';
import { Highlight } from '../../components/Highlight';
import { GroupCard } from '../../components/GroupCard';
import { useEffect, useState, useCallback } from 'react';
import { ListEmpty } from '../../components/ListEmpty';
import { Button } from '../../components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { groupsGetAll } from '../../storage/group/groupsGetAll';


export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();  

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (err) {
      console.log('erro:', err);
    }
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

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}
        contentContainerStyle={groups.length == 0 && { flex: 1}}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        }
      />

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}