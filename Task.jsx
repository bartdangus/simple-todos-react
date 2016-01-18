//Task compnent - represent a single todo item
Task = React.createClass({
	propTypes: {
		//this compenent get the task to display through a react prop
		//we can use propTypes to indicate it is required
		task: React.PropTypes.object.isRequired
	},

	toggleChecked() {
		//Set the cehcked property to the opposite of its current value
		Tasks.update(this.props.task._id, {
			$set: {checked: ! this.props.task.checked}
		});
	},

	deleteThisTask() {
		Tasks.remove(this.props.task._id);
	},

	render(){
		//Gives tasks a different className when they are checked off, so we can style them with CSS
		const taskClassName = this.props.task.checked ? "checked" : "";

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

					<span className="text">{this.props.task.text}</span>
			</li>
		);
	}
});