import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  firestore,
  getDoc,
  getDocs,
  query,
  runTransaction,
  where,
} from "../firebase";
import { IMovie, IUser } from "../interfaces";

export const fetchCurrentUser = async (userId: string) => {
  const userRef = doc(firestore, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data() as IUser;
    return userData;
  } else {
    throw new Error("User not exist")
  }
}

export const getUserWatchlist = async (userId: string): Promise<IMovie[]> => {
  const userRef = doc(firestore, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const watchlistIds = userData.watchlist || []; // Default to empty array if userData.watchlist is undefined
    
    if (watchlistIds.length === 0) {
      return [];
    }

    // Prepare a batch query to fetch all Movies in the watchlist
    const moviesRef = collection(firestore, "movies");
    const querySnapshot = await getDocs(query(moviesRef, where("__name__", "in", watchlistIds)));

    // Map query snapshot to array of Movie objects
    const watchlistWithMovieData: IMovie[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        publishDate: data.publishDate.toDate() // Convert Firestore Timestamp to Date
      } as IMovie;
    });

    return watchlistWithMovieData;
  } else {
    // Handle case where user document does not exist
    return [];
  }
};


export const toggleWatchlistMovie = async (userId:string,MovieId: string) => {

  const userDocRef = doc(firestore, 'users', userId);

  await runTransaction(firestore,async (transaction) => {
    const userDoc = await transaction.get(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('User document does not exist');
    }

    const userData = userDoc.data() as IUser;

    if (userData.watchlist.includes(MovieId)) {
      transaction.update(userDocRef, { watchlist: arrayRemove(MovieId) });
    } else {
      transaction.update(userDocRef, { watchlist: arrayUnion(MovieId) });
    }
  });
};

export const getAllUsers = async () => {
  const usersCollection = collection(firestore, 'users');
  const querySnapshot = await getDocs(usersCollection);
  const users: IUser[] = querySnapshot.docs.map((doc) => {
      return doc.data() as IUser
  })
  return users;
}