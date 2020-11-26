<template>
    <div>
        <b-container fluid>
                <b-form>
                    <b-row class="mt-2">
                        <b-col sm="2" offset="2">
                            <b-input v-model="newTitle" class="mb-2 mr-sm-2 mb-sm-0" placeholder="movie title"></b-input>
                        </b-col>
                        <b-col sm="2" offset="2">
                            <b-input v-model="newYear" class="mb-2 mr-sm-2 mb-sm-0" placeholder="release year"></b-input>
                        </b-col>
                        <b-col sm="2" offset="2">
                            <b-input v-model="newBoxoffice" class="mb-2 mr-sm-2 mb-sm-0" placeholder="box office ($M)"></b-input>
                        </b-col>
                        <b-col sm="2" offset="0">
                            <b-button variant="primary" size="mb" @click="addNew">Add movie</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-container>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "AddMovie",
        props: {
            title: {
                type: String,
                default: ''
            },
            year: {
                type: String,
                default: ''
            },
            boxoffice: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                newTitle: '',
                newYear: '',
                newBoxoffice: ''
            }
        },
        mounted: function () {
            this.newTitle = this.title;
            this.newYear = this.year;
            this.newBoxoffice = this.boxoffice;
        },
        methods: {
            ...mapActions(['new_movie']),

            addNew: function() {
                const msg = JSON.stringify({title: this.newTitle, year: this.newYear, boxoffice: this.newBoxoffice});
               
                this.new_movie(msg);

                this.newTitle = '';
                this.newYear = '';
                this.newBoxoffice = '';
            }
        }
    }
</script>


<style scoped>

</style>