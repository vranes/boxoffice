<template>
    <b-container fluid>
        <b-row>
            <b-col sm="2">
                <label for="movie">Movie title:</label>
            </b-col>
            <b-col sm="10">
                <p id="movie" style="text-align: left">{{ review.movie }}</p>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col sm="2">
                <label for="user">Username:</label>
            </b-col>
            <b-col sm="10">
                <p id="user" style="text-align: left">{{ review.user }}</p>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col sm="2">
                <label for="review">Review:</label>
            </b-col>
            <b-col sm="10">
                <p id="review" style="text-align: left">{{ review.review }}</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "ShowReview",
        props: {
            review: Object
        }
    }
</script>