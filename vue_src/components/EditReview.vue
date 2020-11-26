<template>
    <b-container fluid>
        <b-form>
            <b-row class="mt-2">
                <b-col sm="5">
                    <b-form-textarea v-model="newText" placeholder="Edit your review here"></b-form-textarea>
                </b-col>
                <b-col sm="1">
                    <b-button variant="primary" size="lg" @click="updateReview">Update</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "EditReview",
        props: {
            review: Object 
        },
        data() {
            return {
                newText: ''
            }
        },
        mounted: function () {
            this.newText = this.review.review
        },
        methods: {
            ...mapActions(['change_review']),

            updateReview: function() {
                const newReview = JSON.stringify({movie: this.review.movie, user: this.review.user, review: this.newText});

                this.change_review({id: this.$route.params.id, review: newReview});
                
            }
        }
    }
</script>

<style scoped>

</style>