import { openDB, DBSchema } from 'idb'

interface FileData {
    path: string
    content: string
    createdAt: number
    updatedAt: number
}

interface FileSystemDB extends DBSchema {
    files: {
        key: string
        value: FileData
    }
}

export interface IFileSystem {
    readFile: (path: string) => Promise<string>
    writeFile: (path: string, content: string) => Promise<string>
    exists: (path: string) => Promise<boolean>
    deleteFile: (path: string) => Promise<void>
}

export class FileSystem implements IFileSystem {
    private dbName = 'FileSystemDB'
    private version = 1

    private async getDB() {
        return openDB<FileSystemDB>(this.dbName, this.version, {
            upgrade(db) {
                // Create the files store if it doesn't exist
                if (!db.objectStoreNames.contains('files')) {
                    db.createObjectStore('files', { keyPath: 'path' })
                }
            }
        })
    }

    readFile = async (path: string): Promise<string> => {
        const db = await this.getDB()
        const file = await db.get('files', path)

        if (!file) {
            throw new Error(`File not found: ${path}`)
        }

        return file.content
    }

    writeFile = async (path: string, content: string): Promise<string> => {
        const db = await this.getDB()
        const now = Date.now()

        const fileData: FileData = {
            path,
            content,
            createdAt: now,
            updatedAt: now
        }

        // Check if file exists to update createdAt
        const existingFile = await db.get('files', path)
        if (existingFile) {
            fileData.createdAt = existingFile.createdAt
        }

        await db.put('files', fileData)
        return path
    }

    exists = async (path: string): Promise<boolean> => {
        const db = await this.getDB()
        const count = await db.count('files', path)
        return count > 0
    }

    deleteFile = async (path: string): Promise<void> => {
        const db = await this.getDB()
        await db.delete('files', path)
    }

    // Additional utility methods that might be useful
    listFiles = async (): Promise<string[]> => {
        const db = await this.getDB()
        const keys = await db.getAllKeys('files')
        return keys
    }

    getFileInfo = async (path: string): Promise<Omit<FileData, 'content'> | null> => {
        const db = await this.getDB()
        const file = await db.get('files', path)
        if (!file) return null

        const { content, ...fileInfo } = file
        return fileInfo
    }
}
