import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import App from "./App";
import ThemeProvider from "./theme/index.js";
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ThemeProvider>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
        debug={true}
      >
        <App />
      </PersistGate>
    </ThemeProvider>
  </Provider>
);
