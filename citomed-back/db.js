const sqlite3 = require('sqlite3').verbose();

const db_name = 'db.sqlite';
const db = new sqlite3.Database(db_name);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        patronymic TEXT,
        tel_number TEXT,
        email TEXT,
        company TEXT,
        company_city TEXT,
        company_activity TEXT,
        position TEXT,
        web_site TEXT,
        interest TEXT,
        additional_information TEXT)
    `);
}); 

class Article {
    static all(callback) {
        db.all("SELECT * FROM users", callback);
    }

    static create(person, callback) {
        const sql = `insert into users (
                first_name,
                last_name,
                patronymic,
                tel_number,
                email,
                company,
                company_city,
                company_activity,
                position,
                web_site,
                interest,
                additional_information
                ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        

        db.run(
            sql, 
            person.first_name, 
            person.last_name,
            person.patronymic,
            person.tel_number,
            person.email,
            person.company,
            person.company_city,
            person.company_activity,
            person.position,
            person.web_site,
            person.interest,
            person.additional_information,
            callback
        );
    }

    static clear(callback) {
        db.run(`DELETE FROM users;`, callback);
    }

}

module.exports = db;
module.exports.Article = Article;
