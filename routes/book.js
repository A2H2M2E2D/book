const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require('express-validator');
const upload = require("../middleware/uploadImages");
const util = require("util");
const fs = require("fs");
const bcrupt = require("bcrypt");
const crypto = require("crypto");

//------------------------------------Manage Books---------------------------------
//Admin 
//create book
router.post("/create", admin,
    upload.single("image"),
    body("name").isString().withMessage("please enter book name"),
    body("description").isString().withMessage("please enter book description"),
    body("author").isString().withMessage("please enter book author"),
    body("field").isString().withMessage("please enter book field"),
    async (req, res) => {
        try {
            //1- valdation req
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }
            //2- valdate image
            if (!req.file) {
                return res.status(400).json({
                    error: [
                        {
                            msg: "image or pdf is requiered",
                        },
                    ],
                });
            }
            // 3- object of book 
            const date = new Date();
            const book = {
                name: req.body.name,
                description: req.body.description,
                image_url: req.file.filename,
                author: req.body.author,
                publication_date: date
            }
            //4-save book in db
            const query = util.promisify(conn.query).bind(conn);
            await query("insert into books set ?", book);

            res.status(200).json({
                msg: "book created successfully"
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

//updata book
router.put("/update/:id", admin,
    upload.single("image"),
    body("name").isString().withMessage("please enter book name"),
    body("description").isString().withMessage("please enter book description"),
    body("author").isString().withMessage("please enter book author"),
    body("field").isString().withMessage("please enter book field"),
    async (req, res) => {
        try {
            //1- valdation req
            const query = util.promisify(conn.query).bind(conn);
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }

            //2- check book
            const Book = await query("select * from books where id = ?", [req.params.id])
            if (!Book[0]) {
                res.status(403).json({ msg: "book not found!" });
            }
            // 3- object of book

            const BookObj = {
                name: req.body.name,
                description: req.body.description,
                author: req.body.author,
                field: req.body.field,
            }
            if (req.file) {
                BookObj.image_url = req.file.filename;
                //delete old image
                fs.unlinkSync("./upload/" + Book[0].image_url);
            }
            //4- update book

            await query("update books set ? where id = ?", [BookObj, Book[0].id]);

            res.status(200).json({
                msg: "book updated successfully"
            });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });


//delete book
router.delete("/delete/:id", admin,
    async (req, res) => {
        try {
            //1- check book
            const query = util.promisify(conn.query).bind(conn);
            const Book = await query("select * from books where id = ?", [req.params.id]);
            if (!Book[0]) {
                res.status(403).json({ msg: "book not found!" });
            }
            // 2- remove book

            fs.unlinkSync("./upload/" + Book[0].image_url);
            await query("delete from books where id = ?", [Book[0].id]);

            res.status(200).json({
                msg: "book deleted successfully"
            });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);

        }
    });


//user[view(search) - filter]
router.get("/view", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    if (req.query.search) {
        search = `where name like '%${req.query.search}%'`;
    }
    const books = await query(`select * from books ${search}`);

    books.map((book) => {
        book.image_url = "http://" + req.hostname + ":3000/" + book.image_url;
    })
    res.status(200).json(books);
});


//show admin
router.get("/show/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const Book = await query("select * from books where id = ?", [req.params.id]);
    if (!Book[0]) {
        res.status(403).json({ msg: "book not found!" });
    }

    Book[0].image_url = "http://" + req.hostname + ":3000/" + Book[0].image_url;
    res.status(200).json(Book[0]);
});

//------------------------------------Manage Chapters--------------------------------
//create chapter
router.post("/create_chapter", admin,authorized,
    body("title").isString().withMessage("please enter chapter title"),
    body("description").isString().withMessage("please enter chapter description"),
    body("book_id").isString().withMessage("please enter book id"),
    async (req, res) => {
        try {
            //1- valdation req
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }


            // 3- object of book 
            const chapter = {
                title: req.body.title,
                description: req.body.description,
                book_name: res.locals.book.name,
                book_id: req.body.book_id
            }
            //4-save book in db
            const query = util.promisify(conn.query).bind(conn);
            await query("insert into bookchapters set ?", chapter);

            res.status(200).json({
                msg: "chapter created successfully"
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg:"book not found",
            });
        }
    });



