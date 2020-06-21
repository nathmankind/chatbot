import { ApiAiClient } from "api-ai-javascript";
import { applyMiddleware, createStore } from "redux";

const accessToken = "2298c8838b3f410c9da40617e3acbb4e";
const client = new ApiAiClient({ accessToken });

const ON_MESSAGE = "ON_MESSAGE";
export const sendMessage = (text, sender = "user") => ({
  type: ON_MESSAGE,
  payload: { text, sender },
});
const messageMiddleware = () => (next) => (action) => {
  next(action);
  if (action.type === ON_MESSAGE) {
    const { text } = action.payload;
    client.textRequest(text).then((response) => {
      next(sendMessage(response.result.fulfillment.speech, "bot"));
    });
  }
};
const initState = [
  {
    text:
      "Hello, I am a chatbot, i might not answer all your questions, because i'm still learning. Enjoy!",
  },
];
const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};
export const store = createStore(
  messageReducer,
  applyMiddleware(messageMiddleware)
);
