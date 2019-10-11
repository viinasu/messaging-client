## Messaging Client

This is a client for the platform described in the [messaging architecture](messaging_architecture.md) spec.

Built as a functional, standalone React app that displays a set of conversations, each with a series of messages between two parties. Assumed the person viewing the app is one of the participants in each conversation (no support for multiple users yet). 

The features of this client are:
- Ability to view the list of conversations with others
   - Conversations are displayed in descending order of their last timestamp
   - A preview of each conversation (name, unread count, and last message time) is displayed 
   - Search ability for a given conversation by the other person's name
- Ability to View the messages of a selected conversation in-order
   - Incoming vs outgoing messages are visually distinct
   - Can componse a new message (plain text is sufficient) and "send" a new message (storing the message in-memory and having it appear in the interface)
- If I am viewing a conversation and refresh the page, then I should still be viewing that conversation when the page reloads
  - Persisting new outgoing messages is not yet supported

Other Potential Features
- fuzzy searching (of conversation names or message contents), persisting new outoging messages, rich-text composing, handling new realtime incoming messages, or anything else you can think of!

### To Run
### `yarn install`
### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Screenshots
![screenshot](https://user-images.githubusercontent.com/9300663/66678710-583d5080-ec21-11e9-85dd-1fff11798d56.gif)
