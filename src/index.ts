#!/usr/bin/env node
import inquirer from 'inquirer'
import { handleWhatToDo, initialize } from './utils/inputs.js'

async function whatToDo() {
    const answers = await inquirer.prompt({
        name: 'whatToDo',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View connections',
            'Add container',
            'Add server'
        ]
    })
    console.log(answers.whatToDo)
    handleWhatToDo(answers.whatToDo)
}

initialize()
whatToDo()