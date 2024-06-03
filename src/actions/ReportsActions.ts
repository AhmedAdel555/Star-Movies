import { collection, deleteDoc, doc, firestore, getDocs, query, runTransaction, setDoc, where } from "../firebase";
import { IReport } from "../interfaces";

export const reportComment = async (commentId: string, commentContent:string, movieId: string, movieName: string) => {
    const reportsCollection = collection(firestore, 'reports');
    const reportDocRef = doc(reportsCollection);
    const report = {
      movieId,
      movieName,
      commentId,
      commentContent,
    };
    await setDoc(reportDocRef, report);
};

export const deleteReportById = async (reportId: string) => {
  const reportsCollection = collection(firestore, 'reports');
  const reportDocRef = doc(reportsCollection, reportId);
  await deleteDoc(reportDocRef);
};

export const deleteReportAndCommentById = async (movieId: string, commentId: string) => {
  const moviesCollection = collection(firestore, 'movies');
  const movieDocRef = doc(moviesCollection, movieId);
  const commentsCollection = collection(movieDocRef, 'comments');
  const commentDocRef = doc(commentsCollection, commentId);

  await runTransaction(firestore, async (transaction) => {
    transaction.delete(commentDocRef);

    // Find all reports for the comment
    const reportsCollection = collection(firestore, 'reports');
    const reportsQuery = query(reportsCollection, where('commentId', '==', commentId));
    const querySnapshot = await getDocs(reportsQuery);
    
    // Delete each report document
    querySnapshot.forEach((doc) => {
        const reportDocRef = doc.ref;
        transaction.delete(reportDocRef);
    });
    
  });
};

export const getAllReports = async (): Promise<IReport[]> => {
  const reportsCollection = collection(firestore, 'reports');
  const querySnapshot = await getDocs(reportsCollection);
  const reports: IReport[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    reports.push({
      id: doc.id,
      commentId: data.commentId,
      commentContent: data.commentContent,
      movieId: data.movieId,
      movieName: data.movieName,
    });
  });
  return reports;
};


