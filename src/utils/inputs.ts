import inquirer from 'inquirer';
import { readDataFromInstancesJson, writeDataToInstancesJson } from './fileUtils.js';


export let tableData = []
let newTable;

export interface baseTableData {
    id: string;
    name: string;
    port: number;
    ip: string;
}

export async function handleWhatToDo(answer: string) {
    if (answer == 'Add server') {
        let newTableData: baseTableData = {
            id: 'SERVER',
            name: await askName('server'), // Await the result of askName
            port: await askPort(),
            ip: await askIP()
        };

        tableData.push(newTableData)
        writeDataToInstancesJson(tableData) // ! ISSUE we are adding already existing data by adding the same data twice. Instead we need to import the newTableData
        console.log(tableData)

    } else if (answer == 'Add container') {
        console.log('hi')
    }
}

export async function askName(type: string): Promise<string> {
    const answers = await inquirer.prompt({
        name: 'server_name',
        type: 'input',
        message: `What would you like to call the ${type}.`,
    });

    let serverName = answers.server_name
    console.log(serverName) // for test
    return serverName as string
}

export async function askIP(): Promise<string> {
    const answers = await inquirer.prompt({
        name: 'ip_string',
        type: 'input',
        message: `Please could you give the IP?`,
        default() {
            return 'localhost'
        }
    });

    let ip = answers.ip_string
    console.log(ip) // for test
    return ip as string
}

export async function askPort(): Promise<number> {
    const portQuestion = {
        name: 'port',
        type: 'input',
        message: 'Enter the port number:',
        validate: (input) => {
            const port = parseInt(input);
            if (isNaN(port) || port < 1 || port > 65535) {
                return 'Please enter a valid port number between 1 and 65535.';
            }
            return true;
        },
    };

    const answers = await inquirer.prompt(portQuestion);
    return parseInt(answers.port);
}

export function initialize() {
    const dataInJson = readDataFromInstancesJson<baseTableData>();
    tableData = dataInJson
    console.log('DATA IN JSON: ', dataInJson)
}