<template>
    <div>
        <Header/>
        <b-container>
            <b-row>
                <b-col cm="6" >
                    <div v-if="this.$route.params.id">
                        <ShowReview v-if="reviews.length" :review="review"/>
                        <EditReview v-if="reviews.length" :review="review"/>
                    </div>
                    <div v-else>
                        <b-container>
                            <b-row>
                                <b-col cm="6">
                                    <AddReview/>
                                </b-col>
                            </b-row>
                         </b-container>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import ShowReview from "@/components/ShowReview";
    import EditReview from "@/components/EditReview";
    import AddReview from "@/components/AddReview";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "Edit",
        components: {
            ShowReview,
            EditReview,
            AddReview
        },
        computed: {
            ...mapState(['reviews']),
            
            review: function () {
                
                for (let i = 0; i < this.reviews.length; i++)
                    if (this.reviews[i].id === parseInt(this.$route.params.id))
                        return this.reviews[i];
                return null;
            }
        },
        methods: {
            ...mapActions(['load_reviews']),
        }
    }
</script>

<style scoped>

</style>