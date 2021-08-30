const bcrypt = require('bcryptjs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => callback(hash))
        })
    }

    // obterHash recebe os parametros (senha digitada pelo usuario , Callback Function)
    //      genSalt(10 saltos, arrow function que em caso de erro é realizada)
    // dentro da arrow function tem um .hash (dado a ser encriptado, saltos, progresso, erro(passou callback))

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('users')
            .insert({name: req.body.name, email: req.body.email, password})
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
        })
    }

    return {save}
}