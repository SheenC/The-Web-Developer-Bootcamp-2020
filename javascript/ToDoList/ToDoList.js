let input = prompt("What would you like to do?");
const todo = [];

while (input !== "quit" && input !== "q") {
    if (input === "new") {
        const newToDo = input = prompt("OK! What is the new to do?");
        todo.push(newToDo);
        console.log(`${newToDo} added to the list!`);  
    }
    else if (input === "list") {
        console.log("********************************");
        for (let i = 0; i < todo.length; i++) {
            console.log(`${i}: ${todo[i]}`);
        }
        console.log("********************************");
    }
    else if (input === "delete") {
        const position = parseInt(prompt("OK! Enter an index to delete: "));
        if (!Number.isNaN(position)) {
            const deleted = todo.splice(position,1);
            console.log(`${deleted[0]} deleted`);
        }
        else {
            console.log("Invalid index");
        }
    }
    input = prompt("What would you like to do?");
}
console.log("OK! YOU QUIT THE APP");
