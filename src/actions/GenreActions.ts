import { collection, deleteDoc, doc, firestore, getDocs, setDoc } from "../firebase";
import { IGenre } from "../interfaces";

export const addGenre = async (ganreName: string) => {
  const newGenreRef = doc(collection(firestore, "genres"));
  await setDoc(newGenreRef, { name: ganreName });
};

export const removeGenre = async (genreId: string) => {
  await deleteDoc(doc(firestore, "genres", genreId));
};

export const getAllGenres = async () => {
  const querySnapshot = await getDocs(collection(firestore, "genres"));
  const genresList: IGenre[] = querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as IGenre)
  );
  return genresList;
};
