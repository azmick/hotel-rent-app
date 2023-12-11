import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards';
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { Button } from 'react-native-paper';
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Add this line

function AdminPanelPage() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'room'));
        const roomData = [];
        querySnapshot.forEach((doc) => {
          roomData.push({ id: doc.id, ...doc.data() });
        });
        setRooms(roomData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
    fetchData()
  }, [])

  const addRoom = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, 'room'), { title: 'Oda eklendi', done: false })
    console.log("doc:", doc)
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Text>HomePage</Text>
      <Button onPress={() => { addRoom(); }}>Add Room</Button>
      {rooms.map((room) => (
        <Cards key={room.id} title={room.title} done={room.done} />
      ))}
    </ScrollView>

  )
}


export default AdminPanelPage