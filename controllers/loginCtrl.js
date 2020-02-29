const sqlite3 = require('sqlite3').verbose();

function login() {
    // open database in memory
    let db = new sqlite3.Database('./db/GauchoBotics.db', (err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });

    // testing
    var name = "sangela"

    // let sql = `SELECT * FROM userinfo WHERE username LIKE '%${name}%'`;
    let sql = `SELECT * FROM userinfo`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
    });
    
    // close the database connection
    db.close((err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function filter(req,res,next) {
	try {
		// open database in memory
		let db = new sqlite3.Database(dbPath,sqlite3.OPEN_READWRITE, (err) => {
			if (err) {
			return console.error(err.message);
			}
			console.log('Connected to the in-memory SQlite database.');
		});

		var keyword = req.query.keyword;

		db.serialize(() => {
			sql = `SELECT * FROM user_info WHERE user_keyword_hist LIKE '%${keyword}%'`;
			// sql1 = `INSERT INTO user_info(user_name, user_keyword, user_gmail, user_keyword_hist, user_friend, user_thumbnail) VALUES('admin', '%${keyword}%', 'admin@ucsb.edu', 'Reading,Biking,%${keyword}%', NULL, 'https://github.com/sansangela/Womxn20/blob/master/front-end/thumbnail/11.jpg?raw=true')`;
			// db.all(sql1, (err, row) => {
			// 	if (err) {
			// 		console.error(err.message);
			// 	}
				db.run(`INSERT INTO user_info(user_name, user_keyword, user_gmail, user_keyword_hist, user_friend, user_thumbnail) VALUES('admin', '${keyword}', 'admin@ucsb.edu', 'Reading,Biking,${keyword}', NULL, 'https://github.com/sansangela/Womxn20/blob/master/front-end/thumbnail/11.jpg?raw=true')`, function(err) {
					if (err) {
					  return console.log(err.message);
					}
					// get the last insert id
					console.log(`A row has been inserted with rowid ${this.lastID}`);
				  });
			// })
			db.all(sql, (err, row) => {
			if (err) {
				console.error(err.message);
			}
			res.status(200).render('index', { title: 'Hey', data: row });
			});
		});

		// close the database connection
		db.close((err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log('Close the database connection.');
		});

		} catch (err) {
			res.status(500).send('SERVER ERROR:' + err);
				// close the database connection
			db.close((err) => {
				if (err) {
					return console.error(err.message);
				}
				console.log('Close the database connection.');
			});
		}
}

module.exports = {login}