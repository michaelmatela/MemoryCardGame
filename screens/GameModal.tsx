import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Modal, Switch } from 'react-native';

type GameModalProps = {
  isVisible: boolean;
  isGameEnd: boolean;
  turnNumber: number;
  score: number;
  cardLength: number | string;
  buttonTitle: string;
  isEasyEnabled:boolean;
  toggleEasySwitch: (value: boolean) => void;
  handleInputChange: (text: string) => void;
  handleRestart: () => void;
  handleClose: () => void;
};

const GameModal: React.FC<GameModalProps> = ({
  isVisible,
  isGameEnd,
  turnNumber,
  score,
  cardLength,
  buttonTitle,
  isEasyEnabled,
  toggleEasySwitch,
  handleInputChange,
  handleRestart,
  handleClose,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={isVisible} onRequestClose={handleClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {isGameEnd && (
            <Text style={styles.modalText}>
              Congratulations! You finished the game. It took you {turnNumber} turns and a score of {score} points.
            </Text>
          )}
          <Text style={styles.modalText}>Please input a number from 1 to any number greater than 1.</Text>
          <TextInput
            style={styles.input}
            value={cardLength.toString()}
            onChangeText={handleInputChange}
            keyboardType="numeric"
            placeholder="Enter number"
          />
          <Text style={styles.modalText}>Turn {isEasyEnabled ? 'OFF' : 'ON'} easy mode?</Text>
          <Switch
            value={isEasyEnabled}
            onValueChange={toggleEasySwitch}
            trackColor={{ false: "#444444", true: "#64B5F6" }}
            thumbColor={isEasyEnabled ? "#64B5F6" : "#444444"}
          />
          <Button title={buttonTitle} onPress={handleRestart} />
          <Button title="Close" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
  },
});

export default GameModal;