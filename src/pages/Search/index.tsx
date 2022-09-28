// import React from 'react';
import React, {useEffect, useState} from 'react';
import {FlatList, SectionList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SearchHeader} from '../../components';
import {PersonNode} from '../../models/TreeViewModel';
import {getParentsByNode, getUsersByName} from '../../service';
import {NodeTile} from './NodeTile';
import {NoSearch} from './NoSearch';
import {Container} from './styles';
import {UserNotFound} from './UserNotFound';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<
    (PersonNode & {parentsNames?: string[]})[]
  >([]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      fetchUsers();
    }
  }, [searchTerm]);

  const fetchUsers = async () => {
    const usersRaw = await getUsersByName(searchTerm);

    const users = await Promise.all(
      usersRaw!.map(async user => {
        const parentsNames = await getParentsByNode(user);
        return {
          ...user,
          parentsNames,
        };
      }),
    );

    setUsers(users);
  };

  return (
    <Container>
      <SearchHeader onChangeSearchTerm={setSearchTerm} />
      {!searchTerm ? (
        <NoSearch />
      ) : (
        <SectionList
          sections={[
            {
              title: 'Users',
              data: users,
            },
          ]}
          renderItem={({item}) => {
            return <NodeTile name={item.name} parents={item.parentsNames} />;
          }}
          ListFooterComponent={UserNotFound}
        />
      )}
    </Container>
  );
};