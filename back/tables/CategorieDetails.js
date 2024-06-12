const mongoose = require("mongoose");

const CategorieDetailsSchema = new mongoose.Schema({
    titre: String,
    dateDebut: Date,
    dateFin: Date,
}, {
    collection: "Categorie"
}); 

CategorieDetailsSchema.virtual('year').get(function() {
    return this.dateDebut.getFullYear();
});

CategorieDetailsSchema.virtual('year').get(function() {
    return this.dateFin.getFullYear();
});

mongoose.model("Categorie", CategorieDetailsSchema);