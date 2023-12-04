package com.github.cinerollbackend.service;

import com.github.cinerollbackend.models.Movie;
import com.github.cinerollbackend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> allMovies(){
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieByImdbId(String imdbId){
        return movieRepository.findMovieByImdbId(imdbId);
    }
}
