<template>
    <div>
        <b-jumbotron header="Box Office reviews" :lead="'Total reviews: ' + reviews.length">
            <b-container fluid>
                <b-form>
                    <b-table 
                        hover 
                        v-if="reviews.length" 
                        sticky-header="800px" 
                        :items="reviews"
                        :fields="fields"
                        head-variant="light" 
                        @row-clicked="rowClick">
                        <template v-slot:cell(action)="row">
                            <b-button variant="danger" @click="delete_review(row.item.id)">Delete</b-button>
                        </template>
                    </b-table>
                    <h1 v-else>No reviews</h1>
                </b-form>
            </b-container>
        </b-jumbotron>
    </div>
</template>

<script>
    import router from "@/router";
    import { mapState, mapActions  } from 'vuex';

    export default {
        name: "ReviewList",
        computed: {
            ...mapState(['reviews'])
        },
        data() {
            return {
                fields: [
                    { key: 'movie' },
                    { key: 'user' },
                    { key: 'review' },
                    { key: 'action' }
                ]
            }
        },
        methods: {
            ...mapActions(['delete_review']),

            rowClick: function (item) {
        
                router.push({path: `/edit/${item.id}`});
                
            }
        }
    }
</script>


<style>
    tr:hover td{
        background: lightgreen;
    }
</style>