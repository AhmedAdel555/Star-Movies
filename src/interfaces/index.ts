export interface IGenre {
  id: string;
  name: string;
}

export interface IMovie {
  id: string;
  name: string;
  lowerCaseName: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  rate: number;
  numberOfRates: number;
  publishDate: Date;
  publishName: string;
  genre: string; 
  likesCount: number;
  dislikesCount: number;
  viewsCount: number;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  likedFilms: string[];
  dislikedFilms: string[];
  viewedFilms: string[];
  watchlist: string[];
}

export interface IComment {
  id: string;
  publisherId: string;
  publisherName: string;
  content: string;
  publishDate: Date;
}

export interface IReport {
  id: string;
  commentId: string;
  commentContent: string;
  movieId: string;
  movieName: string;
}