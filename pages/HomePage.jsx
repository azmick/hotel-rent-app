import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Modal, Text, TextInput, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import Cards from '../components/Cards';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { updateProfile } from 'firebase/auth';

const HomePage = () => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const openMenu = () => {
    setShowMenu(!showMenu);
  };

  const openProfileUpdateModal = () => {
    setShowProfileUpdateModal(true);
  };

  const closeProfileUpdateModal = () => {
    setShowProfileUpdateModal(false);
  };

  const handleUpdate = async () => {
    try {
      // Firebase üzerinde kullanıcının email ve password'ünü güncellemek için uygun bir fonksiyon kullanın
      await updateProfile(newEmail, newPassword);
      // Profil güncellendikten sonra modal'ı kapatın
      closeProfileUpdateModal();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomCollectionRef = collection(FIRESTORE_DB, 'room');
        const initialQuerySnapshot = await getDocs(roomCollectionRef);
        const initialRoomData = initialQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRooms(initialRoomData);

        const unsubscribe = onSnapshot(roomCollectionRef, (querySnapshot) => {
          const updatedRoomData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setRooms(updatedRoomData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <TouchableOpacity onPress={openMenu}>
        <MaterialIcons name="account-circle" style={{ marginBottom: 5 }} size={30} color="black" />
      </TouchableOpacity>
      {showMenu ? (
        <View style={{ zIndex: 1, marginBottom: 5, borderRadius: 10, overflow: 'hidden', elevation: 5 }}>
          <Menu.Item style={{ backgroundColor: 'white' }} leadingIcon="pen" onPress={openProfileUpdateModal} title="Profili Güncelle" />
          <Menu.Item style={{ backgroundColor: 'white' }} leadingIcon="logout" onPress={() => { navigation.navigate('Login'); }} title="Çıkış Yap" />
        </View>
      ) : null}
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
        {rooms.map((room) => (
          <Cards key={room.id} title={room.title} description={room.description} id={room.id} isAdmin={false} />
        ))}
      </ScrollView>
      <Modal transparent={true} visible={showProfileUpdateModal} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text>Email:</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
              onChangeText={(text) => setNewEmail(text)}
            />
            <Text>Password:</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
            />
            <Button title="Güncelle" onPress={handleUpdate} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomePage;
