const commande = require("../../models/commande/commande.model");


// get all commandes 
const index = async (req, res) => {
    try {
        const commandes = await commande.find().populate('produit').populate('client').populate('livreur')
        res.status(200).json({commandes})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// get by status
const getByStatus = async (req, res) => {
    var commandess=[];
    try {
        const commandes = await commande.find().populate('produit').populate('client').populate('livreur')
        commandes.map(commande => {
            if (commande.status != "valider") {
                commandess.push(commande)
                
            }
        })
        res.status(200).json({ commandess })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// count all commande 
const countcommande = async (req, res) => {
    try {
        const commandes = await commande.count()
        res.status(200).json(commandes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}



//add new commande
const store = async (req, res) => {
    //get body from http req
    const { produit,client,prix,adress,tel } = req.body
    const date = new Date(); 
    try {
        if (!produit || !client  || !prix || !adress || !tel)
            
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
            // add produit
            const newcommande = await commande.create({
                produit,
                client,
                prix,
                adress,
                tel,
                date: date,
                status:'encours'
            })
            res.status(200).json("commande ajouter avec success")

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


//update commande status
const updateStatus  = async (req, res) => {
    try {
        const updateStatus = await commande.updateOne(
            {id:req.params.id},
            {$set: { status:req.body.status }}
        )
        res.status(200).json(updateStatus)
        res.status(201).json("status commande modifier avec success")
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//affecter commande status
const affectercommande  = async (req, res) => {
    const {livreur} = req.body
    const id = req.params.id
    const record = { _id: id };
    // console.log(id)
    try {
        const affecter = await commande.updateOne(record,
            {$set:
                 { 
                  livreur:livreur
                 }
            }
        )
        res.status(200).json(affecter)
        res.status(201).json(" commande affecter avec success")
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



module.exports = {
    index,
    store,
    updateStatus,
    countcommande,
    affectercommande,
    getByStatus
}