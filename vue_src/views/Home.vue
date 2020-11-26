<template>
  <div class="home">
        <MovieList/>
        <b-container>
            <b-row>
                <b-col cm="6">
                <AddMovie/>
                </b-col>
            </b-row>
        </b-container>
  </div>
</template>

<script>
import AddMovie from "@/components/AddMovie";
import MovieList from "@/components/MovieList";

export default {
    name: 'home',
    data() {
        return {
            movies: []
        }
    },
    components: {
        MovieList,
        AddMovie
    }
}
</script>
