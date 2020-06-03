
const express = require('express')

const router = express.Router();

const db = require('../config/db.js')

router.get('/', (req,res) =>{
  //all info of request will be in req
  // info which you return will in res
      db.users.findAll(
        {
          attributes: [
            [db.sequelize.fn('CONCAT', 'Mr. ',db.sequelize.col('first_name')),'firstName'],
            [db.sequelize.fn('CONCAT', db.sequelize.col('first_name'), ' ', db.sequelize.col('lastName')),'modified_firstName'],
            'lastName'
          ],
          where:{
            [db.op.or]:[{firstName:{
              [db.op.like]: 'J%'
            }},{lastName:{
              [db.op.in]: [1,2,4]
            }}]
          },
          include: [{
          model: db.books,
          as: 'books'
          }]
        }
      ).then(data =>{
        console.log("this is data",data);
        res.json(data)
      })
})

// select concat(firstName, '#') from table


//  http://localhost:8080/newRequest?id=8&name=hi

//query -  get request
router.get('/newRequest', (req,res) =>{
  let id = req.query.id;
  let name = req.query.name;
  //

  console.log("id",id,"name",name);
  res.json({id:id,name:name})
})

// body - for psot
router.post('/postRequest', (req,res) =>{
  let id = req.body.id
  let name = req.body.name

  console.log("id",id,"name",name);
  res.json({id:id,name:name})
})

module.exports = router
