const rootApiUrl = () => 'https://sec.meetkaruna.com/api/v1/conversations';
const messagesApiUrl = (uuid) => `${rootApiUrl()}/${uuid}`;

export const  getConversations = () => (
  fetch(rootApiUrl())
    .then((response) => (
      response.json()
    ))
    .then((json) => (
      json.data
    ))
);

export const getMessages = (uuid) => {
  return fetch(messagesApiUrl(uuid))
    .then((response) => (
      response.json()
    ))
    .then((json) => {
      return json.data
    })
};