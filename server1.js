let express = require('express');
var cors = require('cors');
let app = express();
app.use(cors());
let bodyParser = require('body-parser');
let port = process.env.PORT || 9090;
let mongoose = require('mongoose');
let Cheque = require('./models/cheque');
let User = require('./models/users');
let router = express.Router({ mergeParams: true });
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongoose.connect('mongodb://localhost:27017/utils');
mongoose.connect('mongodb://dbuser:dbpass@ds235388.mlab.com:35388/jika');

// routes ================
// =======================
// basic route
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

router.get('/signup', function(req, res) {

    console.log('Entered signup');
    // create a sample user
    var nick = new User({
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });

    console.log('Adding user to db');
    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// route to return all users (GET http://localhost:9090/api/users)
router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});



router.route('/cheques')

// Add cheque details
.post(function(req, res) {
    var cheque = new Cheque();
    cheque.chequeReceiptDate = req.body.chequeReceiptDate;
    cheque.chequeNumber = req.body.chequeNumber;
    cheque.chequebankName = req.body.chequebankName;
    cheque.chequeIssuedBy = req.body.chequeIssuedBy;
    cheque.chequeIssuedTo = req.body.chequeIssuedTo;
    cheque.chequeIssueDate = req.body.chequeIssueDate;
    cheque.chequeAmount = req.body.chequeAmount;
    cheque.chequeStatus = req.body.chequeStatus;

    cheque.save(function(err) {
        if (err)
            res.send(err)

        res.json({ message: 'Cheque details added' });
    });
})

// Get all cheque details
.get(function(req, res) {
    Cheque.find(function(err, cheques) {
        if (err)
            res.send(err)

        res.json(cheques);
    });
});

router.route('/cheques/:cheque_id')

// Get cheque's details with id.
.get(function(req, res) {
    Cheque.findById(req.params.cheque_id, function(err, cheque) {
        if (err)
            res.send(err)

        res.json(cheque);
    });
})

// Update cheque's details with id.
.put(function(req, res) {
    Cheque.findById(req.params.cheque_id, function(err, cheque) {
        if (err)
            res.send(err)

        //set new values
        cheque.chequeReceiptDate = req.body.chequeReceiptDate;
        cheque.chequeNumber = req.body.chequeNumber;
        cheque.chequebankName = req.body.chequebankName;
        cheque.chequeIssuedBy = req.body.chequeIssuedBy;
        cheque.chequeIssuedTo = req.body.chequeIssuedTo;
        cheque.chequeIssueDate = req.body.chequeIssueDate;
        cheque.chequeAmount = req.body.chequeAmount;
        cheque.chequeStatus = req.body.chequeStatus;

        cheque.save(function(err) {
            if (err)
                res.send(err)

            res.json({ message: 'Cheque details updated' });
        });
    });
})

// Delete cheque's details by id.
.delete(function(req, res) {
    Cheque.remove({
        _id: req.params.cheque_id
    }, function(err, cheque) {
        if (err)
            res.send(err)

        res.json({ message: 'Cheque details removed' });
    })
});

app.use('/api', router);
app.listen(port);
console.log('Magin happens at ' + port + ' Visit http://localhost:9090/api');