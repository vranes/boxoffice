<template>
  <div class="home">
        <ReviewList/>
        <br>
        <b-container>
            <b-row>
                <b-col cm="6">
                <AddReview/>
                </b-col>
            </b-row>
        </b-container>
  </div>
</template>

<script>
import ReviewList from "@/components/ReviewList";
import AddReview from "@/components/AddReview";


export default {
    name: 'reviews',
    data() {
        return {
            reviews: []
        }
    },
    components: {
        ReviewList,
        AddReview
    }
}
</script>