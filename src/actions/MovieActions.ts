import {
  collection,
  doc,
  firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  where,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  serverTimestamp,
  setDoc,
  deleteDoc,
  updateDoc,
} from "../firebase";
import { IMovie, IUser, IComment } from "../interfaces";

export const addMovie = async (
  thumbnail: File,
  video: File,
  name: string,
  description: string,
  publishName: string,
  genre: string
) => {
  const thumbnailRef = ref(storage, `thumbnails/${thumbnail.name}`);
  const videoRef = ref(storage, `videos/${video.name}`);

  const thumbnailUpload = uploadBytesResumable(thumbnailRef, thumbnail);
  const videoUpload = uploadBytesResumable(videoRef, video);

  await thumbnailUpload;
  await videoUpload;

  const thumbnailUrl = await getDownloadURL(thumbnailRef);
  const videoUrl = await getDownloadURL(videoRef);

  const filmsCollectionRef = collection(firestore, "movies");
  const filmDocRef = doc(filmsCollectionRef);
  await setDoc(filmDocRef, {
    name: name,
    lowerCaseName: name.toLowerCase(),
    description: description,
    publishName: publishName,
    genre: genre,
    thumbnail: thumbnailUrl,
    videoUrl: videoUrl,
    publishDate: serverTimestamp(),
    likesCount: 0,
    dislikesCount: 0,
    viewsCount: 0,
    rate:0,
    numberOfRates: 0
  });
};

export const getMovies = async () => {
  const filmsCollection = collection(firestore, "movies");
  const q = query(filmsCollection, orderBy("rate", "desc"));
  
  const filmsSnapshot = await getDocs(q);

  const newFilms: IMovie[] = filmsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      publishDate: data.publishDate.toDate(), // Convert Firestore Timestamp to Date
    } as IMovie;
  });

  return newFilms;
};

export const getMoviesFilteredByGenre = async (genre: string) => {
  const filmsCollection = collection(firestore, "movies");

  const q = query(
    filmsCollection,
    where("genre", "==", genre),
    orderBy("rate", "desc")
  );

  const filmsSnapshot = await getDocs(q);

  const newFilms: IMovie[] = filmsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      publishDate: data.publishDate.toDate(), // Convert Firestore Timestamp to Date
    } as IMovie;
  });

  return newFilms;
};

export const getMovieById = async (filmId: string) => {
  const filmRef = doc(firestore, "movies", filmId);
  const filmSnapshot = await getDoc(filmRef);
  if (!filmSnapshot.exists()) {
    throw new Error("Movie not found");
  }
  const data = filmSnapshot.data();

  return {
    id: filmSnapshot.id,
    ...data,
    publishDate: data.publishDate.toDate(), // Convert Firestore Timestamp to Date
  } as unknown as IMovie;
};

export const getMovieComments = async (filmId: string)=>{
  const commentsCollection = collection(
    firestore,
    "movies",
    filmId,
    "comments"
  );
  const q = query(commentsCollection, orderBy("publishDate", "desc"));

  const commentsSnapshot = await getDocs(q);
  const comments = commentsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        publishDate: doc.data().publishDate.toDate(),
      } as unknown as IComment)
  );
  return comments;
}

export const search = async (filmName: string) => {
  if (!filmName) {
    return [];
  }
  const q = query(
    collection(firestore, "movies"),
    where("lowerCaseName", ">=", filmName.toLowerCase()),
    where("lowerCaseName", "<", filmName.toLowerCase() + "\uf8ff")
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      publishDate: data.publishDate.toDate(), // Convert Firestore Timestamp to Date
    } as IMovie;
  });
  return data;
};

export const toggleLikeFilm = async (userId: string, movieId: string) => {

  const userDocRef = doc(firestore, "users", userId);
  const filmDocRef = doc(firestore, "movies", movieId);

  await runTransaction(firestore, async (transaction) => {
    const userDoc = await transaction.get(userDocRef);
    const filmDoc = await transaction.get(filmDocRef);

    if (!userDoc.exists() || !filmDoc.exists()) {
      throw new Error("Movie or user not found");
    }

    const userData = userDoc.data() as IUser;
    const filmData = filmDoc.data() as IMovie;

    let updatedLikedFilms = [...userData.likedFilms];
    let updatedLikesCount = filmData.likesCount;
    let updatedDislikedFilms = [...userData.dislikedFilms];
    let updatedDislikesCount = filmData.dislikesCount;

    if (userData.likedFilms.includes(movieId)) {
      updatedLikedFilms = updatedLikedFilms.filter((id) => id !== movieId);
      updatedLikesCount -= 1;
    } else {
      updatedLikedFilms.push(movieId);
      updatedLikesCount += 1;
      if (userData.dislikedFilms.includes(movieId)) {
        updatedDislikedFilms = updatedDislikedFilms.filter(
          (id) => id !== movieId
        );
        updatedDislikesCount -= 1;
      }
    }

    transaction.update(userDocRef, {
      likedFilms: updatedLikedFilms,
      dislikedFilms: updatedDislikedFilms,
    });
    transaction.update(filmDocRef, {
      likesCount: updatedLikesCount,
      dislikesCount: updatedDislikesCount,
    });
  });
};

