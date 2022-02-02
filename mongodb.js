// CRUD operations

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manger";

MongoClient.connect(connectionURL, { useNewParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database");
    }

    // gives us a db reference to our db name.
    const db = client.db(databaseName);

    db.collection("users")
        .deleteOne({
            name: "Jedi",
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
});
