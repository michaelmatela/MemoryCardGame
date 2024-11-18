import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

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
  const renderItem = ({ item, index }: { item: Card; index: number }) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.card,
          item.isFlipped && styles.flippedCard,
          item.isFlipped && flippedIndices.includes(index) && styles.flippedCard,
          item.isMatched && styles.matchedCard,
        ]}
        onPress={() => handleCardPress(index)}
        disabled={flippedIndices.length === 2}
      >
        {item.isFlipped && <Text style={styles.cardText}>{item.value}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} 
        contentContainerStyle={styles.flatListContent} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 2,
  },
  
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
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