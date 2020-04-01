const questions = [
                        "What is your name?", 
                        "Why am I here?", 
                        "How do you spell egg?",
                        "Do you know the phone number of 911?"
                    ]

const  ask = (i=0) => {
    process.stdout.write(`\n\n\n ${questions[i]}`);
    process.stdout.write(` > `);
}

const answers = [];

ask();

process.stdin.on('data', data => {
    answers.push(data.toString().trim());

    if(answers.length < questions.length){        
        ask(answers.length);
    } else {
        process.exit();
    }
});

process.on('exit', () => {
    const [name, why, how, nineoneone] = answers;
    console.log(`
    Thank you for your answers.

    Name: ${name}; Why: ${why}; How: ${how}; NineOneOne: ${nineoneone}
    
    `);
})