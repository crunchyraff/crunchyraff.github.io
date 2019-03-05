var modalData = {
    label: '',
    power: '',
    type: '',
    mult: '',
    affinity: '',
    sharpness: '',
    modifiers: '',
    boost: '',
    computedPower: ''
}
var myChart = new Chart({},{});

var elem = document.querySelector('.modal-trigger');

$(document).ready(function () {
    $('.modal').modal();

});

// console.log(instance);

Vue.component('custom-row', {
    template: '#custom-row-template',
    methods: {
        deleteRow: function () {
            var index = cRowExample.items.indexOf(this.item)
            if (index > -1 && cRowExample.items.length > 1) {
                cRowExample.items.splice(index, 1);
            }
        },
        getMult: function (val) {
            var mul = 1;
            switch (val) {
                case 'sa':
                    mul = 5.4;
                    break;
                case 'hm':
                case 'hh':
                    mul = 5.2;
                    break;
                case 'gs':
                    mul = 4.8;
                    break;
                case 'cb':
                    mul = 3.6;
                    break;
                case 'ls':
                    mul = 3.3;
                    break;
                case 'ig':
                    mul = 3.1;
                    break;
                case 'ln':
                case 'gl':
                    mul = 2.3;
                    break;
                case 'hbg':
                    mul = 1.5;
                    break;
                case 'sns':
                case 'db':
                    mul = 1.4;
                    break;
                case 'lbg':
                    mul = 1.3;
                    break;
                case 'bow':
                    mul = 1.2;
                    break;
                case 'raw':
                    mul = 1;
                    break;
            }
        },
        getComp: function () {
            return this.item.computedPower;
        }
    },
    props: ['item'],
    data: function () {
        return {
            selected: 1.05,
            options: [
                { text: 'Red', value: 0.5, bgcolor: 'red' },
                { text: 'Orange', value: 0.75, bgcolor: 'orange' },
                { text: 'Yellow', value: 1, bgcolor: 'yellow' },
                { text: 'Green', value: 1.05, bgcolor: 'green' },
                { text: 'Blue', value: 1.2, bgcolor: 'blue' },
                { text: 'White', value: 1.32, bgcolor: 'white' },
            ],
            weapons: [
                { text: 'True Raw', value: 'raw', mult: 1 },
                { text: 'Great Sword', value: 'gs', mult: 4.8 },
                { text: 'Long Sword', value: 'ls', mult: 3.3 },
                { text: 'Sword and Shield', value: 'sns', mult: 1.4 },
                { text: 'Dual Blades', value: 'db', mult: 1.4 },
                { text: 'Lance', value: 'ln', mult: 2.3 },
                { text: 'Gunlance', value: 'gl', mult: 2.3 },
                { text: 'Hammer', value: 'hm', mult: 5.2 },
                { text: 'Hunting Horn', value: 'hh', mult: 5.2 },
                { text: 'Switch Axe', value: 'sa', mult: 5.4 },
                { text: 'Charge Blade', value: 'cb', mult: 3.6 },
                { text: 'Insect Glaive', value: 'ig', mult: 3.1 },
                { text: 'Light Bowgun', value: 'lbg', mult: 1.3 },
                { text: 'Heavy Bowgun', value: 'hbg', mult: 1.5 },
                { text: 'Bow', value: 'bow', mult: 1.2 },
            ],
            computed: 0,
        }
    },
    computed: {
        label: {
            get: function () {
                return this.item.label;
            },
            set: function (val) {
                this.item.label = val;
            }
        },
        power: {
            get: function () {
                return this.item.power;
            },
            set: function (val) {
                this.item.power = val;
            }
        },
        type: {
            get: function () {
                return this.item.type;
            },
            set: function (val) {
                this.item.mult = getMult(val);
                this.item.type = val;
            }
        },
        mult: function () {
            return getMult(this.item.type);
        },
        affinity: {
            get: function () {
                return this.item.affinity;
            },
            set: function (val) {

                this.item.affinity = val > 100 ? 100 : val;
            }
        },
        sharpness: {
            get: function () {
                return this.item.sharpness;
            },
            set: function (val) {
                this.item.sharpness = val;
            }
        },
        boost: {
            get: function () {
                return this.item.boost;
            },
            set: function (val) {

                this.item.boost = val;
            }
        },
        comp: function() {
            return this.computedPower;
        },
        computedPower: {
            cache: false,
            get: function () {
                var nPow = parseFloat(this.item.power) || 0;
                var nAff = parseFloat(this.item.affinity) || 0;
                var nSha = parseFloat(this.item.sharpness);
                var nBoo = parseFloat(0.25 + (0.05 * parseFloat(this.item.boost)));
                var nTyp = getMult(this.item.type);
                var nTxt = this.item.type;
                nPow /= nTyp;
                if (nTxt == 'bow' || nTxt == 'lbg' || nTxt == 'hbg') {
                    nSha = 1;
                };
                var cpt = ((nPow + (nPow * (nAff / 100)) * nBoo) * nSha).toFixed(2);
                this.item.computed = cpt;
                return isNaN(cpt) ? 0 : cpt;
            },
            set: function (val) {
                this.item.computed = val;
            }
        },
        selectBG: function () {
            var bgc = 'green';
            switch (this.item.sharpness) {
                case .5:
                    bgc = 'red';
                    break;
                case .75:
                    bgc = 'orange';
                    break;
                case 1:
                    bgc = 'yellow';
                    break;
                case 1.05:
                    bgc = 'green';
                    break;
                case 1.2:
                    bgc = 'blue';
                    break;
                case 1.32:
                    bgc = 'white';
                    break;
                default:
            }
            return bgc;
        },
    }
})

