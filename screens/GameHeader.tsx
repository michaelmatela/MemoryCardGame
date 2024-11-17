import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

type GameHeaderProps = {
  turnNumber: number;
  score: number;
  buttonTitle: string;
  onButtonPress: () => void;
};

const GameHeader: React.FC<GameHeaderProps> = ({ turnNumber, score, buttonTitle, onButtonPress }) => {
  return (
    <View>
      <Text style={styles.text}>Memory Game</Text>
      <Text style={styles.subText}>
        Turns: {turnNumber} Score: {score}
      </Text>
      <Button title={buttonTitle} onPress={onButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default GameHeader;
