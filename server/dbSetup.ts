const mysql2 = require('mysql2/promise');

async function connectDb() {
    try {
        const connect = await mysql2.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "123456",
            database: "REACTSQL",
        })


        return connect;
    } catch (error) {
        throw new Error(`Error: ${error}`)
    }
}


async function dbSetup() {
    const connection = await connectDb();
    try {

        await connection.query(`CREATE DATABASE IF NOT EXISTS REACTSQL`);

        // User table
        await connection.query(`
        CREATE TABLE IF NOT EXISTS User (
            USER_ID CHAR(36) PRIMARY KEY,
            USERNAME VARCHAR(50) NOT NULL,
            EMAIL VARCHAR(50) NOT NULL UNIQUE,
            PASSWORD VARCHAR(255) NOT NULL,
            CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
            UPDATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            IS_DELETED BOOLEAN DEFAULT FALSE
        )
    `);

        // Product table
        await connection.query(`
        CREATE TABLE IF NOT EXISTS Product (
            PRODUCT_ID CHAR(36) PRIMARY KEY,
            PRODUCT_NAME VARCHAR(50) NOT NULL,
            PRODUCT_DESCRIPTION TEXT,
            PRICE DOUBLE NOT NULL,
            PRODUCT_IMAGE VARCHAR(255)
        )
    `);

        // Cart table
        await connection.query(`
        CREATE TABLE IF NOT EXISTS Cart (
            CART_ID CHAR(36) PRIMARY KEY,
            TOTAL_AMOUNT DOUBLE NOT NULL,
            QUANTITY INT NOT NULL,
            USER_ID CHAR(36) NOT NULL,
            CONSTRAINT FK_CART_USER FOREIGN KEY (USER_ID) REFERENCES User(USER_ID) ON DELETE CASCADE
        )
    `);

        // Cart_Product table (junction table)
        await connection.query(`
        CREATE TABLE IF NOT EXISTS Cart_Product (
            CART_ID CHAR(36),
            PRODUCT_ID CHAR(36),
            QUANTITY INT NOT NULL,
            PRICE DOUBLE NOT NULL,
            PRIMARY KEY (CART_ID, PRODUCT_ID),
            CONSTRAINT FK_CART FOREIGN KEY (CART_ID) REFERENCES Cart(CART_ID) ON DELETE CASCADE,
            CONSTRAINT FK_PRODUCT FOREIGN KEY (PRODUCT_ID) REFERENCES Product(PRODUCT_ID) ON DELETE CASCADE
        )
    `);

        // Role table
        await connection.query(`
        CREATE TABLE IF NOT EXISTS Role (
            ROLE_ID CHAR(36) PRIMARY KEY,
            ROLE_NAME VARCHAR(20) NOT NULL,
            USER_ID CHAR(36) NOT NULL,
            CONSTRAINT FK_ROLE_USER FOREIGN KEY (USER_ID) REFERENCES User(USER_ID) ON DELETE CASCADE
        )
    `);
    } catch (error) {
        throw new Error("Error: " + error);
    } finally {
        await connection.end();
    }
}

dbSetup();

module.exports = connectDb;

