import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://notflixapi.herokuapp.com/';

const token = localStorage.getItem('token');

const headers = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + token,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
    this.http = http;
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Calls the user registration endpoint
   * @function userRegistration
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'register', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls the /login endpoint
   * @function userLogin
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls the /movies endpoint
   * @function getAllMovies
   * @returns an Observable containing a response
   */
  public getAllMovies(): Observable<any> {
    //this has type Observable
    const response = this.http.get(apiUrl + 'movies', headers);

    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /movies/:movieId endpoint
   * @function getMovie
   * @param movieId the id of the movie to retrieve
   * @returns an Observable containing a response
   */
  public getMovie(movieId: string): Observable<any> {
    const response = this.http.get(apiUrl + '/movies/' + movieId, headers);
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /directors/:directornName endpoint
   * @function getDirector
   * @param directorNane the name of the actor to retrieve
   * @returns an Observable containig a response
   */
  public getDirector(directorNane: string): Observable<any> {
    const response = this.http.get(
      apiUrl + '/directors/' + directorNane,
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /genres/:genreName endpoint
   * @function getGenre
   * @param genreName the name of the genre to retrieve
   * @returns an Observable conianing a response
   */
  public getGenre(genreName: string): Observable<any> {
    const response = this.http.get(apiUrl + '/genres/' + genreName, headers);
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /users/:username endpoint
   * @function getUser
   * @param username the name of the user to retrieve
   * @returns an Observable conianing a response
   */
  public getUser(username: string): Observable<any> {
    const response = this.http.get(apiUrl + '/users/' + username, headers);
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /username/favorites endpoint
   * @function getFavMovies
   * @param username the username of the user to retrieve the favorite movies of
   * @returns an Observable containing a response
   */
  public getFavMovies(username: string): Observable<any> {
    const response = this.http.get(apiUrl + username + '/favorites', headers);
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /username/favorites endpoint
   * @function getWatchlist
   * @param username the username of the user to retrieve the list of fvaorites of
   * @returns an Observable containing a response
   */
  public getWatchlist(username: string): Observable<any> {
    const response = this.http.get(apiUrl + username + '/watchlist', headers);
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the PUT /users/:username/favorites/:movieId endpoint
   * @function addToFav
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */
  public addToFav(username: string, movieId: string): Observable<any> {
    const response = this.http.post(
      apiUrl + 'users/' + username + 'favorites/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the PUT /users/:username/favorites/:movieId endpoint
   * @function addToWatchlist
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */
  public addToWatchlist(username: string, movieId: string): Observable<any> {
    const response = this.http.post(
      apiUrl + 'users/' + username + 'watchlist/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the DELETE /users/:username/favorites/:movieId endpoint
   * @function removeFromFav
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to remove from favorites
   * @returns an Observable containing a response
   */
  public removeFromFav(username: string, movieId: string): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + 'favorites/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the DELETE /users/:username/favorites/:movieId endpoint
   * @function removeFromWatchlist
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */
  public removeFromWatchlist(
    username: string,
    movieId: string
  ): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + 'watchlist/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the /users/:username/deregister endpoint
   * @function deleteUser
   * @param username the username of the user we want to deregister
   * @returns an Observable containing a response
   */
  public deleteUser(username: string): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + '/deregister',
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the PUT /users/:username
   * @function editUser
   * @param username the user we want to update the info of
   * @param updatedInfo the new info
   * @returns an Observable containing a response
   */
  public editUser(username: string, updatedInfo: object): Observable<any> {
    const response = this.http.put(
      apiUrl + 'users/' + username,
      updatedInfo,
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}
