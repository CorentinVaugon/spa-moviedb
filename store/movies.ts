import { MutationTree, ActionTree, GetterTree } from 'vuex'

import { GenreCollection, MoviesCollection } from '~/types/movies'

export interface MovieStore {
  search: string,
  year: number | null,
  currentPage: number,
  genres: Array<GenreCollection>,
  totalPages: number,
  movies: Array<Array<MoviesCollection>>,
  selectedMovies: Array<MoviesCollection>
  loading: boolean
}

export const state = (): MovieStore => ({
  search: '',
  year: null,
  currentPage: 1,
  genres: [] as GenreCollection[],
  totalPages: 0,
  // Be carefull, we start our array to 0
  movies: [] as Array<Array<MoviesCollection>>,
  selectedMovies: [] as Array<MoviesCollection>,
  loading: false
})

export type MovieState = ReturnType<typeof state>


// ACTIONS
export const actions: ActionTree<MovieState, MovieState> = {
  async init({commit}) {
    // Get genres
    const result = await this.$axios.get('/genre/movie/list?api_key=6948df1a72108e13f66535dd34a459ec')

    commit('INIT_GENRES', result.data.genres)
  },

  reinitStates({commit}) {
    commit('REINIT_STATE')
  },

  async searchMovies({commit, state}) {
    let url = `/search/movie?api_key=6948df1a72108e13f66535dd34a459ec&query=${state.search}&page=${state.currentPage}`

    if (state.year !== null) {
      url += `&year=${state.year}`
    }

    const result = await this.$axios.get(url)

    // Set total page
    if(state.totalPages === 0) {
      commit('SET_TOTAL_PAGES', result.data.total_pages)
    }

    // Set movies
    const movies = result.data.results.map((movie: any): MoviesCollection => {
      return {
        title: movie.title,
        voteAverage: movie.vote_average,
        releaseDate: movie.release_date,
        posterPath: movie.poster_path,
        genres: movie.genre_ids
      }
    })
    
    commit('SET_MOVIES_BY_PAGE', movies)
  },

  setSearchDatas({commit}, searchData: {search: string, year: number | null}) {
    commit('SET_SEARCH_DATAS', searchData)
  },

  setCurrentPage({commit}, page: number) {
    commit('SET_CURRENT_PAGE', page)
  },

  setSelectedMovies({commit}) {
    commit('SET_SELECTED_MOVIES')
  }
}

// MUTATIONS
export const mutations: MutationTree<MovieState> = {
  INIT_GENRES(state, genres: Array<GenreCollection>) {
    state.genres = genres
  },

  SET_SEARCH_DATAS(state, data: {search: string, year: number | null}) {
    state.search = data.search
    state.year = data.year
  },

  SET_CURRENT_PAGE(state, page: number) {
    state.currentPage = page
  },

  SET_TOTAL_PAGES(state, totalPages: number) {
    state.totalPages = totalPages
  },

  REINIT_STATE(state) {
    state.search = ''
    state.year = null
    state.currentPage = 1
    state.totalPages = 0
    state.movies = [],
    state.selectedMovies = []
  },

  SET_MOVIES_BY_PAGE(state, movies: Array<MoviesCollection>) {
    state.movies[state.currentPage-1] = movies
  },

  SET_SELECTED_MOVIES(state) {
    state.selectedMovies = state.movies[state.currentPage - 1]
  }
}

// GETTERS
export const getters: GetterTree<MovieState, MovieState> = {
  loading: state => state.loading,
  selectedMovies: (state) => state.selectedMovies
}