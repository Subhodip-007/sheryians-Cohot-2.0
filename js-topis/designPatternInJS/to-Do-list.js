class TaskStore {
    constructor() {
        this.tasks = [];
        
    }

    addTask(taskName) {
        this.tasks.push(taskName);

    }

    getTotalTasks() {
        return this.tasks.length;
    }

    showTaskList() {
        if (this.tasks.length === 0) {
            console.log("No tasks available");
            return;
        }

        this.tasks.forEach((task, index) => {
            console.log(`Task ${index + 1}: ${task}`);
        });
    }
    removetask(idx){

        if(this.tasks.length === 0){
            return `there is no task to remove \n TaskCount : ${this.tasks.length}`

        }
        if(idx<1 || idx>this.tasks.length)return `invalid task number`
        this.tasks.splice(idx-1, 1)[0];
    }
}
let ts1=new TaskStore;
