import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dispatch event for prerenderer after React has mounted
// This tells vite-plugin-prerender that the page is ready to capture
setTimeout(() => {
  document.dispatchEvent(new Event("render-event"));
}, 500);
