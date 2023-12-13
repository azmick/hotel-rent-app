import React from 'react'
import {
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  useTheme,
  Chip,
  Text,
} from 'react-native-paper';
import { styles } from '../styles/Style'
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CButton } from './CButton';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../FirebaseConfig';

const Cards = ({title,description,id}) => {
  const { colors, isV3 } = useTheme();
  const TextComponent = isV3 ? Text : Paragraph;
  const modes = 'contained'

  const deleteRoom = async (roomId) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, 'room', roomId));
      console.log('Room deleted successfully');
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleDelete = () => {
    // Bu fonksiyon, AdminPanelPage bileşeninden gelen deleteRoom fonksiyonunu çağırır.
    // id prop'unu kullanarak hangi odanın silineceğini belirler.
    deleteRoom(id);
  };
  
  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card} >
        <Card.Cover
          source={require('../assets/deneme.jpg')}
        />
        <Card.Title title={title} />
        <Card.Content>
        <Card.Actions style={styles.cardButton} >
          <CButton title='Share' style={styles.shareButton} backgroundcolor='white' textcolor='rgb(103, 80, 164)' functions={()=>{}} />
          <CButton title='Explore' style={styles.shareButton} backgroundcolor='rgb(103, 80, 164)' textcolor='white' functions={()=>{}} />
          <CButton title='Delete' style={styles.shareButton} backgroundcolor='rgb(103, 80, 164)' textcolor='white' functions={handleDelete} />
        </Card.Actions>
          <TextComponent variant="bodyMedium">
          </TextComponent>
        </Card.Content>

      </Card>
    </View>
  )
}

export default Cards