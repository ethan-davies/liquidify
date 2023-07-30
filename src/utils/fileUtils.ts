import fs from 'fs';
import path from 'path';

const firstFolderPath: string = ''

function checkAndCreateLiquidifyFolder() {
    const folderPath = path.join(firstFolderPath, 'liquidify');

    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
        try {
            // Create the 'liquidify' folder
            fs.mkdirSync(folderPath);
        } catch (error) {
            console.error('Error creating the "liquidify" folder:', error);
        }
    }
}

export function writeDataToInstancesJson<T>(data: T[]) {
    const folderPath = path.join(firstFolderPath, 'liquidify');
    const filePath = path.join(folderPath, 'instances.json');

    checkAndCreateLiquidifyFolder();

    try {
        let existingData: T[] = [];

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            existingData = JSON.parse(fileData);
        }

        const newData = [...existingData, ...data];
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8');

        console.log('Data written to instances.json successfully.');
    } catch (error) {
        console.error('Error writing data to instances.json:', error);
    }
}

export function readDataFromInstancesJson<T>(): T[] {
    const folderPath = path.join(firstFolderPath, 'liquidify');
    const filePath = path.join(folderPath, 'instances.json');

    checkAndCreateLiquidifyFolder();

    try {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(fileData) as T[];
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error reading data from instances.json:', error);
        return [];
    }
}