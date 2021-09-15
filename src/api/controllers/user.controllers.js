const models = require('../models');


const signUp = async (req, res) => {
    const { email, password } = req.body;
  
        //miro si el usuario ya existe por el mail
    const existUser = await models.user.findOne({ email })
    if (existUser !== null) {
      return res.status(406).json({ message: 'User already exist!' });
    }
  //tras instalar bcrypt
    const hash = await models.user.encrypt(password);
  
    const user = models.user({ email, password: hash });
    console.log({ user })
    await user.save()
  
    res.status(201).json({ user })
  }

  
const create = async (req, res) => {
    const { email, password } = req.body;

    //miro si el usuario ya existe por el mail
    const existUser = await models.user.findOne({ email })
    if (existUser !== null) {
      return res.status(406).json({ message: 'El usuario ya existe' });
    }
//tras instalar bcrypt
    const hash = await models.user.encrypt(password);


    const user = models.user({ email, password: hash });
    console.log({ user })
    await user.save()
    res.status(201).json({ user })
  
}

const signIn = async (req, res) => {
    const { email, password } = req.body

    const user = await models.user.findOne({ email })
    if (!user) {
      return res.json({ message: 'El usuario no existe' });
    }
  
    const isValid = await models.user.compare(password, user.password);
    if (!isValid) {
      return res.json({ message: 'Password is incorrect!' });
    }
  
    res.json({ user })
  }

module.exports = { 
    create, 
    signIn,
    signUp,
}


// const signUp = async (req, res) => {
//     const { email, password } = req.body;
  
//     const existUser = await models.user.findOne({ email })
//     if (existUser !== null) {
//       return res.status(406).json({ message: 'User already exist!' });
//     }
  
//     const hash = await models.user.encrypt(password);
  
//     const user = models.user({ email, password: hash });
//     console.log({ user })
//     await user.save()
  
//     res.status(201).json({ user })
//   }
  
//   const signIn = async (req, res) => {
//     const { email, password } = req.body
  
//     const user = await models.user.findOne({ email })
//     if (!user) {
//       return res.json({ message: 'Email is incorrect' });
//     }
  
//     const isValid = await models.user.compare(password, user.password);
//     if (!isValid) {
//       return res.json({ message: 'Password is incorrect!' });
//     }
  
//     res.json({ user })
//   }
  
//   module.exports = {
//     signUp,
//     signIn,
//   }