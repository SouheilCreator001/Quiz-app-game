/*
const mongoose = require("mongoose");

const Categorie =  mongoose.model("Categorie");
const Event = mongoose.model("Event");

Categorie.find({}, (err, categories) => {
    if (err) {
        console.error("Error retrieving categories:", err);
        return;
    }

    categories.forEach(categorie => {
        Event.find({ categorieEvent: categorie._id }, (err, events) => {
            if (err) {
                console.error("Error retrieving events for category:", categorie.titre, err);
                return;
            }
            console.log("Categorie: ", categorie.titre);

            events.forEach(event => {
                console.log(" Event: ", event.description);
                // You can display other event details here as needed
            });
        });
    });
});
*/