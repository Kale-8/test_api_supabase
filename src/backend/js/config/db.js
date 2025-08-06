import {Pool} from 'pg';
import dotenv from "dotenv";
import fs from "fs";
import csv from "csv-parser";

dotenv.config();

export const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 6543, // Default PostgresSQL port
    max: 20, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
    ssl: {rejectUnauthorized: false} // Supabase requiere SSL
});

// fs.createReadStream('users.csv')
//     .pipe(csv())
//     .on('data', (row) => {
//         console.log(row);
//         const query = 'INSERT INTO public.users (name, email, password, role) VALUES ($1, $2, $3, $4)';
//         const values = [row.name, row.email, row.password, row.role];
//         try {
//             db.query(query, values);
//         } catch (err) {
//             console.error('Error inserting row:', err);
//         }
//     })
//     .on('end', () => {
//         console.log('CSV file successfully processed');
//         db.end();
//     });