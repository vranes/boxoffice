import Vue from 'vue'
import Vuex from 'vuex'
const Joi = require('joi');

Vue.use(Vuex);

const reviewSchema = Joi.object().keys({
  movie: Joi.string().trim().min(2).max(45).required(),
  user: Joi.string().trim().min(5).max(45).required(),
  review: Joi.string().trim().min(2).max(300).required(),
})

const movieSchema = Joi.object().keys({
  title: Joi.string().trim().min(2).max(45).required(),
  year: Joi.number().integer().min(1900).max(2020).required(),
  boxoffice: Joi.number().precision(1).max(999.9).required()
})


export default new Vuex.Store({
  state: {
    movies: [],
    reviews: []
  },

  mutations: {
    set_movies: function (state, movies) {
      state.movies = movies;
    },

    add_movie: function (state, movie) {
      state.movies.push(movie);
    },

    remove_movie: function (state, id) {
      for (let m = 0; m < state.movies.length; m++) {
        if (state.movies[m].id === id) {
          state.movies.splice(m, 1);
          break;
        }
      }
    },

    update_movie: function (state, payload) {
      for (let m = 0; m < state.movies.length; m++) {
        if (state.movies[m].id === parseInt(payload.id)) {
          state.movies[m].title = payload.movie.title;
          state.movies[m].year = payload.movie.year;
          state.movies[m].box_office = payload.movie.box_office;
          break;
        }
      }
    },

    set_reviews: function (state, reviews) {
      state.reviews = reviews;
    },

    add_review: function (state, review) {
      state.reviews.push(review);
    },

    remove_review: function (state, id) {
      for (let m = 0; m < state.reviews.length; m++) {
        if (state.reviews[m].id === id) {
          state.reviews.splice(m, 1);
          break;
        }
      }
    },

    update_review: function (state, payload) {
      for (let m = 0; m < state.reviews.length; m++) {
        if (state.reviews[m].id === parseInt(payload.id)) {
          state.reviews[m].movie = payload.review.movie;
          state.reviews[m].user = payload.review.user;
          state.reviews[m].review = payload.review.review;
          break;
        }
      }
    }
  },

  actions: {
    load_movies: function ({ commit }) {
      fetch('http://localhost/api/movies', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_movies', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    delete_movie: function({ commit }, id) {
      fetch(`http://localhost/api/movies/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_movie', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    new_movie: function({ commit }, movie) {
     
      let {error} = movieSchema.validate(JSON.parse(movie));
      if(error){
        alert("Bad input: \n" + error.details[0].message);
        return;
      }

      fetch('http://localhost/api/movies', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: movie
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_movie', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    change_movie: function({ commit }, payload) {

      let {error} = movieSchema.validate(JSON.parse(payload.movie));
      if(error){
        alert("Bad input: \n" + error.details[0].message);
        return;
      }

      fetch(`http://localhost/api/movies/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.movie
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('update_movie', {id: payload.id, movie: jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    
    load_reviews: function ({ commit }) {
      fetch('http://localhost/api/reviews', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_reviews', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    delete_review: function({ commit }, id) {
      fetch(`http://localhost/api/reviews/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_review', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    new_review: function({ commit }, review) {

      let {error} = reviewSchema.validate(JSON.parse(review));
      if(error){
        alert("Bad input: \n" + error.details[0].message);
        return;
      }

      fetch('http://localhost/api/reviews', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: review
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_review', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    change_review: function({ commit }, payload) {

      let {error} = reviewSchema.validate(JSON.parse(payload.review));
      if(error){
        alert("Bad input: \n" + error.details[0].message);
        return;
      }

      fetch(`http://localhost/api/reviews/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.review
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('update_review', {id: payload.id, review: jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    }
  }
})
