var rssApp = new Vue({
    el: '#booking-app',
    
    data: {
        // items: [],
        bookings: [],
        nbar: '',
    },

    methods: {
        api: function(endpoint, method, data) {
            var config = {
                method: method || 'GET',
                body: data !== undefined ? JSON.stringify(data) : null,
                headers: {
                    'content-type': 'application/json'
                }
            };

            return fetch(endpoint, config)
                .then((response) => response.json())
                .catch((error) => console.log(error));
        },

        reload: function() {
            this.getBookings();
            // this.getFeeds();
        },

        getBookings: function() {
            this.api("/booking/table/").then((data) => {
                this.bookings = data.data;
                this.nbar = data.nbar;
            });
        },

        // getItems: function() {
        //     this.api("/rss/items/").then((items) => {
        //         this.items = items;
        //     });
        // },

        // newFeed: function() {
        //     this.api("/rss/feeds/", "POST", { url: this.newLink }).then(() => {
        //         this.reload();
        //     });
        // },

        // deleteFeed: function(id) {
        //     this.api("/rss/feeds/" + id + "/", "DELETE").then(() => {
        //         this.reload();
        //     });
        // }
    }
});