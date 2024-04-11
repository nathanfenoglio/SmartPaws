import React, { useEffect, useState } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axiosInstance, { BASE_URL } from '../../services/config';
import { getAuth } from 'firebase/auth';
import { SelectList } from 'react-native-dropdown-select-list';
import { IPet } from 'types';
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const JournalScreen = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const ownerId = currentUser ? currentUser.uid : "";
  const [entry, setEntry] = useState('');
  const [pets, setPets] = useState<IPet[]>([]);
  const [selectedPet, setSelectedPet] = useState('');
  const [petDetails, setPetDetails] = useState<IPet | null>(null);
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // If user navigates to this screen, fetch pets in case they've added a new pet
  useEffect(() => {
    if (isFocused) {
      fetchPets();
    }
  }, [isFocused]);
  

  // Fetch pets from backend
  // Used to populate the dropdown list of pets
  const fetchPets = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const ownerId = currentUser ? currentUser.uid : "";
      if (!ownerId) {
        throw new Error("No user ID found");
      }

      const response = await fetch(`${BASE_URL}pet/get/${ownerId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets", error);
      // Handle the error as appropriate...
    }
  };

  // Fetch pet details when selected pet changes
  useEffect(() => {
    if (selectedPet && selectedPet !== 'Chat with Gigi') {
      fetchPetDetails(selectedPet);
    } else {
      setPetDetails(null);
    }
  }, [selectedPet]);

  // Fetch pet details from backend
  const fetchPetDetails = async (petName: string) => {
    try {
      const ownerId = getAuth().currentUser?.uid;
      const response = await fetch(`${BASE_URL}pet/get/${ownerId}/${petName}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setPetDetails(await response.json());
    } catch (error) {
      console.error("Error fetching pet details", error);
    }
  };

  // Construct the data for the dropdown list
  const data = [{ key: 'Chat with Gigi', value: 'Chat with Gigi' }].concat(
    pets.map((pet: IPet) => ({
      key: pet.name,
      value: pet.name
    }))
  );

  // Triggered when a pet is selected from the dropdown list
  const onPetSelect = (selectedValue: string) => {
    if (selectedPet !== selectedValue) {
      setSelectedPet(selectedValue);
    }
  
    console.log("Selected Pet: " + selectedValue);
  };

    // const handleSaveEntry = async (data: IJournalEntry) => {
    const handleSaveEntry = async () => {
        try {
          // NEED TO GET date FROM DATE PICKER THAT YOU WILL CREATE...
          // const date = "04/11/2024"; // JUST HARDCODING A DATE FOR NOW UNTIL THE DATE PICKER IS IMPLEMENTED 
          const formattedDate = date.toLocaleDateString('en-US'); // format the date as a string
          // just printing
          console.log("ownerId: " + ownerId + " petName: " + petDetails?.name + " date: " + formattedDate + " entry: " + entry);

          if (petDetails?.name != null) {
            // await saveJournalEntryToDatabase(ownerId, petDetails?.name, date, entry);
            await saveJournalEntryToDatabase(ownerId, petDetails?.name, formattedDate, entry);
          }

          console.log('Entry saved:', entry);
        } catch (error) {
          console.log("Error in handleSaveEntry");
        }

        setEntry(''); // reset input box

    };

    const saveJournalEntryToDatabase = async (
      ownerId: string,
      petName: string,
      date: string,
      entry: string
    ) => {
      try {
        // const response = await axiosInstance.post("journalEntryRoutes/create", {
        const response = await axiosInstance.post("journalEntry/create", {
          ownerId,
          petName,
          date,
          entry
        });
        console.log("journal saved to MongoDB");
        return response.data.journalEntry;
      } catch (error) {
        console.log("error in saveJournalEntryToDatabase", error);
        throw error;
      }
    }
    
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
        <LinearGradient
          colors={["#1B7899", "#43B2BD", "#43B2BD", "#43B2BD", "#1B7899"]}
          style={styles.linearGradient}
        >
          <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <View style={styles.dropdownContainer}>
              <SelectList 
                data={data} 
                setSelected={onPetSelect}
                placeholder='Select a pet...'
                boxStyles={styles.selectListStyle}
                dropdownTextStyles={styles.selectListStyle}
              />
            </View>
            
            <View style={styles.container}>
              <Text style={styles.title}>Journal</Text>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Write your journal entry here..."
                value={entry}
                onChangeText={setEntry}
              />
              <View style={{alignItems: 'center'}}>
                <Text style={styles.dateDisplay}>Selected Date: {date.toLocaleDateString('en-US')}</Text>
              </View>
            <View style={{margin: 20}}>  
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDate(currentDate);
                  }}
                />
              ) : (
                <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.buttonText}>Select a date</Text>
                </TouchableOpacity>
              )}
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setShowDatePicker(Platform.OS === 'ios');
                    setDate(currentDate);
                  }}
                />
              )}
            </View>

              <TouchableOpacity style={styles.button} onPress={handleSaveEntry}>
                <Text style={styles.buttonText}>Save Entry</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    dateDisplay: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      color: 'black',
    },
    input: {
        height: 200,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        borderRadius: 25, // oval shape
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // semi-transparent white
        color: 'black', // ensure text is readable on light background
        marginBottom: 20,
        textAlignVertical: 'top', // start text from the top of the text input
    },
    button: {
        backgroundColor: '#201A64',
        borderRadius: 20, // oval shape
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    dropdownContainer: {
      marginTop: 50, 
      marginBottom: 10,
      paddingHorizontal: 10,
      paddingVertical: 5, // Add some vertical padding if needed
      borderWidth: 0, // If you want an outline for the container
      borderColor: '#cccccc', // Color for the container border
      borderRadius: 30, // Example border radius
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Opaque background
      overflow: 'hidden', // Ensures nothing goes outside the container's bounds
    },
    selectListStyle: {
      width: '100%', // Ensure SelectList fills the container width
      borderRadius:20, // Match the dropdownContainer's border radius
      padding: 0,
      margin: 0,
      borderColor: 'transparent', // Make the border color transparent
      borderWidth: 0, // Set border width to 0 to remove it
    },
  
});

export default JournalScreen;