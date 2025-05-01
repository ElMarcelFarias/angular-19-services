import { Component, OnInit } from '@angular/core';
import { NavComponent } from './shared/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MovieService } from './services/movie.service'; 
import { MultipleWinnerService } from './services/multiple-winner.service';  
import { StudioService } from './services/studios.service';  
import { ProducerWinIntervalService } from './services/producer-win-interval.service';  
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    DashboardComponent,
    RouterOutlet,
    HttpClientModule, 
    CommonModule       
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: any[] = [];  
  yearsWithMultipleWinners: any[] = [];
  studioWinners: any[] = [];  
  producerWinIntervals: any = {};  

  constructor(
    private movieService: MovieService,
    private multipleWinnerService: MultipleWinnerService,  
    private studioService: StudioService, 
    private producerWinIntervalService: ProducerWinIntervalService 
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadYearsWithMultipleWinners();
    this.loadStudioWinners();
    this.loadProducerWinInterval();
  }

  loadMovies(): void {
    this.movieService.getMovies(0, 99).subscribe(
      (response) => {
        this.movies = response.content; 
        console.log(this.movies); 
      },
      (error) => {
        console.error('Erro ao carregar filmes:', error);
      }
    );
  }

  loadYearsWithMultipleWinners(): void {
    this.multipleWinnerService.getYearsWithMultipleWinners().subscribe(
      (response) => {
        this.yearsWithMultipleWinners = response.years; 
        console.log(this.yearsWithMultipleWinners); 
      },
      (error) => {
        console.error('Erro ao carregar anos com múltiplos vencedores:', error);
      }
    );
  }

  loadStudioWinners(): void {
    this.studioService.getStudioWinners().subscribe(
      (response) => {
        this.studioWinners = response.studios; 
        console.log(this.studioWinners); 
      },
      (error) => {
        console.error('Erro ao carregar anos com múltiplos vencedores:', error);
      }
    );
  }

  loadProducerWinInterval(): void {
    this.producerWinIntervalService.getProducerWinIntervals().subscribe(
      (response) => {
        this.producerWinIntervals = {
          min: response.min,
          max: response.max 
        };
        console.log(this.producerWinIntervals); 
      },
      (error) => {
        console.error('Erro ao carregar intervalos de vitórias dos produtores:', error);
      }
    );
  }
}
