import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const addUserToFirestore = async (userId: string, userData: any) => {
    try {
        const userRef = collection(db, "users");
        const docRef = await addDoc(userRef, {
            userId,
            ...userData
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export const getUsers = async () => {
    try {
        const q = query(collection(db, "users"), where("active", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
};

export const listenToUsers = () => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    });

    return () => unsubscribe();
};
