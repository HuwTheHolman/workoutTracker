import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";

export default function WorkoutTrackerScreen() {
  // List of exercises
  const exerciseList = [
    { id: "1", name: "Bench Press", description: "5r x 82.5kg, 4r x 82.5kg" },
    {
      id: "2",
      name: "Single Arm Lat Pulldown Machine",
      description: "10r x 70kg, 8r x 67.5kg",
    },
    {
      id: "3",
      name: "Incline Bench Press",
      description: "10r x 60kg, 8r x 60kg",
    },
    { id: "4", name: "T-bar Row", description: "6r x 55kg, 4r x 55kg" },
    { id: "5", name: "Kelso Shrugs", description: "10r x 55kg, 6r x 55kg" },
  ];

  // Main state: holds ALL workout data for ALL exercises
  const [workoutData, setWorkoutData] = useState({
    date: new Date().toISOString().split("T")[0], // Today's date (YYYY-MM-DD)
    exercises: {}, // Will store data for each exercise by ID
  });

  const [selectedExercise, setSelectedExercise] = useState(null);

  const openExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
  };

  const closeExerciseModal = () => {
    setSelectedExercise(null);
  };

  // Get the current exercise's sets (or empty array if none exist)
  const getCurrentSets = () => {
    if (!selectedExercise) return [];
    return workoutData.exercises[selectedExercise.id]?.sets || [];
  };

  // Update the workout data for the current exercise
  const updateExerciseData = (newSets) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercises: {
        ...prevData.exercises,
        [selectedExercise.id]: {
          exercise: selectedExercise,
          sets: newSets,
          lastUpdated: new Date().toISOString(),
        },
      },
    }));
  };

  // Function to add a new set
  const addNewSet = () => {
    const currentSets = getCurrentSets();
    const newSet = {
      id: Date.now().toString(),
      reps: "",
      weight: "",
      notes: "",
    };
    updateExerciseData([...currentSets, newSet]);
  };

  // Function to update a specific set
  const updateSet = (setId, field, value) => {
    const currentSets = getCurrentSets();
    const updatedSets = currentSets.map((set) => {
      if (set.id === setId) {
        return { ...set, [field]: value };
      }
      return set;
    });
    updateExerciseData(updatedSets);
  };

  // Function to remove a set
  const removeSet = (setId) => {
    const currentSets = getCurrentSets();
    const updatedSets = currentSets.filter((set) => set.id !== setId);
    updateExerciseData(updatedSets);
  };

  // Function to clear all sets for current exercise
  const clearExercise = () => {
    updateExerciseData([]);
  };

  // Check if an exercise has any data
  const exerciseHasData = (exerciseId) => {
    return workoutData.exercises[exerciseId]?.sets?.length > 0;
  };

  const renderExerciseItem = ({ item }) => {
    const hasData = exerciseHasData(item.id);

    return (
      <TouchableOpacity
        style={styles.exerciseItem}
        onPress={() => openExerciseModal(item)}
      >
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseTextContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDescription}>{item.description}</Text>
          </View>
          {hasData && (
            <View style={styles.dataIndicator}>
              <Text style={styles.dataIndicatorText}>
                {workoutData.exercises[item.id].sets.length} sets
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSetItem = ({ item, index }) => {
    return (
      <View style={styles.setRow}>
        <Text style={styles.setNumber}>{index + 1}</Text>

        <TextInput
          style={styles.setInput}
          placeholder="Reps"
          value={item.reps}
          onChangeText={(text) => updateSet(item.id, "reps", text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.setInput}
          placeholder="Weight"
          value={item.weight}
          onChangeText={(text) => updateSet(item.id, "weight", text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.setInputWide}
          placeholder="Notes"
          value={item.notes}
          onChangeText={(text) => updateSet(item.id, "notes", text)}
        />

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeSet(item.id)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const currentSets = getCurrentSets();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Today's Workout</Text>
        <Text style={styles.dateText}>{workoutData.date}</Text>
      </View>

      <FlatList
        data={exerciseList}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      {/* Exercise Tracking Modal */}
      <Modal
        visible={selectedExercise !== null}
        animationType="slide"
        onRequestClose={closeExerciseModal}
      >
        <View style={styles.modalContainer}>
          {selectedExercise && (
            <>
              {/* Header with exercise info */}
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={closeExerciseModal}
                >
                  <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                <View style={styles.exerciseInfo}>
                  <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
                  <Text style={styles.modalSubtitle}>
                    {selectedExercise.description}
                  </Text>
                </View>

                {currentSets.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearExercise}
                  >
                    <Text style={styles.clearButtonText}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Sets list */}
              <ScrollView style={styles.setsContainer}>
                <Text style={styles.setsHeader}>Sets</Text>

                {currentSets.length === 0 ? (
                  <Text style={styles.noSetsText}>
                    No sets added yet. Tap "Add Set" to begin.
                  </Text>
                ) : (
                  <FlatList
                    data={currentSets}
                    renderItem={renderSetItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                  />
                )}
              </ScrollView>

              {/* Bottom buttons */}
              <View style={styles.bottomButtons}>
                <TouchableOpacity
                  style={styles.addSetButton}
                  onPress={addNewSet}
                >
                  <Text style={styles.addSetButtonText}>+ Add Set</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  debugButton: {
    backgroundColor: "#666",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 10,
  },
  debugButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  exerciseItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseTextContainer: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#666",
  },
  dataIndicator: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dataIndicatorText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modalHeader: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  exerciseInfo: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  clearButton: {
    alignSelf: "center",
    backgroundColor: "#ff4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  setsContainer: {
    flex: 1,
    padding: 16,
  },
  setsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  noSetsText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 50,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  setNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: 25,
    textAlign: "center",
  },
  setInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 4,
    textAlign: "center",
  },
  setInputWide: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 4,
  },
  removeButton: {
    backgroundColor: "#ff4444",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomButtons: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  addSetButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addSetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
