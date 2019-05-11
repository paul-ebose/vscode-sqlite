import { Schema } from "./schema";
import { Disposable } from "vscode";
import { ResultSet } from "../common";
import { executeQuery } from "./queryExecutor";

class SQLite implements Disposable {

    constructor(_extensionPath: string) {
    }

    query(sqliteCommand: string, dbPath: string, query: string, options?: {sql?: string}): Promise<QueryResult> {
        if (!sqliteCommand) Promise.resolve({error: "Unable to execute query: provide a valid sqlite3 executable in the setting sqlite.sqlite3."});

        return executeQuery(sqliteCommand, dbPath, query, options);
    }
    
    schema(sqliteCommand: string, dbPath: string, options?: {sql: string}): Promise<Schema.Database> {
        if (!sqliteCommand) Promise.resolve({error: "Unable to execute query: provide a valid sqlite3 executable in the setting sqlite.sqlite3."});

        return Promise.resolve(Schema.build(dbPath, sqliteCommand, options));
    }
    
    dispose() {
        // Nothing to dispose
    }
}

export interface QueryResult {resultSet?: ResultSet; error?: Error; }

export default SQLite;