var addRowButton = new Vue({
    el: '#addButton',
    methods: {
        addRow: function () {
            cRowExample.items.push(Object.assign({}, cRowExample.items[cRowExample.items.length - 1]));
            // cRowExample.items.forEach((i)=>{console.log(i.type)});
        }
    }
})

var getChartButton = new Vue({
    el: '#chart-btn',
    methods: {
        getChart: function () {
            var cData = [];
            var cLabels = [];
            var cColors = [];
            var cBorders = [];
            var i = 0;
            cRowExample.items.forEach((e) => {
                i++;
                cData.push(e.computed);
                cLabels.push(e.label == '' ? i : e.label);
                cColors.push('rgba(255, 99, 132, 0.2)',);
                cBorders.push('rgba(255,99,132,1)');
            });
            // cRowExample.items.forEach((i)=>{console.log(i.type)});
            var ctx = document.getElementById("myChart").getContext('2d');
            if(myChart){myChart.destroy();};
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: cLabels,
                    datasets: [{
                        label: 'Computed Attack Power',
                        data: cData,
                        backgroundColor: cColors,
                        borderColor: cBorders,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }
})

var cRowExample = new Vue({
    el: '#customRowExample',
    data: {
        items: [
            {
                'label': '',
                'power': 100,
                'type': 'raw',
                'affinity': 0,
                'boost': 0,
                'sharpness': 1.05
            },
        ]
    },
    methods: {
        getPower: function () {
            return items.computedPower;
        }
    },
})

function getMult(val) {
    var mul = 1;
    switch (val) {
        case 'sa':
            mul = 5.4;
            break;
        case 'hm':
        case 'hh':
            mul = 5.2;
            break;
        case 'gs':
            mul = 4.8;
            break;
        case 'cb':
            mul = 3.6;
            break;
        case 'ls':
            mul = 3.3;
            break;
        case 'ig':
            mul = 3.1;
            break;
        case 'ln':
        case 'gl':
            mul = 2.3;
            break;
        case 'hbg':
            mul = 1.5;
            break;
        case 'sns':
        case 'db':
            mul = 1.4;
            break;
        case 'lbg':
            mul = 1.3;
            break;
        case 'bow':
            mul = 1.2;
            break;
        case 'raw':
            mul = 1;
            break;
    }
    return mul;
}

