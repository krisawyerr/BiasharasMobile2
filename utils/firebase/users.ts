import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { User } from "../../types/User";

const collectionName = "users"

export const createUser = async (userId: string, data: User) => {
    try {
      await addDoc(collection(db, collectionName), data);
      const userDetails = await getUser(userId)
      return userDetails
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

export const getUser = async (userId: string) => {
    try {
        const q = query(collection(db, collectionName), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return userData;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
};


// export const listenToUsers = () => {
//     const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
//         snapshot.forEach((doc) => {
//             console.log(doc.id, " => ", doc.data());
//         });
//     });

//     return () => unsubscribe();
// };
