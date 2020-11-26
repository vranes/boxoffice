const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'boxoffice'
})

const reviewSchema = Joi.object().keys({
    movie: Joi.string().trim().min(2).max(45).required(),
    user: Joi.string().trim().min(5).max(45).required(),
    review: Joi.string().trim().min(2).max(300).required(),
})

const route = express.Router();
route.use(express.json());      // isparsiran json objekat umesto requesta sa parametrima

route.get('/', (req, res) => {
    pool.query("select * from reviews", (err, rows) => {
        if (err){
            res.status(500).send(err.sqlMessage);
        }
        else {
            res.send(rows);
        }
    })
})

route.get(':id', (req, res) => {
    
    let query = 'select * from reviews where id = ?'
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err){
            res.status(500).send(err.sqlMessage);
        } else {
            if (rows.length > 0){
                res.send(rows[0]);
            }
            else {
                res.status(404).send("There's no such review");
            }
        }
    })
})

route.post('/', (req, res) => {
 
    let {error} = reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        res.status(400).send(error.details[0].message);
    } 
    else{
        let query = "insert into reviews (movie, user, review) values (?, ?, ?)";
        let formatted = mysql.format(query, [req.body.movie, req.body.user, req.body.review]);
    
        pool.query(formatted, (err, status) => {
            if (err){
                res.status(500).send(err.sqlMessage);
            } else {
                // red je unet, vracam uneti red kao potvrdu unosa
                 query = "select * from reviews where id = ?";
                 formatted = mysql.format(query, [status.insertId]);
                 
                 pool.query(formatted, (err, rows) => {
                    if (err){
                        res.status(500).send(err.sqlMessage);
                    } else {
                        res.send(rows[0]);
                    }
                 })
             }
        })
    }

})

route.put('/:id', (req, res) => {

    let {error} = reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        res.status(400).send(error.details[0].message);
    } 
    else {
        let query = "update reviews set movie = ?, user = ?, review = ? where id = ?";
        let formatted = mysql.format(query, [req.body.movie, req.body.user, req.body.review, req.params.id]);
        
        pool.query(formatted, (err, status) => {
            if (err){
                res.status(500).send(err.sqlMessage);
            } else {
                // red uspesno azuriran, vracamo novo stanje
                query = "select * from reviews where id = ?";
                formatted = mysql.format(query, req.params.id);
           
                pool.query(formatted, (err, rows) => {
                    if (err){
                        res.status(500).send(err.sqlMessage);
                    } else {
                        res.send(rows[0]);
                    }
                })
             }
        })
    }
    
})

route.delete('/:id', (req, res) => {
  
    let query = 'select * from reviews where id = ?'
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err){
            res.status(500).send(err.sqlMessage);
        } else {
            if (rows.length > 0){
                let poruka = rows[0];
                let query = "delete from reviews where id = ?";
                let formatted = mysql.format(query, [req.params.id]);
                pool.query(formatted, (err, status) => {
                    if (err){
                        res.status(500).send(err.sqlMessage);
                    } else {
                        res.send(poruka);
                    }
                })
            }
            else {
                res.status(404).send("There's no such review");
            }
        }
    })
})

module.exports = route;