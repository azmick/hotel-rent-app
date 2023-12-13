import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards';
import { Text, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { Button } from 'react-native-paper';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore'; // Add this line

function AdminPanelPage() {
  const [rooms, setRooms] = useState([])
  const [titleInput, setTitleInput] = useState('')
  const [descInput, setDescInput] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomCollectionRef = collection(FIRESTORE_DB, 'room');

        // İlk veri çekimi
        const initialQuerySnapshot = await getDocs(roomCollectionRef);
        const initialRoomData = [];
        initialQuerySnapshot.forEach((doc) => {
          initialRoomData.push({ id: doc.id, ...doc.data() });
        });
        setRooms(initialRoomData);

        // Gerçek zamanlı güncellemeleri dinleme
        const unsubscribe = onSnapshot(roomCollectionRef, (querySnapshot) => {
          const updatedRoomData = [];
          querySnapshot.forEach((doc) => {
            updatedRoomData.push({ id: doc.id, ...doc.data() });
          });
          setRooms(updatedRoomData);
        });

        // Temizleme fonksiyonunu useEffect içinde kullanma
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchData();
  }, []);

  const addRoom = async ({title,description}) => {
    const doc = addDoc(collection(FIRESTORE_DB, 'room'), { title: titleInput, description: descInput})
    console.log("doc:", doc)
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Text>HomePage</Text>
      <TextInput onChangeText={setTitleInput}></TextInput>
      <TextInput onChangeText={setDescInput}></TextInput>
      <Button onPress={() => { addRoom(titleInput,descInput); }}>Add Room</Button>
      {rooms.map((room) => (
        <Cards key={room.id} title={room.title} description={room.description} id={room.id}/>
      ))}
    </ScrollView>

  )
}


export default AdminPanelPage