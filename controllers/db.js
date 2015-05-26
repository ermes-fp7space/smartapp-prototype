//This coontroller allows to config the databaseConection, when the DB will be published,
// we just need to change this URL for the provided by the server.

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/serverermesapp';

module.exports = {
    'url' : uristring
}