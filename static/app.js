Vue.filter('formatTime', function(value) {
    if (value) {
      const parts = value.split("-");
      return parts[2] + "/" + parts[1] + "/" + parts[0].substring(2, 4);
    } else {
      return None;
    }
}); 

var rssApp = new Vue({
    el: '#booking-app',
    
    data: {
        // items: [],
        old_booking: '',
        color_toggle: true,
        bookings: [],
        filter_by: 'date',
        date_filter: '',
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
            this.nbar = localStorage.getItem('nbar');
            if(localStorage.getItem('nbar')){
                if(this.nbar == 'table'){
                    this.getBookings();
                }
                else if(this.nbar == 'edit'){
                    this.editBookings();
                }
            }
            else{
                this.getBookings();
            }
        },

        getBookings: function() {
            this.api("/booking/table/").then((data) => {
                this.bookings = data;
                this.nbar = 'table';
                localStorage.setItem('nbar', this.nbar)
            });
        },

        editBookings: function() {
            this.api("/booking/table/").then((data) => {
                this.bookings = data;
                this.nbar = 'edit';
                localStorage.setItem('nbar', this.nbar)
            });
        },

        ifChange: function(value) {
            if(value != this.old_booking){
                this.color_toggle = !this.color_toggle;
            }
            this.old_booking = value;
            return this.color_toggle;
        },

        onChange: function() {
            console.log(this.filter_by);
        }
    



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
