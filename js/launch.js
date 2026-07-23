import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBb77qZG_81J0uSMKUPmQkGZ0s0yE_u47g",
    authDomain: "bulan-rbt.firebaseapp.com",
    projectId: "bulan-rbt",
    storageBucket: "bulan-rbt.firebasestorage.app",
    messagingSenderId: "474789167469",
    appId: "1:474789167469:web:403b634a8739ba8bc2da64"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const launchRef = doc(db, "system", "launch");

await updateDoc(launchRef, {

    status:"launch"

});

document.querySelector("p").innerHTML="✅ Pelancaran Berjaya";