const Time = require(__dirname + '/../util/time.js');
const Elevator = require(__dirname + '/elevator.js');
const ProblemRepository = require(__dirname + '/../repository/problem_repository.js');

const problem_repository = new ProblemRepository();

class State {
    constructor(user_key, token, problem_id, num_of_elevators) {
        this.user_key = user_key;
        this.token = token;
        this.created_time = Time.getCurrentMillisec();
        this.problem_id = problem_id;
        this.timestamp = 0;
        this.elevators = this._createElevators(num_of_elevators);
        this.calls = [];
        this.ended_calls = 0;
    }

    getElapsedTime() {
        return Time.getCurrentMillisec() - this.created_time;
    }
    
    isEnd() {
        const problem = problem_repository.get(this.problem_id);
        return (this.ended_calls == problem.calls.length);
    }

    _createElevators(num_of_elevators) {
        const elevators = [];
        for (let i = 0; i < num_of_elevators; i++) {
            elevators.push(new Elevator());
        }
        return elevators;
    }
}

module.exports = State;
