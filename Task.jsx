//Task compnent - represent a single todo item
Task = React.createClass({
	propTypes: {
		//this compenent get the task to display through a react prop
		//we can use propTypes to indicate it is required
		task: React.PropTypes.object.isRequired,
		showPrivateButton: React.PropTypes.bool.isRequired
	},

	toggleChecked() {
		//Set the cehcked property to the opposite of its current value
		Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
	},

	deleteThisTask() {
		Meteor.call("removeTask", this.props.task._id);
	},

	togglePrivate() {
		Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
	},

	render(){
		//Gives tasks a different className when they are checked off, so we can style them with CSS
		const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
			(this.props.task.private ? "private" : "");

		return (
			<li className={taskClassName}>
				<button className="delete" onClick={this.deleteThisTask}>
					&times;
				</button>

				<input
					type="checkbox"
					readOnly={true}
					checked={this.props.task.checked}
					onClick={this.toggleChecked} />

					{ this.props.showPrivateButton ? (
						<button className="toggle-private" onClick={this.togglePrivate}>
							{ this.props.task.private ? "Private" : "Public"} 
						</button>
					) : ''}

					<span className="text">
						<strong>{this.props.task.username}</strong>: {this.props.task.text}
					</span>
			</li>
		);
	}
});