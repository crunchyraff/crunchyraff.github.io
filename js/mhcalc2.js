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
                { text: 'Purple', value: 1.39, bgcolor: 'purple' },
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
                case 1.39:
                    bgc = 'purple';
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
            // cRowExample.items.forEach((i)=>{console.log(i)});
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
            var i = 0, nMax = 0, nMin = 0;

            cRowExample.items.forEach((e) => {
                if(e.computed > nMax)
                    nMax = e.computed;
                if(nMin == 0 || nMin > e.computed)
                    nMin = e.computed;
            });

            cRowExample.items.forEach((e) => {
                i++;
                cData.push(e.computed);
                cLabels.push(e.label == '' ? i : e.label);
                cColors.push(`rgba(255, 99, 132, ${0.6 * ((e.computed - nMin + 10) / (nMax - nMin + 1))})`,);
                cBorders.push(`rgba(255, 99, 132, ${1 * ((e.computed - nMin + 10) / (nMax - nMin + 1))})`);
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
                                beginAtZero: false,
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

//******************************************************************************************************** */

window.onload = function(){
    var idleTimer = null;
    var idleState = true;
    var idleWait = 3000;
    var otb;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    $("#tableheader").next("input").focus();    
      
      //Make the canvas occupy the full page
      var W = window.innerWidth, H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      
      var particles = [];
      var mouse = {};
      
      //Lets create some particles now
      var particle_count = 20;
      for(var i = 0; i < particle_count; i++)
      {
          particles.push(new particle());
      }
      
      //finally some mouse tracking
      window.addEventListener('mousemove', track_mouse, false);
    
      
  /*  $(document).mouseup( function() {
        idleState = false;
      });
      $(document).mousedown( function() {
        idleState = false;
      });*/
    
    function track_mouse(e){
          //since the canvas = full page the position of the mouse 
          //relative to the document will suffice
      clearTimeout(idleTimer);
          mouse.x = e.pageX;
          mouse.y = e.pageY;
      document.onmousemove = function(e){
          idleState = false;
      }
      
      
      idleTimer = setTimeout(function () { 
            idleState = true;
        }, idleWait);
    }
      
      function particle()
      {
          //speed, life, location, life, colors
          //speed.x range = -2.5 to 2.5 
          //speed.y range = -15 to -5 to make it move upwards
          //lets change the Y speed to make it look like a flame
          this.speed = {x: 5 + Math.random()*10, y: -5 + Math.random()*10};
          //location = mouse coordinates
          //Now the flame follows the mouse coordinates
          if(mouse.x && mouse.y)
          {
              this.location = {x: mouse.x + 6, y: mouse.y + 2};
          }
          else
          {
              this.location = {x: W/2, y: H/2};
          }
  //    if (idleState == true) { 
  //   	this.radius = 0;
  //      this.life = 0;
  //      this.location = {x: null, y: null};
  //    }
  //    else
  //    {
        this.radius = 3+Math.random()*7;
  //      this.life = 10+Math.random()*100;
  //    }
          //radius range = 10-30
  // 		this.radius = 10+Math.random()*15;
          //life range = 20-30
          this.life = 20+Math.random()*10;
          this.remaining_life = this.life - 10;
          //colors
          this.r = Math.round(255);
          this.g = Math.round(140);
          this.b = Math.round(100);
      }
      
    function draw()
    {
          //Painting the canvas black
          //Time for lighting magic
          //particles are painted with "lighter"
          //In the next frame the background is painted normally without blending to the 
          //previous frame
  // 		ctx.globalCompositeOperation = "source-over";
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = "lighter";
          
          for(var i = 0; i < particles.length; i++)
          {
              var p = particles[i];
              ctx.beginPath();
              //changing opacity according to the life.
              //opacity goes to 0 at the end of life of a particle
              p.opacity = Math.round(p.remaining_life/p.life*80)/100
              //a gradient instead of white fill
              var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
              gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
              gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
              gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
              ctx.fillStyle = gradient;
              ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
              ctx.fill();
              
              //lets move the particles
              p.remaining_life -= .4;
              p.radius -= .2;
              p.location.x += p.speed.x / 2;
              p.location.y += p.speed.y / 4;
              
              //regenerate particles
              if(p.remaining_life < 0 || p.radius < 0)
              {
                  //a brand new particle replacing the dead one
                  particles[i] = new particle();
              }
          }
      }
    $('#onetruebow').change(function(){
        if($(this).is(':checked')){
            otb = setInterval(draw, 10);
        } else {
            clearInterval(otb);
            ctx.clearRect(0, 0, W, H);

        }
    });
}