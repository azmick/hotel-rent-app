import { Text, View } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [userData, setUserData] = useState(null); // userData state'i tanımlandı

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      if (auth.currentUser) {
        // Kullanıcı oturum açtıysa
        try {
          const userRecord = auth.currentUser;
          console.log('Veri çekildi:', userRecord.toJSON());
          setUserData(userRecord.toJSON());
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <View>
      <Text>
        {userData ? (
          // Burada kullanıcı verilerini kullanabilirsiniz
          `Email: ${userData.email}`
        ) : (
          'Veri yükleniyor...'
        )}
      </Text>
    </View>
  )
}


export default HomePage