const mongoose = require('mongoose')

const commandeSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    adress:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    prix:{
        type:String,
        required:true
    },
    status: {
        type: String,
        required: true
    },
    produit:[{type:mongoose.Schema.ObjectId, ref: 'produit'}],
    client: {type:mongoose.Schema.ObjectId, ref: 'clients'},
    livreur: {type:mongoose.Schema.ObjectId,default:null, ref: 'livreurs'},
})

module.exports = mongoose.model('commande', commandeSchema)