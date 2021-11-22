import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  post = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.movieService.getPost(id).subscribe(result => {
      this.post = result;
    });
  }
}
