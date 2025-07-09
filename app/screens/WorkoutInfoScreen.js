import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useState } from "react";

export default function WorkoutInfoScreen() {
  const [listData, setListData] = useState([
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
  ]);

  // State to track which item's modal is open (null means no modal open)
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // Changed values in edit mode
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedRepRange, setEditedRepRange] = useState("");
  const [editedCurrentWorkingWeight, setEditedCurrentWorkingWeight] =
    useState("");

  // Function to open modal with specific item
  const openModal = (item) => {
    setSelectedItem(item);
    setIsEditing(false); // Always start in view mode
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedItem(null);
    setIsEditing(false);
    setEditedTitle("");
    setEditedDescription("");
    setEditedRepRange("");
    setEditedCurrentWorkingWeight("");
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedTitle(selectedItem.title);
    setEditedDescription(selectedItem.description);
    setEditedRepRange(selectedItem.repRange);
    setEditedCurrentWorkingWeight(selectedItem.currentWorkingWeight);
  };

  const saveChanges = () => {
    // Update the item in the listData array
    const updatedListData = listData.map((item) => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          title: editedTitle,
          description: editedDescription,
          repRange: editedRepRange,
          currentWorkingWeight: editedCurrentWorkingWeight,
        };
      }
      return item;
    });

    setListData(updatedListData);

    // Update the selected item to show changes immediately
    setSelectedItem({
      ...selectedItem,
      title: editedTitle,
      description: editedDescription,
      repRange: editedRepRange,
      currentWorkingWeight: editedCurrentWorkingWeight,
    });

    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedTitle("");
    setEditedDescription("");
    setEditedRepRange("");
    setEditedCurrentWorkingWeight("");
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
      <Text style={styles.header}>My Scrollable List</Text>

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <Modal
        visible={selectedItem !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={closeModal}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={() => {}}
          >
            {/* Header with close button and edit button */}
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>

              {!isEditing && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={startEditing}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Conditional content based on editing state */}
            {selectedItem && (
              <>
                {!isEditing ? (
                  // View mode
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
                ) : (
                  // Edit mode
                  <>
                    <TextInput
                      style={styles.editTitleInput}
                      value={editedTitle}
                      onChangeText={setEditedTitle}
                      placeholder="Title"
                      multiline={false}
                    />
                    <TextInput
                      style={styles.editDescriptionInput}
                      value={editedDescription}
                      onChangeText={setEditedDescription}
                      placeholder="Description"
                      multiline={false}
                      numberOfLines={1}
                    />
                    {/* Rep range edit */}
                    <TextInput
                      style={styles.editSingleLineInput}
                      value={editedRepRange}
                      onChangeText={setEditedRepRange}
                      placeholder="Rep Range"
                      multiline={true}
                      numberOfLines={4}
                    />
                    {/* Working weight edit */}
                    <TextInput
                      style={styles.editSingleLineInput}
                      value={editedCurrentWorkingWeight}
                      onChangeText={setEditedCurrentWorkingWeight}
                      placeholder="Working Weight"
                      multiline={true}
                      numberOfLines={4}
                    />
                    {/* Save button */}
                    <View style={styles.saveButtonContainer}>
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={saveChanges}
                      >
                        <Text style={styles.saveButtonText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  editTitleInput: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
    paddingVertical: 8,
    marginBottom: 15,
  },
  editDescriptionInput: {
    fontSize: 16,
    color: "#666",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top", // Android: start text at top
  },
  editSingleLineInput: {
    fontSize: 16,
    color: "#666",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    minHeight: 30,
    textAlignVertical: "top", // Android: start text at top
  },
  saveButtonContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
