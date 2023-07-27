import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import images from '../../constants/images';

const AddCard = ({ onAddCard, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageData, setImageData] = useState(null);
  const [likes, setLikes] = useState('');

  const handleSelectImage = async () => {
    try {
      const { uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setImageData({ uri });
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const handleAddCard = () => {
    const newCard = {
      id: Math.random().toString(),
      title,
      content,
      image: imageData ? { uri: imageData.uri } : images.shop,
      likes: Number(likes),
    };
    onAddCard(newCard);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.addCardTitle}>Add Card</Text>
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
      <TouchableOpacity style={styles.imageContainer} onPress={handleSelectImage}>
        {imageData ? (
          <Image source={{ uri: imageData.uri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholderText}>Select Image</Text>
        )}
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Add Card</Text>
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
  addCardTitle: {
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
  imagePlaceholderText: {
    fontSize: 16,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
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
});

export default AddCard;
