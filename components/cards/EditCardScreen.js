import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const EditCard = ({ cardData, onSave, onCancel }) => {
  const [title, setTitle] = useState(cardData.title);
  const [content, setContent] = useState(cardData.content);
  const [imageData, setImageData] = useState(cardData.image);
  const [likes, setLikes] = useState(cardData.likes.toString());

  const handleSaveCard = () => {
    const updatedCard = {
      ...cardData,
      title,
      content,
      image: imageData,
      likes: Number(likes),
    };
    onSave(updatedCard);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.editCardTitle}>Edit Card</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Content"
          multiline
          numberOfLines={4}
          value={content}
          onChangeText={setContent}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.likesLabel}>Number of Likes</Text>
        <TextInput
          style={styles.input}
          placeholder="Likes"
          value={likes}
          onChangeText={setLikes}
          keyboardType="numeric" 
        />
      </View>
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={imageData} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
          <Text style={styles.buttonText}>Save Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  input: {
    fontSize: 16,
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4568DC',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  likesLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EditCard;
