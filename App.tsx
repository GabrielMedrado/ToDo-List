import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from './components/Task';

export default function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [taskName, setTaskName] = useState("");

  function handleTaskAdd() {
    if(tasks.includes(taskName)) {
      return Alert.alert("Tarefa já adicionada", "Essa tarefa já foi adicionada à lista.");
    }

    setTasks(prevState => [...prevState, taskName]);
    setTaskName("");
  }

  function handleTaskRemove(task: string) {
    Alert.alert("Remover tarefa", `Deseja remover a tarefa "${task}"?`, [
      {
        text: "Sim",
        onPress: () => {
          setTasks(prevState => prevState.filter(someTask => someTask !== task));
          if (completedTasks > 0) {
            setCompletedTasks(prev => prev - 1);
          }
        }
      },
      {
        text: "Não",
        style: "cancel"
      }
    ]);
  }

  function handleTaskCheck(isChecked: boolean) {
    setCompletedTasks(prev => isChecked ? prev + 1 : prev - 1);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
  
      <View style={styles.topContainer}>
        <Image
          source={require('./assets/rocketLogo.png')}
          style={styles.rocketLogo} 
        />
      </View>
  
      <View style={styles.underContainer}>
        <TextInput 
          style={styles.inputTask}
          placeholder='Adicione uma nova tarefa'
          placeholderTextColor='#808080'
          onChangeText={setTaskName}
          value={taskName}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleTaskAdd}
        >
          <Image
            source={require('./assets/plus.png')}
            style={styles.plusLogo} 
          />
        </TouchableOpacity>
      </View>
  
      <View style={styles.finalContainer}>
        <View style={styles.calcTask}>
          <Text style={styles.calcTaskText}>Criadas: {tasks.length}</Text>
          <Text style={[styles.calcTaskText, styles.calcTaskCompleted]}>Concluídas: {completedTasks}</Text>
        </View>
  
        <View style={styles.underFinalContaier}>
          <FlatList 
            data={tasks}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Task 
                task={item}
                onRemove={() => handleTaskRemove(item)}
                onCheck={handleTaskCheck}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.listEmptyContainer}>
                <Image 
                source={require('./assets/Clipboard.png')}
                style={styles.listEmptyIcon} 
                />
                <Text style={styles.listEmptyText}>Nenhuma tarefa adicionada ainda.</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    fontFamily: 'Inter',
  },
  topContainer: {
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingBottom: 20,
  },
  rocketLogo: {
    width: 140,
    height: 40,
    marginTop: 30,
    marginBottom: 20,
  },
  underContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10, 
    backgroundColor: '#1A1A1A',
    marginBottom: 20,
  },
  inputTask: {
    flex: 1,
    height: 56,
    backgroundColor: '#262626',
    borderRadius: 5,
    paddingHorizontal: 16,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#0D0D0D',
    marginRight: 10,
    marginLeft: 10,
    marginTop: -30,
  }, 
  button: {
    backgroundColor: '#1E6F9F',
    width: 56,
    height: 56,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  plusLogo: {
    width: 16,
    height: 16,
  },
  finalContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  calcTask: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    marginBottom: 10,
  },
  calcTaskText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  calcTaskCompleted: {
    color: '#4EA8DE', // Cor diferenciada para "Concluídas"
    fontWeight: 'bold',
  },
  underFinalContaier: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  listEmptyIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
    tintColor: '#4EA8DE', // Cor para o ícone vazio
  },
  listEmptyText: {
    color: "#808080",
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
