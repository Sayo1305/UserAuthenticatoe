const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express()
const user = require('./models/user');
const cors = require('cors')
const port = 3001;


app.use(express.json());
app.use(cors())
mongoose.connect('mongodb://localhost:27017/test1',{
      useNewUrlParser: true,
	useUnifiedTopology: true,
}).catch( (err) => console.log(err)).then((rep)=> {console.log(rep)}) ;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/User' , async(req ,res)=>{
      const response = await user.find();
      res.send(JSON.stringify(response));
})

app.delete('/User/delete/:id' , async(req , res)=>{
      const result = await user.findByIdAndDelete(req.params.id);
      res.json(result);
})


app.post('/User/Login' , async(req , res)=>{
      const {username , password} = req.body;
      const response = await user.findOne({username: username});
      console.log(response);
      if(response !== undefined)
      {
            const passwordmatch = await bcrypt.compare(password  , response.password);
            res.send(JSON.stringify(passwordmatch));
            console.log("password: " + passwordmatch);
      }else{
            res.send(false);
      }
});

app.post('/User/add' , async(req , res)=>{
      const { username, password : password1 } = req.body;
      if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
      if (!password1 || typeof password1 !== 'string') {
		return res.json({status: 'error', error: 'password should contain alphabets' })
	}
      if(!password1 ||  password1.length < 8)
      {
            return res.json({status: 'error', error: 'Password should be greater than 8 words' })
      }
      const password = await bcrypt.hash(password1, 10)
      try {const response = await user.create({
		username,
		password
            
	})
            console.log('User created successfully: ', response)
            res.send(response); 
      }
      catch(error){
            if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
      }

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})