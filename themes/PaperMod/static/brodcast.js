import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcerqGJVSsMwLs7eoRjATE8X7bplWsD54",
  authDomain: "drunk-broadcast.firebaseapp.com",
  projectId: "drunk-broadcast",
  storageBucket: "drunk-broadcast.firebasestorage.app",
  messagingSenderId: "998143016108",
  appId: "1:998143016108:web:87c3a60b853aaf75f27309",
  measurementId: "G-49Z7SPGJJY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ref = collection(db, "broadcasts");

const input = document.getElementById("broadcast-input");
const send = document.getElementById("broadcast-send");
const list = document.getElementById("broadcasts");

send.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;
  await addDoc(ref, { message: text, timestamp: new Date() });
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send.click();
});

const q = query(ref, orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const item = document.createElement("div");
    item.textContent = doc.data().message;
    item.style.marginBottom = "0.5rem";
    list.appendChild(item);
  });
});

