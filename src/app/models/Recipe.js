const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    all(callback) {

        db.query(`
        SELECT * FROM recipes ORDER BY created_at DESC`, function(err, results){
            if(err) throw `Database Error ${err}`
            
            callback(results)
        })
    },

    create(data, callback) {

        const query = `
            INSERT INTO recipes (
                title,
                cooker,
                time,
                portions,
                ingredients,
                preparation,
                tips,
                photo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `

        const values = [
            data.data.title,
            data.data.cooker,
            data.data.time,
            data.data.portions,
            data.data.ingredients,
            data.data.preparation,
            data.data.tips,
            data.data.photo = "/assets/photos/" + data.file.filename
        ]

        db.query(query, values, function(err, results, fields) {
            if(err) throw `Database Error ${err}`

            callback(results.insertId)
        })

    },

    find(id, callback) {
        db.query(`
            SELECT *
            FROM recipes
            WHERE id = ?`, [id], function(err, results) {
                if(err) throw `Database Error ${err}`
                
                callback(results[0])
            }
        )
    },

    findBy(filter, callback) {
        db.query(`
            SELECT *
            FROM recipes
            WHERE title LIKE '%${filter}%'
            `, function(err, results){
                if(err) throw `Database Error ${err}`

                callback(results)
        })
    },

    update(data, callback) {

        var query = ""
        var values = []

        if ( !data.file ) {
            query = `
                UPDATE recipes SET
                    title=(?),
                    cooker=(?),
                    time=(?),
                    portions=(?),
                    ingredients=(?),
                    preparation=(?),
                    tips=(?)
                WHERE id = ?
            `

            values = [
                data.data.title,
                data.data.cooker,
                data.data.time,
                data.data.portions,
                data.data.ingredients,
                data.data.preparation,
                data.data.tips,
                data.data.id
            ]
        }

        if (data.file) {
            query = `
                UPDATE recipes SET
                    title=(?),
                    cooker=(?),
                    time=(?),
                    portions=(?),
                    ingredients=(?),
                    preparation=(?),
                    tips=(?),
                    photo=(?)
                WHERE id = ?
            `

            values = [
                data.data.title,
                data.data.cooker,
                data.data.time,
                data.data.portions,
                data.data.ingredients,
                data.data.preparation,
                data.data.tips,
                data.data.photo = "/assets/photos/" + data.file.filename,
                data.data.id
            ]
        }
        
        db.query(query, values, function(err, results) {
            if(err) throw `Database Error ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = ?`, [id], function(err, results) {
            if(err) throw `Database Error ${err}`

            return callback()
        })
    }
}