if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://todoapp:compl3x!ty@ds245132.mlab.com:45132/todoapp'};
} else {
  module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'};
}