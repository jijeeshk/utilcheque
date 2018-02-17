var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chequeSchema = new Schema({
    chequeReceiptDate: String,
    chequeNumber: Number,
    chequebankName: String,
    chequeIssuedBy: String,
    chequeIssuedTo: String,
    chequeIssueDate: String,
    chequeAmount: Number,
    chequeStatus: String
});

module.exports = mongoose.model('Cheque', chequeSchema);