//update chapter
router.put("/updateChapter/:id", admin,
    body("title").isString().withMessage("please enter chapter title"),
    body("description").isString().withMessage("please enter chapter description"),
    async (req, res) => {
        try {
            //1- valdation req
            const query = util.promisify(conn.query).bind(conn);
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }

            //2- check chapter
            const chapter = await query("select * from bookchapters where id = ?", [req.params.id])
            if (!chapter[0]) {
              return  res.status(403).json({ msg: "chapter not found!" });
            }

            //3- object chapter
            const chapterobj = {
                title: req.body.title,
                description: req.body.description,
            }
            //4- save update
            await query("update bookchapters set ? where id = ?", [chapterobj, chapter[0].id]);
            res.status(200).json({
                msg: "update successfully"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    })

//delete chapter
router.delete("/deleteChapter/:id", admin,
    async (req, res) => {

        try {
            //1- check chapter
            const query = util.promisify(conn.query).bind(conn);
            const chapter = await query("select * from bookchapters where id = ?", [req.params.id]);
            if (!chapter[0]) {
               return res.status(403).json({ msg: "chapter not found!" });
            }
            // 2- remove chapter

            await query("delete from bookchapters where id = ?", [chapter[0].id]);
            res.status(200).json({
                msg: "chapter deleted successfully"
            });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);

        }
    });

// //show chapter admin
router.get("/showChapter/:title", admin, async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const chapter = await query("select * from bookchapters where title = ?", [req.params.title]);
    if (!chapter[0]) {
       return res.status(403).json({ msg: "chapter not found!" });
    }

    res.status(200).json(chapter);
});

//show book chapters
router.get("/showBookChapter/:book_id", authorized, async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);

    const chapter = await query("select * from bookchapters where book_id = ?", [req.params.book_id]);
    if (!chapter[0]) {
      return  res.status(403).json({ msg: "chapter not found!" });
    }

    res.status(200).json(chapter);
});

//history
//show historys table to admin
router.get("/showHistory", admin, async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);
        let search = "";
        if (req.query.search) {
            search = `where name like '%${req.query.search}%'`;
        }
        const result = await query(`select * from query ${search}`);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
//show user history

