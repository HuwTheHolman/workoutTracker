import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";

export default function WorkoutInfoScreen() {
  const listData = [
    {
      id: "1",
      title: "First Exercise",
      description: "This is the first exercise description",
      repRange: "6-12",
      currentWorkingWeight: "60kg",
    },
    {
      id: "2",
      title: "Second Exercise",
      description: "This is the second exercise description",
      repRange: "6-12",
      currentWorkingWeight: "60kg",
    },
    {
      id: "3",
      title: "Third Exercise",
      description: "This is the third exercise description",
      repRange: "6-12",
      currentWorkingWeight: "60kg",
    },
    {
      id: "4",
      title: "Fourth Exercise",
      description: "This is the fourth exercise description",
      repRange: "6-12",
      currentWorkingWeight: "60kg",
    },
    {
      id: "5",
      title: "Fifth Exercise",
      description: "This is the fifth exercise description",
      repRange: "6-12",
      currentWorkingWeight: "60kg",
    },
  ];

  // State to track which item's modal is open (null means no modal open)
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to open modal with specific item
  const openModal = (item) => {
    setSelectedItem(item);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedItem(null);
  };

  // Render each interactable list item
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => openModal(item)}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercise List</Text>

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      {/* Modal that shows when an item is selected */}
      <Modal
        visible={selectedItem !== null} // Show modal when an item is selected
        animationType="fade" // Fade in/out animation
        transparent={true} // Allows background to show through
        onRequestClose={closeModal} // Android back button closes modal
      >
        {/* Semi-transparent background that closes modal when tapped */}
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1} // Prevents opacity change on press
          onPress={closeModal} // Close modal when background tapped
        >
          {/* Modal content - stops the background tap from propagating */}
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1} // Prevents opacity change
            onPress={() => {}} // Empty function stops tap propagation
          >
            {/* X button to close modal */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            {/* Display the selected item's content */}
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedItem.description}
                </Text>
                <Text style={styles.modalDescription}>
                  Rep Range : {selectedItem.repRange}
                </Text>
                <Text style={styles.modalDescription}>
                  Working Weight : {selectedItem.currentWorkingWeight}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listItem: {
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
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    position: "relative", // Allows absolute positioning of close button
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10, // Space for close button
  },
  modalDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
