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

const Cards = (title,description) => {
  const { colors, isV3 } = useTheme();
  const TextComponent = isV3 ? Text : Paragraph;
  const modes = 'contained'


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
        </Card.Actions>
          <TextComponent variant="bodyMedium">
          </TextComponent>
        </Card.Content>

      </Card>
    </View>
  )
}

export default Cards