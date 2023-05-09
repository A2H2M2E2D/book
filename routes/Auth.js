const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require('express-validator');
const util = require("util");
const bcrupt = require("bcrypt");
const cryprot = require("crypto");

router.post("/login", body("email").isEmail().withMessage("please enter a valid email"),
    body("password").isLength({ min: 4, max: 16 }).withMessage("password should be between (4,16)"),
    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }


            const query = util.promisify(conn.query).bind(conn);    //query => promise use (await ,async)
            const user = await query(
                "select * from users where email = ?"
                , [req.body.email]
            );

            if (user.length == 0) {
                res.status(400).json({
                    error: [
                        {
                            msg: "email or password not found !",
                        },
                    ],
                });
            }
            else {
                const checkPassword = await bcrupt.compare(req.body.password, user[0].password);
                if (checkPassword) {
                    delete user[0].password;
                    res.status(200).json(user[0]);
                }
                else {
                    res.status(400).json({
                        error: [
                            {
                                msg: "email or password not found !",
                            },
                        ],
                    });
                }

            }

        } catch (err) {
            console.log("adsa");
            res.status(500).json({ err: err });
        }
    })


router.post("/register", body("email").isEmail().withMessage("please enter a valid email"),
    body("name").isString().withMessage("please enter a valid name")
        .isLength({ min: 7, max: 20 }).withMessage("name should be between (7,20)"),
    body("password").isLength({ min: 4, max: 16 }).withMessage("password should be between (4,16)"),
    body("phone").isLength({ min: 10, max: 11 }).withMessage("please enter valid number"),
    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }


            const query = util.promisify(conn.query).bind(conn);    //query => promise use (await ,async)
            const checkEmailExists = await query(
                "select * from users where email = ?"
                , [req.body.email]
            );

            if (checkEmailExists.length > 0) {
                res.status(400).json({
                    error: [
                        {
                            msg: "email is already exists !",
                        },
                    ],
                });
            }

            else {
                //save user data
                const userdata = {
                    name: req.body.name,
                    email: req.body.email,
                    password: await bcrupt.hash(req.body.password, 10),
                    phone: req.body.phone,
                    token: cryprot.randomBytes(16).toString("hex"),
                };
                //insert user data
                await query("insert into users set ?", userdata);
                delete userdata.password;
                res.status(200).json(userdata);
            }

        } catch (err) {
            console.log("adsa");
            res.status(500).json({ err: err });
        }
    })
module.exports = router;





