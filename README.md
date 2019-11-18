## Messaging Client
This is a client for the platform described in the [messaging architecture](messaging_architecture.md) spec.

Built as a functional, standalone React app that displays a set of conversations, each with a series of messages between two parties. Assumed the person viewing the app is one of the participants in each conversation (no support for multiple users yet).


![screenshot](https://user-images.githubusercontent.com/9300663/66678710-583d5080-ec21-11e9-85dd-1fff11798d56.gif)

Created on Oct 2019.

### Features

#### Ability to view the list of conversations with others
- Conversations are displayed in descending order of their last timestamp
- A preview of each conversation (name, unread count, and last message time) is displayed 
- Search ability for a given conversation by the other person's name

#### Ability to View the messages of a selected conversation in-order
- Incoming vs outgoing messages are visually distinct
- Can componse a new message (plain text is sufficient) and "send" a new message (storing the message in-memory and having it appear in the interface)
   
#### If I am viewing a conversation and refresh the page, then I should still be viewing that conversation when the page reloads   
- Persisting new outgoing messages is not yet supported

### Tech Stack
**Frontend:** React

**Backend:** CRA

**APIs:**
* `https://sec.meet*****.com/api/v1/conversations`

### To Run:
### `yarn install`
### `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Architecture
**app.js**
The entry point component for our messenger UI. calls the `Router` component and `Switch` component. 

It switches between 2 routes. `/messages/:uuid` and `/`, and renders their respective components.
```jsx
<Router>
    <div className="page">
      <Switch>
        <Route path="/messages/:uuid" component={ Messages }/>
        <Route exact path="/" component={ Home }/>
      </Switch>
    </div>
</Router>
```

**Home.js**
* calls `getConversations` and sets the initial `conversations` state
* shows the `input`  for searching through conversations
* shows the messages and their unread count
* filters the messages by search term
* sorts the messages by created at 
* performance: instead of calling `.sort` in render, we call `.sort` when we set the state. that way, expensive functions like sort are not called on every render.
* code style: Uses object destructuring

**Messages.js**
* calls `getMessages` and sets the initial `messages` state
* submits message on enter key and clears the `newMessage` state
* adds new messages to the `messages` state using `this.state.messages.concat({ ... new message })`

**api.js**
* fetches the conversations and get messages

### Improvements
- fuzzy searching (of conversation names or message contents), persisting new outgoing messages, rich-text composing, handling new realtime incoming messages, or anything else you can think of!
- Minimizing the number of ‘divs’ 
- UI for Messages page - the input box should stay all the way to the bottom of hte page, without needing to scroll down to see it.
