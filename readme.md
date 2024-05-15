# SmartPaws Virtual Veterinarian
- React Native iOS and Android application using Typescript, Express, MongoDB, Firebase, OpenAI Assistants API
- comprehensive personalized pet care app for creating pet profiles, journal entries, veterinarian map locator
- separate conversation thread per registered pet with virtual veterinarian chatbot that retains pet profile information and previous conversation knowledge to generate personalized pet advice

# SmartPaws Team
- Derrick Perry 
- Omer Khan
- Nathan Fenoglio
- Ethyn Nguyen

# Screen Flow Demo
### Intro / Sign Up / Onboarding Screens
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/intro.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/signup.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/welcome.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/onboarding1.png)
### Add New Pet Profile
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/onboarding2.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/add_new_pet.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/add_new_pet_2.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/enter_pet_details.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/add_new_pet_2.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/pet_registered.png)
### Virtual Vet Chatbot
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/pet_profile.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/ai_screen_select_pet.png)
### separate conversation thread per registered pet for personalized pet advice
### if 1st time inquiring about pet, new conversation thread created and pet details sent to OpenAI assistant
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/new_thread_pet_details_sent.png)
### user query about pet
### "my pet has not been eating much of anything even though food has been regularly available for the last 2 days and I am concerned"
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/ai_screen_pet_query.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/ai_screen_assistant_response.png)
### previous conversation info retained per pet profile
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/ai_screen_previous_conversation_thread_evidence.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/ai_screen_previous_conversation_thread_evidence_2.png)
### Journal Screen
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/journal_date_picker.png)
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/journal_add_entry.png)
### Find Nearest Vets Screen
![alt_image](https://github.com/nathanfenoglio/SmartPaws/blob/main/images/map_screen.png)


# Setup Instructions
(If wanting to setup app to run with your own credentials/accounts)
- MongoDB - sign up for account https://www.mongodb.com/
- Firebase - sign up for account https://firebase.google.com/docs/auth
- OpenAI - sign up for account https://platform.openai.com/signup
- Google Maps - get API key https://developers.google.com/maps/documentation/javascript/get-api-key
- install node.js on your computer if you haven't already https://nodejs.org/en/download
- clone git repo in whatever directory you want on your computer git clone https://github.com/nathanfenoglio/SmartPaws.git
- go into both directories and run npm install in each
  - cd into SmartPawsFrontend, npm install
  - cd into SmartPawsBackend, npm install
- add file ".env" to SmartPawsBackend SmartPawsBackend/.env
  - MONGODB_CONNECTION_STRING=YOUR_MONGODB_CONNECTION_STRING
  - OPENAI_API_KEY=YOUR_OPENAI_API_KEY
  - PORT=1337
- add file ".env" to SmartPawsFrontend SmartPawsFrontend/src/.env
  - BASE_URL=`YOUR_IP_ADDRESS`
  - API_KEY=YOUR_FIREBASE_API_KEY
  - AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
  - PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
  - STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
  - MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
  - APP_ID=YOUR_FIREBASE_APP_ID
  - MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
  - GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
  - CHATGPT_GEN_THREAD_ID=YOUR_CHATGPT_GEN_THREAD_ID
- running app locally
  - download expo go on your phone (can search for it in app store or google play)
  - this will let you scan a qr code to be able to debug on your phone
  - or could also use emulator on your computer using android studio to debug on computer
  - start backend server cd into SmartPawsBackend, npm start
  - start frontend in another terminal window cd into SmartPawsFrontend, npx expo start
  - open expo go on phone
  - select "Scan QR code" and scan QR code from terminal

# Download From Google Play or Apple App Store
### deployment to come in future...

