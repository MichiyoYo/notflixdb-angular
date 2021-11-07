import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { Route } from '@angular/compiler/src/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');
  movies: any[] = [];
  favMovies: any[] = this.user.FavoriteMovies;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Initialize component and retrieve all movies
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Retrieves all the movies from the database
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      return this.movies;
    });
  }

  /**
   * Opens a dialog containing info about the genre
   * @function openGenreDialog
   * @param name the name of the genre
   * @param description the description of the genre
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  /**
   * Opens a dialog containing info about the director
   * @function openDirectorDialog
   * @param name the name of the director
   * @param bio the bio of the director
   * @param birthDate bith date of the director
   * @param deathDate death date of the director
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birthDate: any,
    deathDate: any
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        name,
        bio,
        birthDate,
        deathDate,
      },
      width: '500px',
    });
  }

  /**
   * Opens a dialog containing info about the movie
   * @function openSynopsisDialog
   * @param title the title of the movie
   * @param imageUrl the url of the poster
   * @param description the description of the movie
   */
  openSynopsisDialog(title: string, imageUrl: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        title,
        imageUrl,
        description,
      },
      width: '500px',
    });
  }

  /**
   * Updates the local list of favorites by downloading it from the DB
   * @function updateFavs
   */
  updateFavs(): void {
    this.fetchApiData.getUser(this.user).subscribe((res: any) => {
      this.favMovies = res.FavoriteMovies;
      return this.favMovies;
    });
  }

  /**
   * Adds a movie to the user's list of favorites
   * @param movieId the id of the movie
   * @param title the title of the movie
   */
  addToFavs(movieId: string, title: string): void {
    this.fetchApiData
      .addToFav(this.user.username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been added to your favorite movies! ✔️`,
          'Cool',
          {
            duration: 2000,
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    this.updateFavs();
  }

  removeFromFavs(movieId: string, title: string): void {
    this.fetchApiData
      .removeFromFav(this.user.username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been removed from your favorite movies ✔️`,
          'Alright',
          {
            duration: 2000,
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    this.updateFavs();
  }
}
