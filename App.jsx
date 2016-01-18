//App compnent - represents the whole app

App = React.createClass({

	//This mixin make the getMeteorData method work
	mixins: [ReactMeteorData],

	//this loads items from the Tasks Collection and puts them on this.data.tasks
	getMeteorData(){
		return {
			tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
		}
	},

	renderTasks(){
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},

	handleSubmit(event) {
		event.preventDefault();

		//Find the text field via the React ref
		var text = React.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text: text,
			createdAt: new Date() //this gives it the current time
		});

		//This clears the form
		React.findDOMNode(this.refs.textInput).value = "";
	},

	render() {
		return (
			<div className="container">
				<header>
					<h1> Todo List</h1>

					<form className="new-task" onSubmit={this.handleSubmit} > 
						<input
							type="text"
							ref="textInput" //line 24 finds this
							placeholder="Type to add new task" />
					</form> 
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
});