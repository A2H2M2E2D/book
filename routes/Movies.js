const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system

// CREATE MOVIE [ADMIN]
// router.post(
//   "",
//   admin,
//   body("name")
//     .isString()
//     .withMessage("please enter a valid movie name")
//     .isLength({ min: 10 })
//     .withMessage("movie name should be at lease 10 characters"),

//   body("description")
//     .isString()
//     .withMessage("please enter a valid description ")
//     .isLength({ min: 20 })
//     .withMessage("description name should be at lease 20 characters"),
//   async (req, res) => {
//     try {
//       // 1- VALIDATION REQUEST [manual, express validation]
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }


//       // 3- PREPARE MOVIE OBJECT
//       const book = {
//         name: req.body.name,
//         description: req.body.description,
//       };

//       // 4 - INSERT MOVIE INTO DB
//       const query = util.promisify(conn.query).bind(conn);
//       await query("insert into book_models set ? ", book);
//       res.status(200).json({
//         msg: "book created successfully !",
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );




// UPDATE MOVIE [ADMIN]
router.put(
  "/:id", // params
  admin,
   body("name")
    .isString()
    .withMessage("please enter a valid movie name")
    .isLength({ min: 10 })
    .withMessage("movie name should be at lease 10 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at lease 20 characters"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }


      // 2- CHECK IF MOVIE EXISTS OR NOT
      const movie = await query("select * from book_models where id = ?", [req.params.id]);
      if (!movie[0]) {
        res.status(404).json({ ms: "movie not found !" });
      }

      // 3- PREPARE MOVIE OBJECT
      const movieObj = {
        name: req.body.name,
        description: req.body.description,
      };

      // 4- UPDATE MOVIE
      await query("update book_models set ? where id = ?", [movieObj, movie[0].id]);

      res.status(200).json({
        msg: "book updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);



// DELETE MOVIE [ADMIN]
// router.delete(
//   "/:id", // params
//   admin,
//   async (req, res) => {
//     try {
//       // 1- CHECK IF MOVIE EXISTS OR NOT
//       const query = util.promisify(conn.query).bind(conn);
//       const movie = await query("select * from book_models where id = ?", [req.params.id]);
//       if (!movie[0]) {
//         res.status(404).json({ ms: "book not found !" });
//       }
//       // 2- REMOVE MOVIE IMAGE
//       fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image
//       await query("delete from book_models where id = ?", [movie[0].id]);
//       res.status(200).json({
//         msg: "book delete successfully",
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );





// Send a request to the admin with the required book 
router.post("/order",authorized,
  body("name").isString().withMessage("please enter a valid your name"),
  body("book").isString().withMessage("please enter a valid book name"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      
      // 3- PREPARE MOVIE OBJECT
      const book = {
        user_name: req.body.name,
        book_name: req.body.book,
      };

      // 4 - INSERT MOVIE INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into order_user set ? ", book);
      res.status(200).json({
        msg: "Order Recquested , Watting...",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/show in front", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const show = await query("select * from order_user");
  res.status(200).json(show);
})





//Accept or decline requests by the reader
// accepts
router.patch("/accept/:id", admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    await query('update requests set status = 1 where id = ?', [req.params.id]);
    res.json({ msg: "accepted" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// ignore
router.patch("/ignore/:id",admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    await query('update requests set status = 0 where id = ?', [req.params.id]);
    res.json({ msg: "decline" });
  } catch (err) {
    res.status(500).json(err);
  }
});


//create request
// send request
  router.post("/createReq", authorized, async (req, res) => {
    try {

  const newReq = {
    user_name : req.body.user_name,
    book_name : req.body.book_name,
  }

      const query = util.promisify(conn.query).bind(conn);
      await query(`insert into requests set ?`, newReq);
  
      res.status(200).json({
        msg: "request added",
      });
        
    } catch (err) {
      console.log(err);
      res.status(500).json({ errors: [{ msg: "someting wrong" }] });
    }
  });

//delete req
router.delete("/deleteReq/:id" , authorized ,async (req , res)=>{
try{

  const query = util.promisify(conn.query).bind(conn);
  await query(`delete from requests where id = ?`, [req.params.id]);

  res.status(200).json({
    msg: "request deleted",
  });

}catch(err){
res.status(500).json({ errors: [{ msg: "someting wrong" }] });
}
})






// router.post(
//   "/req",
//   body("user_name").isString().withMessage("please enter a valid your name"),

//   body("book_name")
//     .isString()
//     .withMessage("please enter a valid book name "),
//   async (req, res) => {
//     try {
//       // 1- VALIDATION REQUEST [manual, express validation]
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // 3- PREPARE BOOK OBJECT ADMIN.
//       const book = {
//         user_name: req.body.user_name,
//         book_name: req.body.book_name,
//       };

//       // 4 - INSERT MOVIE INTO DB
//       const query = util.promisify(conn.query).bind(conn);
//       await query("insert into order_user set ? ", book);
//       // res.status(200).json({
//       //   msg: "REQUESTED:)",
//       // });
//       const statu = await query("select * from order_user where req_statues	 = ?", [req.params.req_statues]);
   
//       if(statu == 1){
//        res.status(200).json({ msg: "ACCEPTED:)" });
//      }else if (fs.statu == 0){
//        res.status(200).json({ msg: "DECLINED:(" });
//      }else{
//       res.status(200).json({ msg: "WATTING..." });
//     }
    

//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );



// CHECK REQ-STATUES.
//  router.get('/statues/:req#' , async(req , res)=>{
//   const query = util.promisify(conn.query).bind(conn);

  

//  });
/*
// LIST & SEARCH [ADMIN, USER]
router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
  }
  const movies = await query(`select * from movies ${search}`);
  movies.map((movie) => {
    movie.image_url = "http://" + req.hostname + ":4000/" + movie.image_url;
  });
  res.status(200).json(movies);
});

// SHOW MOVIE [ADMIN, USER]
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const movie = await query("select * from movies where id = ?", [
    req.params.id,
  ]);
  if (!movie[0]) {
    res.status(404).json({ ms: "movie not found !" });
  }
  movie[0].image_url = "http://" + req.hostname + ":4000/" + movie[0].image_url;
  movie[0].reviews = await query(
    "select * from user_movie_review where movie_id = ?",
    movie[0].id
  );
  res.status(200).json(movie[0]);
});

// MAKE REVIEW [ADMIN, USER]
router.post(
  "/review",
  authorized,
  body("movie_id").isNumeric().withMessage("please enter a valid movie ID"),
  body("review").isString().withMessage("please enter a valid Review"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF MOVIE EXISTS OR NOT
      const movie = await query("select * from movies where id = ?", [
        req.body.movie_id,
      ]);
      if (!movie[0]) {
        res.status(404).json({ ms: "movie not found !" });
      }

      // 3 - PREPARE MOVIE REVIEW OBJECT
      const reviewObj = {
        user_id: res.locals.user.id,
        movie_id: movie[0].id,
        review: req.body.review,
      };

      // 4- INSERT MOVIE OBJECT INTO DATABASE
      await query("insert into user_movie_review set ?", reviewObj);

      res.status(200).json({
        msg: "review added successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
*/
module.exports = router;





















