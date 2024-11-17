import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

type Card = {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
};

type CardContainerProps = {
  cards: Card[];
  flippedIndices: number[];
  handleCardPress: (index: number) => void;
};

const CardContainer: React.FC<CardContainerProps> = ({ cards, flippedIndices, handleCardPress }) => {
  return (
    <View style={styles.cardContainer}>
      {cards.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.card,
            card.isFlipped && styles.flippedCard,
            card.isFlipped && flippedIndices.includes(index) && styles.flippedCard,
            card.isMatched && styles.matchedCard,
          ]}
          onPress={() => handleCardPress(index)}
          disabled={flippedIndices.length === 2}
        >
          {card.isFlipped && <Text style={styles.cardText}>{card.value}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 150,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  flippedCard: {
    backgroundColor: '#64B5F6',
  },
  matchedCard: {
    backgroundColor: '#444444',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default CardContainer;
