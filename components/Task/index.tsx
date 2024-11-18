// Task.tsx
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState } from "react";

type Props = {
  task: string;
  onRemove: () => void;
  onCheck: (isChecked: boolean) => void;
};

export function Task({ task, onRemove, onCheck }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    const newCheckStatus = !isChecked;
    setIsChecked(newCheckStatus);
    onCheck(newCheckStatus);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkButton, isChecked && styles.checkButtonChecked]}
        onPress={handleCheck}
      >
        {isChecked && (true)}
      </TouchableOpacity>

      <Text style={[styles.task, isChecked && styles.taskChecked]}>{task}</Text>

      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Image
          source={require('../../assets/trash.png')}
          tintColor={'#FFF'}
        />
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 5,
    marginVertical: 5,
  },
  checkButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4EA8DE',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
  },
  checkButtonChecked: {
    backgroundColor: '#8284FA', 
    borderColor: '#5E60CE',
  },
  task: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    textAlignVertical: 'center',
  },
  taskChecked: {
    color: '#808080',
    textDecorationLine: 'line-through',
  },
  button: {
    backgroundColor: '#E23C44',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 8,
  },
});
