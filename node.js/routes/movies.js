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

const movieSchema = Joi.object().keys({
    title: Joi.string().trim().min(2).max(45).required(),
    year: Joi.number().integer().min(1900).max(2020).required(),
    boxoffice: Joi.number().precision(1).max(999.9).required()
})

const route = express.Router();
route.use(express.json());      // isparsiran json objekat umesto requesta sa parametrima


route.get('/', (req, res) => {

    pool.query("select * from movies", (err, rows) => {
        if (err){
            res.status(500).send(err.sqlMessage);
        }
        else {
            res.send(rows);
        }
    })
})

route.get('/:id', (req, res) => {
    let query = 'select * from movies where id = ?'
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err){
            res.status(500).send(err.sqlMessage);
        } else {
            if (rows.length > 0){
                res.send(rows[0]);
            }
            else {
                res.status(404).send("There's no such movie");
            }
        }
    })
})

route.post('/', (req, res) => {

    let {error} = movieSchema.validate(req.body);

    if(error){
        console.log(error);
        res.status(400).send(error.details[0].message);
    } else{
        let query = "insert into movies (title, year, box_office) values (?, ?, ?)";
        let formatted = mysql.format(query, [req.body.title, req.body.year, req.body.boxoffice]);
    
        pool.query(formatted, (err, status) => {
            if (err){
                res.status(500).send(err.sqlMessage);
            } else {
                // red je unet, vracam uneti red kao potvrdu unosa
                 query = "select * from movies where id = ?";
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

    let {error} = movieSchema.validate(req.body);

    if(error){
        console.log(error);
        res.status(400).send(error.details[0].message);
    } else{
        let query = "update movies set title = ?, year = ?, box_office = ? where id = ?";
        let formatted = mysql.format(query, [req.body.title, req.body.year, req.body.boxoffice, req.params.id]);

        pool.query(formatted, (err, status) => {
            if (err){
                res.status(500).send(err.sqlMessage);
            } else {
                // red uspesno azuriran, vracamo novo stanje
                query = "select * from movies where id = ?";
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

route.delete('/:id', (req, res) => {
    let query = 'select * from movies where id = ?'
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err){
            res.status(500).send(err.sqlMessage);
        } else {
            if (rows.length > 0){
                let poruka = rows[0];
                let query = "delete from movies where id = ?";
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
                res.status(404).send("There's no such movie");
            }
        }
    })
})

module.exports = route;