// Function to toggle dislike on a film
export const toggleDislikeFilm = async (userId: string, movieId: string) => {

  const userDocRef = doc(firestore, "users", userId);
  const filmDocRef = doc(firestore, "movies", movieId);

  await runTransaction(firestore, async (transaction) => {
    const userDoc = await transaction.get(userDocRef);
    const filmDoc = await transaction.get(filmDocRef);

    if (!userDoc.exists() || !filmDoc.exists()) {
      throw new Error("film or user not found");
    }

    const userData = userDoc.data() as IUser;
    const filmData = filmDoc.data() as IMovie;

    let updatedDislikedFilms = [...userData.dislikedFilms];
    let updatedDislikesCount = filmData.dislikesCount;
    let updatedLikedFilms = [...userData.likedFilms];
    let updatedLikesCount = filmData.likesCount;

    if (userData.dislikedFilms.includes(movieId)) {
      updatedDislikedFilms = updatedDislikedFilms.filter(
        (id) => id !== movieId
      );
      updatedDislikesCount -= 1;
    } else {
      updatedDislikedFilms.push(movieId);
      updatedDislikesCount += 1;
      if (userData.likedFilms.includes(movieId)) {
        updatedLikedFilms = updatedLikedFilms.filter((id) => id !== movieId);
        updatedLikesCount -= 1;
      }
    }

    transaction.update(userDocRef, {
      dislikedFilms: updatedDislikedFilms,
      likedFilms: updatedLikedFilms,
    });
    transaction.update(filmDocRef, {
      dislikesCount: updatedDislikesCount,
      likesCount: updatedLikesCount,
    });
  });
};

export const toggleViewToFilm = async (userId: string, movieId: string) => {
  const userDocRef = doc(firestore, "users", userId);
  const filmDocRef = doc(firestore, "movies", movieId);

  await runTransaction(firestore, async (transaction) => {
    const userDoc = await transaction.get(userDocRef);
    const filmDoc = await transaction.get(filmDocRef);

    if (!userDoc.exists || !filmDoc.exists) {
      throw new Error("Film or user not found");
    }

    const userData = userDoc.data() as IUser;
    const filmData = filmDoc.data() as IMovie;

    const isViewed = userData.viewedFilms.includes(movieId);

    if (!isViewed) {
      const updatedViewedFilms = [...userData.viewedFilms, movieId];
      const updatedViewsCount = filmData.viewsCount + 1;

      transaction.update(userDocRef, { viewedFilms: updatedViewedFilms });
      transaction.update(filmDocRef, { viewsCount: updatedViewsCount });
    }
  });
};

export const GetMoviesCountGroupByGenre = async () => {
    const genresSnapshot = await getDocs(collection(firestore, "genres"));
    const filmsCollection = collection(firestore, "movies");

    const genresCountPromises = genresSnapshot.docs.map(async (genreDoc, index) => {
      const genreName = genreDoc.data().name;
      const q = query(
        filmsCollection,
        where("genre", "==", genreName),
      );
      const moviesSnapshot = await getDocs(q);
      const moviesCount = moviesSnapshot.size;
      return { id: index, label: genreName, value:moviesCount };
    });

    const genresCount = await Promise.all(genresCountPromises);
    return genresCount;
}

export const addMovieComment = async (filmId: string, userId: string, username: string ,content: string) => {
  const commentsCollection = collection(firestore, 'movies', filmId, 'comments');
  const newCommentRef = doc(commentsCollection);
  await setDoc(newCommentRef, {
    publisherName: username,
    publisherId: userId,
    content: content,
    publishDate: serverTimestamp(),
  });
  const movieDocRef = doc(firestore, "movies", filmId);

  const movieSnapshot = await getDoc(movieDocRef);
  if (!movieSnapshot.exists()) {
    throw new Error("Movie not found");
  }

  const movieData = movieSnapshot.data();
  if (!movieData) {
    throw new Error("Failed to retrieve movie data");
  }

  const currentRate = movieData.rate;
  const numberOfRates = movieData.numberOfRates;

  const response = await fetch('http://localhost:5000/ranking', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment: content })
  })
 
  const data = await response.json();
  

  const newNumberOfRates = numberOfRates + 1;
  let updatedRate = currentRate;
  if(data.evaluation_result > 0){
    updatedRate = currentRate + data.evaluation_result;
  }

  await updateDoc(movieDocRef, {
    rate: updatedRate,
    numberOfRates: newNumberOfRates,
  });
}

export const removeMovieComment = async (filmId: string, commentId: string)=>{
  await deleteDoc(doc(firestore, 'movies', filmId, 'comments', commentId));
}


