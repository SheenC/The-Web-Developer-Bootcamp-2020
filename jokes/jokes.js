const jokes = document.querySelector('#jokes');

const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    const newLI = document.createElement('li');
    newLI.append(jokeText);
    jokes.append(newLI);
}

const getDadJoke = async () => {
    try {
        const config = { headers: {Accept: "application/json"} };
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        //console.log(res.data.joke);
        return res.data.joke;
    } catch (e) {
        return "No jokes available! Sorry!";
    }
}

const btn = document.querySelector('#btn');
btn.addEventListener('click', addNewJoke);