router.get("/showMyHistory", authorized, async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);  

        const result = await query(`select * from query where user_name = ?`, res.locals.user.id);
        if (!result[0]) {
            res.status(200).json({
                msg: "you did not buy books yet"
            });
        }
        else {
            res.status(200).json(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


// Send a request to the admin with the required book 
router.post("/order", authorized, body("book_name").isString().withMessage("please enter right book name"),
    async (req, res) => {
        try {
            // 1- VALIDATION REQUEST [manual, express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            // 3- PREPARE MOVIE OBJECT
            const book = {
                user_name: res.locals.user.id,
                book_name: req.body.book_name
            };

            // 4 - INSERT MOVIE INTO DB
            const query = util.promisify(conn.query).bind(conn);
            await query("insert into query set ? ", book);
            res.status(200).json({
                msg: "Order Recquested , Watting...",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);
//Accept or decline requests by the reader
// accepts
router.patch("/accept/:id", admin, async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);
        await query('update query set status = 1 where id = ?', [req.params.id]);
        const result = await query("select * from query where id = ?", [req.params.id]);
        if (!result[0]) {
            res.status(404).json({ msg: "req is not found!" });
        }
        else {
            res.status(200).json({ msg: "accepted" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// decline
router.patch("/decline/:id", admin, async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);
        await query('update query set status = 0 where id = ?', [req.params.id]);
        const result = await query("select * from query where id = ?", [req.params.id]);
        if (!result[0]) {
            res.status(404).json({ msg: "req is not found!" });
        }
        else {
            res.json({ msg: "decline" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//create request
router.post("/createReq", admin
    , body("user_name").isString().withMessage("please enter right name"),
    body("book_name").isString().withMessage("please enter book name"),
    async (req, res) => {
        try {

            const newReq = {
                user_name: req.body.user_name,
                book_name: req.body.book_name,
            }

            const query = util.promisify(conn.query).bind(conn);
            await query(`insert into query set ?`, newReq);

            res.status(200).json({
                msg: "request added",
            });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

//delete req
router.delete("/deleteReq/:id", admin, async (req, res) => {
    try {

        const query = util.promisify(conn.query).bind(conn);
        await query(`delete from query where id = ?`, [req.params.id]);

        res.status(200).json({
            msg: "request deleted",
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: [{ msg: "someting wrong chack id" }] });
    }
})

//CREATE USER [ ADMIN ] 
router.post("/create_user", admin,
    body("email").isEmail()
        .withMessage("please inter a valid email!"),
    body("name").isString()
        .withMessage("please inter a valid name!").isLength({ min: 5, max: 20 })
        .withMessage("name should be between 10:20"),
    body("password").isLength({ min: 8, max: 12 })
        .withMessage("please inter a valid password &&  betwen [8,12] "),
    body("phone").isInt()
        .withMessage("please inter a valid phone number!").isLength({ min: 11, max: 20 })
        .withMessage("inter a valid phone number &&  betwen [11,12]"),
    async (req, res) => {
        try {
            //1- VALIDATION REQUEST[ MANIUAL , EXPRESS VALIDATION ]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //-2 CHECK IF EMAIL EXISTS 

            const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await / async]
            const checkEmailExists = await query(
                "select * from users where email = ?",
                [req.body.email]);
            if (checkEmailExists.length > 0) {
                return res.status(400).json({
                    errors: [{
                        "msg": "email already exists !",
                    },],
                });
            }


            // 3- PREPARE OBJECT USER TO -> SAVE 
            const userDate = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrupt.hash(req.body.password, 10),
                token: crypto.randomBytes(16).toString("hex"), // json web token , crypto => random incription standered
                phone: req.body.phone,
            };

            // 4- INSERT USER OBJECT INTO DB 
            await query("insert into users set ?", userDate);
            delete userDate.password;
            res.status(200).json({
                msg: "user craeted successfly",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    });

//UPDATE USER [ADMIN]
router.put("/update_user/:id",//PARAMS
    admin,
    body("email").isEmail()
        .withMessage("please inter a valid email!"),
    body("name").isString()
        .withMessage("please inter a valid name!").isLength({ min: 10, max: 20 })
        .withMessage("name should be between 10:20"),
    body("password").isLength({ min: 8, max: 12 })
        .withMessage("please inter a valid password "),
    body("phone").isInt()
        .withMessage("please inter a valid phone number!").isLength({ min: 11, max: 20 })
        .withMessage("inter a valid phone number"),
    async (req, res) => {
        try {
            //1- VALIDATION REQUEST[ MANIUAL , EXPRESS VALIDATION ]
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // 2- CHECK IF user EXIST OR NOT
            const user = await query("select * from users where id = ?"
                , [req.params.id]);
            if (!user[0]) {
                res.status(404).json({
                    msg: "user not found",
                })
            }
            //3- prepare user opject 
            const userOpj = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrupt.hash(req.body.password, 10),
                phone: req.body.phone,
            }
            //-4 UPDATE USER 
            await query("update users set ? where id = ?", [userOpj, user[0].id]);
            res.status(200).json({
                msg: "user updated successfully ",
            });

        } catch (err) {
            res.status(500).json(err);
        }
    });

//DELETE USER [ ADMIN ]
router.delete("/delete_user/:id",//PARAMS
    admin,
    async (req, res) => {
        try {
            // 1- CHECK IF USER EXIST OR NOT
            const query = util.promisify(conn.query).bind(conn);
            const user = await query("select * from users where id = ?"
                , [req.params.id]);
            if (!user[0]) {
                res.status(404).json({
                    msg: "user not found",
                });
                return;
            }
            //2- delete from database
            await query("delete from users  where id = ?", [user[0].id]);
            res.status(200).json({
                msg: "user deleted successfully ",
            });

        } catch (err) {
            res.status(500).json(err);
        }
    });

//SHOW user [ADMIN]
router.get("/show_users/:id", admin, async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const user = await query("select * from users where id = ?"
        , [req.params.id]);
    if (!user[0]) {
        res.status(404).json({
            msg: "user not found",
        });
        return;
    }
    res.status(200).json(user[0]);
    return;

});


//type(user or admin)

router.patch("/type/:id", admin , async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);
        await query('update users set type = 1 where id = ?', [req.params.id]);
        res.status(200).json({
            msg:"welcome ya 3am",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//STATUS (ACTIVE OR IN-ACTIVE)

router.patch("/status-active/:id", admin , async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);
        await query('update users set status = 1 where id = ?', [req.params.id]);
        res.status(200).json({
            msg:"Active User",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.patch("/status-in_active/:id", admin , async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);
        await query('update users set status = 0 where id = ?', [req.params.id]);
        res.status(200).json({
            msg:"In_active User",
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 
module.exports = router;
