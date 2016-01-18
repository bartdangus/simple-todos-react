//Define a collection to hold tasks
Tasks = new Mongo.Collection("tasks");




if (Meteor.isClient){
  //shit executes on client side only

  Meteor.startup(function (){
    //Use Meteor.startup to render the compnenet after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}