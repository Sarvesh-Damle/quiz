import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ResponseProvider } from "./components/Quiz/Quiz_Helpers/Contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ResponseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ResponseProvider>
  </React.StrictMode>
);
