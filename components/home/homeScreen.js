import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import cardData from '../../data';
import AddCard from '../cards/AddCardScreen';
import EditCard from '../cards/EditCardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icons from '../../constants/icons';

const STORAGE_KEY = '@cards'; 

const CardScreen = ({ onLogout }) => {
  const [cards, setCards] = useState(cardData);
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    // Save card data to AsyncStorage whenever it changes
    saveCards();
  }, [cards]);

  const loadCards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedCards) {
        setCards(JSON.parse(storedCards));
      } else {
        // If no data is found in AsyncStorage, use the initial data from cardData
        setCards(cardData);
      }
    } catch (error) {
      console.error('Error loading card data from AsyncStorage:', error);
    }
  };

  const saveCards = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (error) {
      console.error('Error saving card data to AsyncStorage:', error);
    }
  };

  const handleAddCard = () => {
    // Implement adding a new card here (you can navigate to the EditCardScreen)
    setShowAddCard(true);
  };

  const handleEditCard = (cardId) => {
    const cardToEdit = cards.find((card) => card.id === cardId);
    setSelectedCard(cardToEdit);
  };

  const handleSaveCard = (updatedCard) => {
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    setCards(updatedCards);
    setSelectedCard(null);
  };

  const handleCancelEdit = () => {
    setSelectedCard(null);
  };

  const handleDeleteCard = (cardId) => {
    // deleting a card here
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };


  const renderCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.details}>
        <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardContent}>{item.content}</Text>
        </View>
        <View style={styles.cardButtonsContainer}>
            <Text>{item.likes}</Text>
            <View style={styles.funcBtn}>
              <TouchableOpacity style={styles.btnEvery} onPress={() => handleEditCard(item.id)}>
                <Image style={styles.btnEditCut} source={icons.edit}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnEvery} onPress={() => handleDeleteCard(item.id)}>
              <Image style={styles.btnEditCut} source={icons.cut}/>
              </TouchableOpacity>
            </View>
            
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!selectedCard && (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Where Today?</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnEvery} onPress={handleAddCard}>
            <Text style={styles.btnText}>Add Card</Text>
          </TouchableOpacity>
          <ScrollView style={styles.list}>
            {cards.map((card) => (
              <View key={card.id} style={styles.cardWrapper}>
                {renderCard({ item: card })}
              </View>
            ))}
          </ScrollView>
        </>
      )}

      {showAddCard && !selectedCard && (
        <AddCard
          onAddCard={(newCard) => {
            setCards((prevCards) => [newCard, ...prevCards]);
            setShowAddCard(false);
          }}
          onCancel={() => setShowAddCard(false)}
        />
      )}

      {selectedCard && (
        <EditCard
          cardData={selectedCard}
          onSave={handleSaveCard}
          onCancel={handleCancelEdit}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#999',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: 'bold',
    borderRadius: 8,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  cardWrapper: {
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardImage: {
    width: 130,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  details: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 10,
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  cardButtonsContainer: {
    width: 180,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  funcBtn: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnEvery: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
  },
  btnEditCut: {
    width: 20,
    height: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4568DC',
    textAlign: 'center',
  }
});


export default CardScreen;
