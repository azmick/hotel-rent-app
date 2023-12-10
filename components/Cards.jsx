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

const Cards = () => {
  const { colors, isV3 } = useTheme();
  const TextComponent = isV3 ? Text : Paragraph;
  const modes = 'contained'


  return (
    <>
      <Card style={styles.card} >
        <Card.Cover
          source={require('../assets/deneme.jpg')}
        />
        <Card.Title title="Abandoned Ship" />
        <Card.Content>
          <TextComponent variant="bodyMedium">
            The Abandoned Ship is a wrecked ship located on Route 108 in
            Hoenn, originally being a ship named the S.S. Cactus. The second
            part of the ship can only be accessed by using Dive and contains
            the Scanner.
          </TextComponent>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.cardButton} onPress={() => { }}>Share</Button>
          <Button onPress={() => { }}>Explore</Button>
        </Card.Actions>
      </Card>
    </>
  )
}

export default Cards