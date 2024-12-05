import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const collectionName = "trades";

export const createTrade = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const subscribeToTrades = (callback: (items: any[]) => void) => {
  const collectionRef = collection(db, collectionName);
  return onSnapshot(collectionRef, (querySnapshot) => {
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(items);
  });
};

export const removeStrategyAfterDeletion = async (oldStrategy: string) => {
  try {
    const collectionRef = collection(db, "trades");
    const q = query(collectionRef, where("strategyUsed", "==", oldStrategy));
    const querySnapshot = await getDocs(q);

    const updatePromises = querySnapshot.docs.map((docSnapshot) =>
      updateDoc(doc(db, "trades", docSnapshot.id), { strategyUsed: "none" })
    );

    await Promise.all(updatePromises);
    console.log(`Updated ${querySnapshot.size} documents from '${oldStrategy}' to 'none'.`);
  } catch (error) {
    console.error("Error updating strategy for all trades: ", error);
  }
};

export const changeStrategyAfterupdate = async (oldStrategy: string, newStrategy: string) => {
  try {
    const collectionRef = collection(db, "trades");
    const q = query(collectionRef, where("strategyUsed", "==", oldStrategy));
    const querySnapshot = await getDocs(q);

    const updatePromises = querySnapshot.docs.map((docSnapshot) =>
      updateDoc(doc(db, "trades", docSnapshot.id), { strategyUsed: newStrategy })
    );

    await Promise.all(updatePromises);
    console.log(`Updated ${querySnapshot.size} documents from '${oldStrategy}' to '${newStrategy}'.`);
  } catch (error) {
    console.error("Error updating strategy for all trades: ", error);
  }
};

export const updateTrade = async (id: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteTrade = async (id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
