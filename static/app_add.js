var add_booking = new Vue({
    el: '#booking-add',
    
    data: {
        // items: [],
        principal: [{'pk': 1, 'name':'test1'}, {'pk': 2, 'name': 'eiei2'}, {'pk': 3, 'name': 'test3'}, {'pk': 4, 'name': 'test4'}],
        form: {
            prin:'',
            shipper: '',
            add:[]
        },
        shipper: [],
        // color_toggle: true,
        bookings: [],
        checked_bookings: [],
        filter_by: 'date',
        date_filter: '',
        nbar: 'table',
        booking_color: ['#9977b4', '#dd86b9', '#f497a9', '#f9b489', '#fdcd79', '#fff68f', '#b6d884', '#81cbb5', '#6acade', '#72abdd'],
        color_index: 0,
        action: '',
        all_checked: false,
        edit: [],
        search: '',
        loading: false

    },

    computed: {
        filteredPrincipal() {
            if(this.search === '') return this.principal
            return this.principal.filter(principal => {
                return principal.name.toLowerCase().includes(this.search.toLowerCase())
            })   
        }
      },

    methods: {
        api: function (endpoint, method, data) {
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

        select(index) {
            this.form.prin = index
            this.api("/booking/shipper/", "POST", {prin: this.form.prin}).then((data) => {
                this.shipper = data;
                console.log(this.shipper)
            });
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
                    // this.getBookings();
                }
                else if(this.nbar == 'edit'){
                    this.editBookings();
                }
                else if(this.nbar == 'time'){
                    this.timeBookings();
                }
            }
            else{
                // this.getBookings();
            }
            
        },

        getBookings: function() {
            window.location.href = '/booking/';
        }
    }
});
