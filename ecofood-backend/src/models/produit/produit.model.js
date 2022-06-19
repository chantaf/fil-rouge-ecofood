const mongoose = require('mongoose')

const produitSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    quantite: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    prix: {
        type: String,
        required: true
    },
    image:[{
        type:String,
        required:true
    }],
    categorie: {type:mongoose.Schema.ObjectId, ref:'categorie'},
})

module.exports = mongoose.model('produit', produitSchema)