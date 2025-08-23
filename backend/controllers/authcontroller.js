const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const register = async (req,res)=>{
const{ name , email , password , role ,phone } = req.body
try{

    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({massage:'this mail already exist'});

     const hashedpassword = await bcrypt.hash(password,10);

     const newUser = await User.create({
        name,
        email,
        password:hashedpassword,
        role,
        phone
     });
     res.status(201).json({ message: 'User registered successfully' });
}
catch(err){
  res.status(500).json({ message: 'Server error' });
}

};

const login = async (req,res)=>{
    const { email , password } = req.body;
    try{
          console.log("Login attempt:", email, password);
          const user = await User.findOne({email});
          if(!user) return res.status(400).json({massage:'invslid mail'});

          const isMatch = await bcrypt.compare(password,user.password);
          if(!isMatch) return res.status(400).json({massage:'invails password'});

          const token = jwt.sign(
              {
                userId:user._id,
                name: user.name,  
                role:user.role,
                phone:user.phone
              },
              process.env.JWT_SECRET,
              {expiresIn:'1d'},
          );

           res.json({ token , 
            user: 
            {    id: user._id, 
                 name: user.name,
                 email: user.email, 
                 role: user.role,
                 phone:user.phone
            } 
                    });
    }
   catch (err) {
    res.status(500).json({ message: 'Server error' });
  }

}


const getUsers  = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'user' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: ' error' });
  }
};

module.exports = { register, login ,getUsers};