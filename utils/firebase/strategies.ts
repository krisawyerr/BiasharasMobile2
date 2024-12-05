import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const collectionName = "strategies";

export const createStrategy = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const subscribeToStrategies = (callback: (items: any[]) => void) => {
  const collectionRef = collection(db, collectionName);
  return onSnapshot(collectionRef, (querySnapshot) => {
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(items);
  });
};

export const updateStrategy = async (id: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteStrategy = async (id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
