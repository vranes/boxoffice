<template>
    <div>
        <b-jumbotron header="Box Office" :lead="'Total movies: ' + movies.length">
            <b-container fluid>
                <b-form>
                    <b-table 
                        hover 
                        v-if="movies.length" 
                        sticky-header="800px" 
                        :fields="fields"
                        :items="movies" 
                        head-variant="light" 
                        @row-clicked="rowClick">
                    </b-table>
                    <h1 v-else>No movies</h1>
                </b-form>
            </b-container>
        </b-jumbotron>
    </div>
</template>

<script>
    import router from "@/router";
    import { mapState } from 'vuex';

    export default {
        name: "MovieList",
        computed: {
            ...mapState(['movies'])
        },
        data() {
            return {
                fields: [
                    { key: 'title' },
                    { key: 'year' },
                    { key: 'box_office' },
                ]
            }
        },
        methods: {

            rowClick: function () {
                router.push({path: "/edit"})
            }
        }
    }
</script>


<style>
    tr:hover td{
        background: lightgreen;
    }
</style>