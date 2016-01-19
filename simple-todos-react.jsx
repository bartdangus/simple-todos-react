//Define a collection to hold tasks
Tasks = new Mongo.Collection("tasks");




if (Meteor.isClient){
  //shit executes on client side only
  Accounts.ui.config({
  	passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.subscribe("tasks");

  Meteor.startup(function (){
    //Use Meteor.startup to render the compnenet after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}
/////////////////////////////////////////////////////////////////////////////////////
if (Meteor.isServer) {
	//only publish tasks that are public or belong to the current user
	Meteor.publish("tasks", function () {
		return Tasks.find({
			$or: [
				{ private: {$ne: true} },
				{ owner: this.userId }
				]
		});
	});
}

Meteor.methods({
	addTask(text) {
		//makes sure the user is logged in before inserting a task
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},

	removeTask(taskId) {
		const task = Tasks.findOne(taskId);
		if (task.private && task.owner !== Meteor.userId()) {
			//if the task is private, make sure only the owner can delete it
			throw new Meteor.Error("not-authorized");
		}

		Tasks.remove(taskId);
	},

	setChecked(taskId, setChecked) {
		const task = Tasks.findOne(taskId);
		if (task.private && task.owner !== Meteor.userId()) {
			//if the task is private, make sure only the owner can check it off
			throw new Meteor.Error("not-authorized");
		}

		Tasks.update(taskId, { $set: {checked: setChecked} });
	},

	setPrivate(taskId, setToPrivate) {
		const task = Tasks.findOne(taskId);

		//makes sure only the task owner can make a task private
		if (task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.update(taskId, { $set: { private: setToPrivate } });
	}

});














