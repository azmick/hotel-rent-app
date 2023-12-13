import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';  // Doğru paketi import et

import Cards from '../components/Cards';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { styles } from '../styles/Style';

function AdminPanelPage() {
  const [rooms, setRooms] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomCollectionRef = collection(FIRESTORE_DB, 'room');

        const initialQuerySnapshot = await getDocs(roomCollectionRef);
        const initialRoomData = [];
        initialQuerySnapshot.forEach((doc) => {
          initialRoomData.push({ id: doc.id, ...doc.data() });
        });
        setRooms(initialRoomData);

        const unsubscribe = onSnapshot(roomCollectionRef, (querySnapshot) => {
          const updatedRoomData = [];
          querySnapshot.forEach((doc) => {
            updatedRoomData.push({ id: doc.id, ...doc.data() });
          });
          setRooms(updatedRoomData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchData();
  }, []);

  const addRoom = async () => {
    try {
      await addDoc(collection(FIRESTORE_DB, 'room'), {
        title: titleInput,
        description: descInput,
        isRented: false,
        email: '',
      });
      setTitleInput('');
      setDescInput('');
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={styles.textInputContainer}>
          <Text>Admin Panel</Text>
          <TextInput
            placeholder='Daire Tipi'
            onChangeText={(text) => setTitleInput(text)}
            style={{ backgroundColor: 'white' }}
            value={titleInput}
          />
          <TextInput
            placeholder='Açıklama'
            onChangeText={(text) => setDescInput(text)}
            style={{ backgroundColor: 'white' }}
            maxLength={100}
            value={descInput}
          />
          <Button onPress={addRoom} style={{ backgroundColor: 'green', margin: 10 }} textColor='white'>
            Daire Ekle
          </Button>
        </View>
        {rooms.map((room) => (
          <Cards key={room.id} title={room.title} description={room.description} id={room.id} isAdmin={true} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AdminPanelPage;
