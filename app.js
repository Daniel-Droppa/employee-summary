const Manager = require('./lib/Manager');
const Employee = require("./lib/Employee")
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's ID?"
    },
    {
        type: "input",
        message: "What is your manager's email address? ",
        name: "email"
    },
    {
        type: "input",
        message: "What is your manager's office number? ",
        name: "officeNumber"
    },

]
const repeat = [
    {
        type: "list",
        choices: ["Add an Engineer", "Add an intern", "Generate Chart"],
        message: "What would you like todo?",
        name: "newMember"
    }
]

const engQs = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's ID?"
    },
    {
        type: "input",
        message: "What is your engineer's email address? ",
        name: "email"
    },
    {

        type: "input",
        message: "What is your engeneer's github? ",
        name: "github"
    }

]

const intQs = [
    {
        type: "input",
        name: "name",
        message: "What is your intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's ID?"
    },
    {
        type: "input",
        message: "What is your intern's email address? ",
        name: "email"
    },
    {
        type: "input",
        message: "What school does your intern go to? ",
        name: "school"
    }

]

// const e = new Employee()




const buildTeam = []





// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

const init = () => {
    inquirer
        .prompt(questions)
        .then((e) => {
            const manag = new Manager(e.name, e.id, e.email, e.officeNumber)
            buildTeam.push(manag)
            Next()



        })
    function Next() {
        inquirer.prompt(repeat).then(function (resp) {

            switch (resp.newMember) {
                case "Add an Engineer":
                    eng()
                    break;
                case "Add an intern":
                    int()
                    break;
                default:
                    generate()
                    break;
            }
        })
    }
    const eng = () => {
        inquirer
        .prompt(engQs)
        .then((e) => {
            const engineer = new Engineer(e.name, e.id, e.email, e.github)
            buildTeam.push(engineer)
            Next()
        })
    }
    const int = () => {
        inquirer
        .prompt(intQs)
        .then((e) => {
            const intern = new Engineer(e.name, e.id, e.email, e.github)
            buildTeam.push(intern)
            Next()
        })
    }
    function generate(){
        fs.writeFile(outputPath, render(buildTeam), function (err) {
            if (err) {
                return console.log(err);
            }
            
        });
    }

};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not. The fs npm package may have methods to check if a directory exists, and they
// may also have methods to create a directory that doesn't...

init();
