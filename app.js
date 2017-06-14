new Vue({
  // We want to target the div with an id of 'things'
  el: '#things',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    thing: { name: '', description: '', date: '' },
    things: []
  },

  // Anything within the ready function will run when the application loads
  mounted: function () {
    console.log("Iniciado!!!");
    this.fetchThings();
  },

  beforeCreate: function() {
    console.log("beforeCreate");

    var storageThings = [
      {
        id: 1,
        name: 'Cosa 0',
        description: 'Descripcion 0.',
        date: '2011-11-11'
      },
      {
        id: 2,
        name: 'Cosa 222',
        description: 'Descripcion 1.',
        date: '2012-12-12'
      }
    ];

    if(localStorage["storageThings"] == null || localStorage["storageThings"].length == 0){
      console.log("localStorage esta vacio")
      localStorage["storageThings"] = JSON.stringify(storageThings);
      this.$set(this, 'things', localStorage["storageThings"]);       //this = contenedor id="things", things = array inicializado en data
    }
  },

  // Methods we want to use in our application are registered here
  methods: {
    // We dedicate a method to retrieving and setting some data
    fetchThings: function() {
      var things = [
        {
          id: 1,
          name: 'Cosa 1',
          description: 'Descripcion 1.',
          date: '2011-11-11'
        },
        {
          id: 2,
          name: 'Cosa 2',
          description: 'Descripcion 2.',
          date: '2012-12-12'
        }
      ];

      var storageThings = JSON.parse(localStorage["storageThings"]);  // en localStorage solo se puede guardar strings asi que se parsea
      // $set is a convenience method provided by Vue that is similar to pushing
      // data onto an array
      // Asincrono
      this.$set(this, 'things', things);       //this = contenedor id="things", things = array inicializado en data
      //this.$set(this, 'things', storageThings); // muestra el array de localStorage
    },
    // Adds a thing to the existing things array
    addThing: function() {
      if(this.thing.name) {
        this.things.push(this.thing);
        this.thing = { name: '', description: '', date: '' }; //Inicializamos el objeto para la siguiente cosa y limpiar el formulario
      }else{
        this.thing = { error: "cubre el nombre"};
      }
    },

    deleteThing: function(index) {
      console.log("Borrando elemento: "+index);
      this.$delete(this.things,index);   // es asincrono
    },

    updateThing: function() {
      console.log("Funcion update");
    }

  }
});

