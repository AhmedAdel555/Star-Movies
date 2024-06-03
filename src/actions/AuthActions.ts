import { auth, createUser, doc, firestore, setDoc, signOut, updateProfile } from "../firebase";

export const handleSignOut = async () => {
  await signOut(auth);
};

export const handleSignUp = async (email: string, password: string, username: string) => {
  const { user } = await createUser(auth, email, password);

  // Update the user profile to set the displayName
  await updateProfile(user, {
    displayName: username,
  });

  await setDoc(doc(firestore, "users", user.uid), {
    username: username,
    email: email,
    id: user.uid,
    isAdmin: false,
    watchlist: [],
    viewedFilms: [],
    likedFilms: [],
    dislikedFilms: [],
    comments: [],
  });
};
