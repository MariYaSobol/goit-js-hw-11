import axios from "axios";

export default class searchImageApi {
    constructor() {
        this.baseURL = 'https://pixabay.com/api/';
        this.apiKey = '33770559-c394114938a05872ba356bd5c';
        this.searchName = '';
        this.imageType = 'photo';
        this.orientation = 'horizontal';
        this.safesearch = 'true';
        this.page = 1;
        this.per_page = 40;
    }

    async searchImages() {
        const requestURL = `${this.baseURL}?key=${this.apiKey}&q=${this.searchName}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`;

        return await axios.get(requestURL)
        .then(response => {
            if (response.status !== 200 || response.data.hits.length === 0) {
                throw new Error(response.status)
            }
            this.nextPage();

            return response.data;
        })
    }

    nextPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    setSearchName(name) {
        this.searchName = name;
    }
}


