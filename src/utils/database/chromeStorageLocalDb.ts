/**
 * Ideally there should be an abstracted DB connection layer, and this would provide an implementation
 * But as this is a small scale app with minimal likelihood of changing DB usage, 
 * decided to implement chrome storage local usage directly
 */

import { BaseModel } from "../../types/database/BaseModel.js";
import { TableName } from "../../types/database/TableName.js";

export async function dropTable(tableName: TableName): Promise<void> {
    try {
        if (!(await isTableExists(tableName))) {
            console.log(`dropTable(): Table [${tableName}] doesn't exist.`)
            return
        }
        await chrome.storage.local.remove(tableName)
    } catch(err) {
        console.error(`dropTable(): Error while dropping [${tableName}]... Error: ${err}`)
    }
}

export async function remove(tableName: TableName, id: string): Promise<BaseModel | void> {
    try {
        const rows = await getAll(tableName)
        const rowIndex = rows.findIndex(r => r.id === id)
        if (rowIndex === -1) {
            console.log(`remove(): Failed to remove row id [${id}] in table [${tableName}]. Could not find row in table.`)
            return
        }
        rows.splice(rowIndex, 1)
        await chrome.storage.local.set({ [tableName]: rows})
    } catch(err) {
        console.error(`remove(): Error while removing a row with id [${id}] from [${tableName}]... Error: ${err}`)
    }
}

export async function get(tableName: TableName, id: string): Promise<BaseModel | void> {
    try {
        const rows = await getAll(tableName)
        const row = rows.find(r => r.id === id)
        if (!row) {
            console.log(`get(): Failed to get row id [${id}] in table [${tableName}]. Row does not exist.`)
            return
        }
        return row
    } catch(err) {
        console.error(`get(): Error while creating getting row id [${id}] in table [${tableName}]... Error: ${err}`)
        throw err
    }
}

export async function update(tableName: TableName, data: BaseModel): Promise<BaseModel | void> { 
    try {
        const rows = await getAll(tableName)
        const rowIndex = rows.findIndex(r => r.id === data.id)
        if (rowIndex === -1) {
            throw new Error(`Row does not exist in table.`)
        }
        rows[rowIndex] = { ...rows[rowIndex], ...data }
        await chrome.storage.local.set({ [tableName]: rows})
    } catch(err) {
        console.error(`update(): Error while updating data [${JSON.stringify(data)}] in table [${tableName}]... Error: ${err}`)
    }
}

export async function getAll(tableName: TableName): Promise<BaseModel[]> {
    try {
        const result = await chrome.storage.local.get(tableName)
        if (Object.keys(result).length <= 0) {
            throw new Error(`Table [${tableName}] does not exist.`)
        }
        return result[tableName] as BaseModel[]
    } catch(err) {
        console.error(`getAll(): Error while creating getting value from table [${tableName}]... Error: ${err}`)
        throw err
    }
}

export async function add(tableName: TableName, data: BaseModel): Promise<void> {
    try {
        const rows = await getAll(tableName)
        if (rows.find(r => r.id === data.id)) {
            throw new Error(`Table [${tableName}] already contains row with id [${data.id}]!`)
        }
        rows.push(data)
        await chrome.storage.local.set({ [tableName]: rows})
    } catch(err) {
        console.error(`addRow(): Error while creating adding data to table [${tableName}] with data [${JSON.stringify(data)}]... Error: ${err}`)
        throw err
    }
}

export async function createTable(tableName: TableName): Promise<undefined> {
    try {
        if (!(await isTableExists(tableName))) {
            console.log(`createTable(): Table [${tableName}] does not exist yet, so creating...`)
            await chrome.storage.local.set({ [tableName]: [] })
        }
    } catch(err) {
        console.error(`createTable(): Error while creating new table [${tableName}]... Error: ${err}`)
        throw err
    }
}

export async function isTableExists(tableName: TableName): Promise<boolean> {
    try {
        const result = await chrome.storage.local.get(tableName)
        return Object.keys(result).length > 0
    } catch(err) {
        console.error(`isTableExists(): Error while checking for table existence [${tableName}]... Error: ${err}`)
        throw err
    }
}
