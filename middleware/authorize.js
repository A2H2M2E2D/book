const conn = require("../db/dbConnection");
const util = require("util");

const authorized = async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const { token } = req.headers;
    const { name } = req.headers;
    const user = await query("select * from users where token = ?", [token]);
    const book = await query("select * from books where name = ?", [name]);

    if (user[0] && book[0]) {
        res.locals.user = user[0];
        res.locals.book = book[0];
        next();
    } else {
        res.status(403).json({
            msg: "you are not authorized to access this route!"
        });

    }
};
module.exports = authorized;