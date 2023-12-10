import React from 'react'
import Cards  from '../components/Cards';
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

function HomePage() {
  return (
    <ScrollView>
    <Text>HomePage</Text>
    <Cards/>
    <Cards/>
    </ScrollView>

  )
}

export default HomePage