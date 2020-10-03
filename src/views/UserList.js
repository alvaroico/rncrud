import React from 'react';
import {View, FlatList, Alert} from 'react-native';
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import users from '../data/users';

function confirmUserDeletion(user) {
  Alert.alert('Excluir Usurário', 'Deseja excluir o usuário?', [
    {
      text: 'Sim',
      onPress() {
        console.warn('delete' + user.id);
      },
    },
    {
      text: 'Não',
    },
  ]);
}

function getActions(user, props) {
  return (
    <>
      <Button
        onPress={() => props.navigation.navigate('UserForm', user)}
        type="clear"
        icon={<Icon name="edit" size={25} color="orange" />}
      />
      <Button
        onPress={() => confirmUserDeletion(user)}
        type="clear"
        icon={<Icon name="delete" size={25} color="red" />}
      />
    </>
  );
}

export default (props) => {
  function getUserItem({item: user}) {
    return (
      <ListItem
        bottomDivider
        key={user.id}
        onPress={() => props.navigation.navigate('UserForm', user)}>
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem rightElement={getActions(user, props)} />
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={users}
        renderItem={getUserItem}
      />
    </View>
  );
};
