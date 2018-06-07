// Exporting object containing both models - not really sure why this is done this way because you could just export at the bottom of each model, right? The assignments show doing this though. 

module.exports = {
  Article: require("./Article"),
  Note: require("./Note")
};