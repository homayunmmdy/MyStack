const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

require('dotenv').config()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

/*-----------------------------------------------------------------------------------------*/
/*---------------------------------------MY CODE-------------------------------------------*/
/*-----------------------------------------------------------------------------------------*/

function dataManagement(action, input) {
  let filePath = './public/data.json';
  
  //create file if nor exist, then read the file
  if (!fs.existsSync(filePath)) { fs.closeSync(fs.openSync(filePath, 'w')); }
  let file = fs.readFileSync(filePath);

  //screnario for save input into data -> append input to data.json file
  if (action == 'save data' && input != null) {
    
    //if file is empty
    if (file.length == 0) {
      //add new user to data.json
      return fs.writeFileSync(filePath, JSON.stringify([input], null, 2));
    }
    //if file not empty
    else if (file.length > 0) {
      let Alldata    = JSON.parse(file.toString());
      let count_data = Alldata.length;

      //check existing user id (check existing username already done on genererate user id for new user)
      let id_Exist = Alldata.map(d => d._id); let check_id = id_Exist.includes(input._id);
      
      //if user id not exist -> add new user to data.json
      if ( check_id == false ) {
        // console.log({action : 'input new user'});
        Alldata.push( input );
        return fs.writeFileSync(filePath, JSON.stringify( Alldata, null, 2 ) );
      }
      
      //if user id already exist -> update count, and log to existing user id
      else if ( check_id == true ) {
        // console.log({action : 'update existing user'});
        user_index = id_Exist.indexOf(input._id);
        Alldata.splice(user_index,1, input);
        return fs.writeFileSync(filePath, JSON.stringify( Alldata, null, 2 ) );
      }
      else {
        // console.log( {action : 'no action'} );
        return;
      }
      
    } else { return; }
  }
  //screnario for load All data
  else if (action == 'load data' && input == null) {
    if (file.length == 0) { return; }
    else {
      let dataArray = JSON.parse(file);
      return dataArray;
    }
  }
}


//Additional function : generate user id
function gen_id(username) {
  let Alldata  = dataManagement("load data");
  let id       = uuid.v4().replace(/-/g, "").slice(0,24);
  if (Alldata == undefined) { return id; }
  else {
    //check existing user id and username
    let id_Exist    = Alldata.map(d => d._id);
    let name_Exist  = Alldata.map(d => d.username);
    let check_id    = id_Exist.includes(id); let check_username = name_Exist.includes(username);
    let check_input = check_id && check_username
    
    if      (check_id    == true  && check_username == false) { gen_id(username); }
    else if (check_id    == false && check_username == true)  { return; }
    else if (check_input == false) { return id; }
    else    { return; }
  }
}

//Additional function : load user log as requirement (from, to, and limit)
function user_log(found_user, from, to, limit) {
  let check_from = false; let check_to = false; let check_limit = false;
  if (from)  { check_from  = !isNaN(Date.parse(from)); }
  if (to)    { check_to    = !isNaN(Date.parse(to));   }
  if (limit) { check_limit = /^[0-9]+$/.test(limit);   }
  
  // console.log( {from : from, to : to, limit : limit } );
  // console.log( {from : check_from, to : check_to, limit : check_limit } );
  
  let _id         = found_user._id;
  let username    = found_user.username;
  let count       = parseInt(found_user.count);
  let log_Exist   = found_user.log;
  let log_format  = log_Exist.map( (l) => {
      return { description : l.description, duration : parseInt(l.duration), date : l.date }
  });
  let log_date = []; let log_fin  = [];

  //create log_format as date requirement
  if (check_from == false && check_to == false) { 
    log_date = log_format; 
  }
  else if (check_from == true && check_to == false) {
    log_date = log_format.filter((d) => { return Date.parse(d.date) > Date.parse(from); } );
  }
  else if (check_from == false && check_to == true) {
    log_date = log_format.filter((d) => { return Date.parse(d.date) < Date.parse(to); } );
  }
  else if (check_from == true && check_to == true) {
    log_date = log_format.filter((d) => {
      return Date.parse(d.date) > Date.parse(from) && Date.parse(d.date) < Date.parse(to);
    });
  }

  if (check_limit == true) { log_fin = log_date.slice(0,limit) }
  else if (check_limit == false) { log_fin = log_date; }
  
  
  user_data = { _id : _id, username : username, count : count, log : log_fin };
  return user_data;
}

app.post('/api/users',
  [ check('username', 'username: Path `username` is required').isLength({ min: 1 }) ],
  (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.json(errors) }
    else {
      username = req.body.username; id = gen_id(username);
      if ( id === undefined ) { 
        res.json({ action : 'input failed, Username already Exist'}); 
      } else {
        user = { username : username, _id : id, count : 0, log : [] };
        dataManagement('save data', user);
        return res.json({ username : username, _id : id });
      }
    }
  }
);

app.get('/api/users', (req,res) => {
  let Alldata = dataManagement("load data");
  if (Alldata === undefined) { return res.json({data : 'no data'}); }
  else {
    //load All data (only id and username)
    let data = Alldata.map( (d) => { return {username : d.username, _id : d._id} } );
    return res.json(data);
  }
});


app.post('/api/users/:_id/exercises',
  [
    check('description','desc: Path `description` is required').isLength({ min: 1 }),
    check('duration','duration: Path `duration` is required with valid number')
      .matches(/^[0-9]+$/)
      .isLength({ min: 1 }),
  ],
  (req,res) => {
    let id    = req.params._id;
    let desc  = req.body.description;
    let dur   = req.body.duration;
    let date  = req.body.date;
    
    Alldata = dataManagement('load data');
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) { res.json(errors) }
    else if (Alldata === undefined) { return res.json({data : 'no data'}); }
    else {
      //find input user id on existing data -> if user is exist then update user's log
      let id_Exist    = Alldata.map(d => d._id);
      let found_user  = Alldata[ id_Exist.indexOf( id ) ];
      
      if (found_user == undefined) { return res.json({user_id : 'Invalid user id'}); }
      else {
        //Validate input date
        let isValidDate = Date.parse(date);
        if(isNaN(isValidDate)) { date = new Date().toDateString() } 
        else { date = new Date(date).toDateString(); }

        //Update user log
        let username     = found_user.username;
        let _id          = found_user._id;
        
        let count_Exist  = parseInt(found_user.count);
        let count        = count_Exist += 1;

        let log_Exist    = found_user.log;
        let log_input    = {description : desc, duration : dur, date : date};
        let log          = log_Exist.concat(log_input);
        
        user = { username : username, _id : _id, count : count, log : log };
        dataManagement('save data', user);
        return res.json ({
           _id : _id, username : username, date : date, 
           duration: parseInt(dur), description : desc
        });
      }
    }
});

app.get('/api/users/:_id/logs', (req,res) => {
  Alldata = dataManagement('load data');
  let id = req.params._id; let {from, to, limit} = req.query;
  
  if (Alldata === undefined) { return res.json({data : 'no data'}); }
  else {
    //check if id exist -> load user log
    let id_Exist     = Alldata.map(d => d._id);
    let found_user   = Alldata[ id_Exist.indexOf( id ) ];
    
    if (found_user == undefined) { return res.json({user_id : 'Invalid user id'}); }
    else {
      user_data = user_log(found_user, from, to, limit);
      return res.json(user_data);
    }
  }
  
});

/*=========================================================================================*/

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})