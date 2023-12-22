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
import { messaging } from '@react-native-firebase/messaging'; // FCM kütüphanesini ekleyin
import { FIRESTORE_DB } from '../FirebaseConfig';
import { any } from 'prop-types';


const Cards = ({ title, description, id, isAdmin, currentUserEmail }) => {
  const { colors, isV3 } = useTheme();
  const TextComponent = isV3 ? Text : Paragraph;
  const modes = 'contained';
  const [editingCard, setEditingCard] = useState(null);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isRented, setIsRented] = useState(false)

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

  const rentRoom = async (roomId) => {
    try {

      setIsRented(true)
      const roomDocRef = doc(FIRESTORE_DB, 'room', roomId);
  
      // 'room' dokümanındaki verileri al
      const roomDocSnapshot = () => roomDocRef.get();
      const roomData = () => roomDocSnapshot.data();
      await updateDoc(roomDocRef, {
        isRented: true,
        email: currentUserEmail,
      });
      sendNotification(roomData.title);

      console.log('Room rented successfully');
    } catch (error) {
      console.error('Error renting room:', error);
    }
  }
  
  const sendNotification = async (roomTitle) => {
    try {
      // FCM ile bildirim gönderme
      console.log('deneme1')
      const fcmToken = await messaging().getToken();
      const notification = {
        to: fcmToken,
        notification: {
          title: 'Kiralama Başarılı',
          body: `Oda "${roomTitle}" başarıyla kiralandı.`,
        },
      };
      console.log('deneme2')
      

      // FCM API'yi kullanarak bildirim gönderme
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `722870931471`, // Server Key bilgisini buraya ekleyin
        },
        body: JSON.stringify(notification),
      });
      console.log('deneme3')


      const result = () => response.json();
      console.log('Notification sent successfully:', result);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };


  const handleDelete = () => {
    deleteRoom(id);
  };

  const handleRent = () => {
    // Burada, kullanıcının e-posta adresini almanız gerekecek.
    // Örneğin, kullanıcının oturum açmış olduğu bir sistemde bu bilgiye ulaşabilirsiniz.  
    rentRoom(id);
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
              maxLength={100}
            />
          ) : (
            // Düzenleme modunda değilse normal Description'ı göster
            <TextComponent variant='bodySmall' style={{ height: 50, marginBottom: 30 }}>{description}</TextComponent>
          )}

          <Card.Actions style={styles.cardButton}>
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
                <>
                  <CButton
                    title="Güncelle"
                    style={styles.shareButton}
                    backgroundcolor="skyblue"
                    textcolor="white"
                    functions={() => startEditing(id)}
                  />
                  <CButton
                    title="Sil"
                    style={styles.shareButton}
                    backgroundcolor="red"
                    textcolor="white"
                    functions={handleDelete}
                  />
                </>
              )
            ) : (
              // Admin değilse "Delete" butonunu göster
              null
            )}

            {isAdmin ? null : ( // Admin değilse göster
              <>
                <CButton
                  title="Kirala"
                  style={styles.shareButton}
                  backgroundcolor={!isRented ? "rgb(103, 80, 164)" : "grey"}
                  textcolor="white"
                  functions={handleRent}
                  isDisabled={isRented}
                />
              </>
            )}
          </Card.Actions>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Cards;