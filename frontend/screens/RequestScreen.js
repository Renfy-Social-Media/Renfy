import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { data, requests } from './Content';

const generateRandomRequests = () => {
  const numberOfRequests = Math.floor(Math.random() * (10 - 3 + 1)) + 3; // Random number between 3 and 10
  return Array.from({ length: numberOfRequests }).map(() => {
    const randomName = data[Math.floor(Math.random() * data.length)];
    const randomRequest = requests[Math.floor(Math.random() * requests.length)];
    return { id: Math.random().toString(), name: randomName, requestDetails: randomRequest };
  });
};


const RequestScreen = () => {
  const [requestList, setRequestList] = useState(generateRandomRequests());

  useEffect(() => {
    if (requestList.length === 0) {
      // Generate new requests when all requests have been handled
      setRequestList(generateRandomRequests());
    }
  }, [requestList]);

  const handleAccept = (id) => {
    // Remove the request from the list when accepted
    setRequestList(prevRequests => prevRequests.filter(request => request.id !== id));
  };

  const handleDecline = (id) => {
    // Remove the request from the list when declined
    setRequestList(prevRequests => prevRequests.filter(request => request.id !== id));
  };

  const renderRequestItem = ({ item }) => (
      <View style={styles.requestItem}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.requestDetails}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleAccept(item.id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => handleDecline(item.id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
  );

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
            data={requestList}
            keyExtractor={item => item.id}
            renderItem={renderRequestItem}
        />
      </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  requestItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  acceptButton: {
    backgroundColor: '#28A745', // Green color for accept button
  },
  declineButton: {
    backgroundColor: '#DC3545', // Red color for decline button
  },
});

export default RequestScreen;