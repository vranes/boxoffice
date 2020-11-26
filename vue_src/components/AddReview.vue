<template>
    <div>
        <b-container fluid>
                <b-form>
                    <b-row class="mt-2">
                        <b-col sm="2" offset="2">
                            <b-input v-model="newMovie" class="mb-2 mr-sm-2 mb-sm-0" placeholder="movie title"></b-input>
                        </b-col>
                        <br>
                        <b-col sm="2" offset="2">
                            <b-input v-model="newUser" class="mb-2 mr-sm-2 mb-sm-0" placeholder="username"></b-input>
                        </b-col>
                        <br><br>
                        <b-col sm="6" offset="2">
                            <b-form-textarea v-model="newReview" placeholder="write your review here"></b-form-textarea>
                        </b-col>
                        <br>
                        <b-col sm="2" offset="0">
                            <b-button variant="primary" size="mb" @click="addNew">Add review</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-container>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "AddReview",
        props: {
            movie: {
                type: String,
                default: ''
            },
            user: {
                type: String,
                default: ''
            },
            review: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                newMovie: '',
                newUser: '',
                newReview: ''
            }
        },
        mounted: function () {
            this.newMovie = this.movie;
            this.newUser = this.user;
            this.newReview = this.review;
        },
        methods: {
            ...mapActions(['new_review']),

            addNew: function() {
                const r = JSON.stringify({movie: this.newMovie, user: this.newUser, review: this.newReview});
               
                this.new_review(r);

                this.newMovie = '';
                this.newUser = '';
                this.newReview = '';
            }
        }
    }
</script>


<style scoped>

</style>