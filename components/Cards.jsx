import React, { useState } from 'react';
import {
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  useTheme,
  Chip,
  Text,
  TextInput, // Ekledik
} from 'react-native-paper';
import { styles } from '../styles/Style';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CButton } from './CButton';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'; // updateDoc ekledik
import { FIRESTORE_DB } from '../FirebaseConfig';
import { any } from 'prop-types';

const Cards = ({ title, description, id, isAdmin }) => {
  const { colors, isV3 } = useTheme();
  const TextComponent = isV3 ? Text : Paragraph;
  const modes = 'contained';
  const [editingCard, setEditingCard] = useState(null);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const startEditing = (roomId) => {
    setEditingCard(roomId);
  };

  const deleteRoom = async (roomId) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, 'room', roomId));
      console.log('Room deleted successfully');
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const updateRoom = async (roomId) => {
    try {
      await updateDoc(doc(FIRESTORE_DB, 'room', roomId), {
        title: editedTitle,
        description: editedDescription,
      });
      console.log('Room updated successfully');
      setEditingCard(null); // Düzenleme modunu kapat
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleDelete = () => {
    deleteRoom(id);
  };

  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Cover source={require('../assets/deneme.jpg')} />
        <Card.Content>
          {editingCard === id ? (
            // Düzenleme modunda ise Title için TextInput göster
            <TextInput
              value={editedTitle}
              onChangeText={(text) => setEditedTitle(text)}
            />
          ) : (
            // Düzenleme modunda değilse normal Title'ı göster
            <TextComponent variant='bodyLarge'>{editedTitle}</TextComponent>
          )}

          {editingCard === id ? (
            // Düzenleme modunda ise Description için TextInput göster
            <TextInput
              value={editedDescription}
              onChangeText={(text) => setEditedDescription(text)}
            />
          ) : (
            // Düzenleme modunda değilse normal Description'ı göster
            <TextComponent variant='bodySmall'>{description}</TextComponent>
          )}

          <Card.Actions style={styles.cardButton}>
            <CButton
              title="Share"
              style={styles.shareButton}
              backgroundcolor="white"
              textcolor="rgb(103, 80, 164)"
              functions={() => { }}
            />
            <CButton
              title="Explore"
              style={styles.shareButton}
              backgroundcolor="rgb(103, 80, 164)"
              textcolor="white"
              functions={() => { }}
            />

{isAdmin ? (
  editingCard === id ? (
    // Düzenleme modunda ise "Save" butonunu göster
    <CButton
      title="Save"
      style={styles.shareButton}
      backgroundcolor="green"
      textcolor="white"
      functions={() => updateRoom(id)}
    />
  ) : (
    // Düzenleme modunda değilse "Edit" butonunu göster
    <CButton
      title="Edit"
      style={styles.shareButton}
      backgroundcolor="skyblue"
      textcolor="white"
      functions={() => startEditing(id)}
    />
  )
) : (
  <CButton
    title="Delete"
    style={styles.shareButton}
    backgroundcolor="red"
    textcolor="white"
    functions={handleDelete}
  />
)}

          </Card.Actions>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Cards;

