Vue.filter('formatTime', function(value) {
    if (value) {
      const parts = value.split("-");
      return parts[2] + "/" + parts[1] + "/" + parts[0].substring(2, 4);
    } else {
      return ;
    }
}); 

var rssApp = new Vue({
    el: '#booking-app',
    
    data: {
        // items: [],
        old_booking: '',
        // color_toggle: true,
        bookings: [],
        checked_bookings: [],
        filter_by: 'date',
        date_filter: '',
        nbar: 'table',
        booking_color: ['#9977b4', '#dd86b9', '#f497a9', '#f9b489', '#fdcd79', '#fff68f', '#b6d884', '#81cbb5', '#6acade', '#72abdd'],
        color_index: -1,
        action: '',
        all_checked: false,
        color: '',
    },
    // computed: {
    //     ifChange: function(value, obj_length, index) {
            
    //         if(value == '' & index == 0){
    //             this.color_index = 0;
    //         }

    //         if(value != this.old_booking ){
    //             this.color_index += 1;
    //         }           
    //         this.old_booking = value;

    //         this.color = this.booking_color[this.color_index];
    //         if(this.color_index >= 10 | index == obj_length-1) {
    //             this.color_index = -1;
    //         }

    //         return this.color;
    //     },
    // },

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
            // if(localStorage.getItem('checked_bookings')){
            //     this.checked_bookings = localStorage.getItem('checked_bookings');
            // }
            if(localStorage.getItem('filter_by')){
                this.filter_by = localStorage.getItem('filter_by');
            }
            if(localStorage.getItem('date_filter')){
                this.date_filter = localStorage.getItem('date_filter');
            }

            if(localStorage.getItem('nbar')){
                this.nbar = localStorage.getItem('nbar');
                if(this.nbar == 'table'){
                    this.getBookings();
                }
                else if(this.nbar == 'edit'){
                    this.editBookings();
                }
                else if(this.nbar == 'time'){
                    this.timeBookings();
                }
            }
            else{
                this.getBookings();
            }
        },

        getBookings: function() {
            this.filterBookings();
            this.nbar = 'table';
            localStorage.setItem('nbar', this.nbar);
        },

        editBookings: function() {
            this.filterBookings();
            this.nbar = 'edit';
            localStorage.setItem('nbar', this.nbar);
        },

        timeBookings: function() {

            this.filterTimeBookings();
            this.nbar = 'time';

            localStorage.setItem('nbar', this.nbar);
        },

        ifChange: function(value, obj_length, index) {
            
            if(value == '' & index == 0){
                this.color_index = 0;
            }

            if(value != this.old_booking ){
                this.color_index += 1;
            }           
            this.old_booking = value;

            this.color = this.booking_color[this.color_index];
            if(this.color_index >= 10 | index == obj_length-1) {
                this.color_index = -1;
            }

            // return color;
        },

        changeType: function() {
            this.date_filter = '';
        },

        filterBookings: function() {
            this.checked_bookings = [];
            this.all_checked = false;
            if(this.date_filter) {
                this.api("/booking/table/", "POST", {filter_by: this.filter_by, date_filter: this.date_filter}).then((data) => {
                    this.bookings = data.bookings;
                });
            }
            else {
                this.api("/booking/table/").then((data) => {
                    this.bookings = data.bookings;
                });
            }
            
            localStorage.setItem('filter_by', this.filter_by);
            localStorage.setItem('date_filter', this.date_filter);

        },

        filterTimeBookings: function() {
            this.api("/booking/time/", "POST", {checked_bookings: this.checked_bookings}).then((data) => {
                this.bookings = data.bookings;
            });
            

        },

        selectAll: function() {
            this.checked_bookings = [];

            if (!this.all_checked) {
                for (booking in this.bookings) {
                    this.checked_bookings.push(this.bookings[booking].pk);   
                }
            }
        },

        selectAction: function() {
            if (this.checked_bookings.length == 0){
                alert('select?');
            }
            else if (this.action == 'delete'){
                if (confirm('Are you sure?')){
                    alert('sure?');
                }
                // localStorage.setItem('all_checked', this.all_checked);
                // localStorage.setItem('checked_bookings', this.checked_bookings);
            }
            else if (this.action == 'time') {
                this.timeBookings();
                // localStorage.setItem('checked_bookings', this.checked_bookings);
            }
            else {
                alert('sure?');
            }

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
