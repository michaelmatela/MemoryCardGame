import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import GameModal from './screens/GameModal';
import GameHeader from './screens/GameHeader';
import CardContainer from './screens/CardContainer';

type Card = {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [turnNumber, setTurnNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [buttonTitle, setButtonTitle] = useState<string>("Start Game");
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [cardLenght, setCardLenght] = useState<number | string>('');
  const [firstPick, setFirstPick] = useState<number>(-1);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [isEasyEnabled, setIsEasyEnabled] = useState(false);

  const handleInputChange = (text: string) => {
      setCardLenght(text); 
  };

  const shuffleArray = (originArray: Card[]): Card[] => {
    let shuffledArray = [...originArray];
    for (let origin = shuffledArray.length - 1; origin > 0; origin--) {
      const randomizer = Math.floor(Math.random() * (origin + 1));
      [shuffledArray[origin], shuffledArray[randomizer]] = [shuffledArray[randomizer], shuffledArray[origin]];
    }
    return shuffledArray;
  };

  const handleCardPress = (index: number) => {
    if (flippedIndices.length == 0) {
      setFirstPick(index);
    }
    
    if (flippedIndices.length < parseInt(cardLenght.toString()) + 1 && !cards[index].isFlipped) {
      handleCardPick(index);
      
      if (flippedIndices.length === 1) {
        const [firstIndex] = flippedIndices;
        
        if (cards[firstIndex].value === cards[index].value) {
          handleCardMatched(index, firstIndex);
        } else {
          handleCardDidNotMatched(index, firstIndex);
        }
      }
    } 
  };

  const handleCardPick = (index: number) => {
    if (firstPick != index) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[index].isFlipped = true;
        return newCards;
      });
      setFlippedIndices((prevFlippedIndices) => [...prevFlippedIndices, index]);
    }
  };

  const handleCardDidNotMatched = (index: number, firstIndex: number) => {
    if (firstPick != index) {
      setTimeout(() => {
        setCards((prevCards) => {
          const newCards = [...prevCards];
          newCards[firstIndex].isFlipped = false;
          newCards[index].isFlipped = false;
          return newCards;
        });
        setTurnNumber(turnNumber + 1);
        setFlippedIndices([]);
      }, 1000);
    }
  };

  const handleCardMatched = (index: number, firstIndex: number) => {
    if (firstPick != index) {
      setTimeout(() => {
        setCards((prevCards) => {
          const newCards = [...prevCards];
          newCards[firstIndex].isMatched = true;
          newCards[index].isMatched = true;
          return newCards;
        });
        setScore(score + 1);
        setTurnNumber(turnNumber + 1);
        setFlippedIndices([]);
        handleGameOver();
      }, 1000);
    }
  };

  const handleGameOver = () => {
    if (score + 1 == parseInt(cardLenght.toString())) {
      setIsGameEnd(true);
      setIsModalVisible(true);
      setCardLenght(parseInt(cardLenght.toString()) + 1);
    }
  }

  const handleRestart = () => {
    setIsModalVisible(false);
    setIsGameEnd(false);
    setTurnNumber(0);
    setScore(0);
    setFirstPick(-1);
    setButtonTitle("Restart Game");
    const initialCards = Array.from({ length: parseInt(cardLenght.toString()) }, (_, index) => ({
      id: index,
      value: index + 1,
      isFlipped: false,
      isMatched: false,
    }));
    const doubledCards = [...initialCards, ...initialCards];
    setCards(shuffleArray(doubledCards));
    setFlippedIndices([]);

    
    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, isFlipped: true }))
      );
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => ({ ...card, isFlipped: false }))
        );
      }, isEasyEnabled ? 2000 : 0) ;
    }, 0);
  };

  const toggleEasySwitch = () => setIsEasyEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <GameModal
          isVisible={isModalVisible}
          isGameEnd={isGameEnd}
          turnNumber={turnNumber}
          score={score}
          cardLength={cardLenght}
          buttonTitle={buttonTitle}
          isEasyEnabled={isEasyEnabled}
          toggleEasySwitch={toggleEasySwitch}
          handleInputChange={handleInputChange}
          handleRestart={handleRestart}
          handleClose={() => setIsModalVisible(false)}
          />
          <View style={styles.gameContainer}>
            <GameHeader
              turnNumber={turnNumber}
              score={score}
              buttonTitle={buttonTitle}
              onButtonPress={() => setIsModalVisible(true)}
            />
            <CardContainer
              cards={cards}
              flippedIndices={flippedIndices}
              handleCardPress={handleCardPress}
            />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex:1,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  gameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
}); 
