import axios from 'axios';
import {key} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
        // this.result =  this.getResults(query);
    }


    async getResults() {
        // const key = 'c6a7a46f2bc367fb68aa2c0aaea90f4f';

        try {
            const returned = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            // const returned = await axios(`http://localhost:8071/mock?query=${this.query}`);
            this.result = returned.data.recipes
        } catch (error) {
            alert(error);
        }

    }

}
