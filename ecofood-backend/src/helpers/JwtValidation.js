const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//compared password function
const comparePassword = async (password, user,role ,res) => {
    //brypting password
    bcrypt.compare(password,user.password)
        .then((isCorrect) => {
            if (isCorrect) {
                const data = {
                    role:role,
                    id: user._id,
                    email: user.email
                    
                }
                //token generetor
                jwt.sign(data, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' }, (err, token) => {
                    if (err) return res.json({ message: err.message })
                    return res.status(200).json({
                        token: token,
                        role:role,
                        email: user.email,
                        id:user._id
                        
                    })
                })
            } else {
                res.status(404).json({ message: "Invalid email or password" }) //error message
            }
        })
}


module.exports = { comparePassword }