var Userdb = require('../model/model')


//create and save new user
exports.create = (req,res)=>{
    //validate req
    if(!req.body){
        res.status(400).send({message:"Content cant be empty"})
        return
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
    })

    //saving user into the database
    user
    .save(user)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "error occured while creating user"
        })
    })
}

// retrieve all users 
exports.find=(req,res)=>{

    if (req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message:"User not found iwth id"+id})
                }
                else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"error gettinf user with id"})
            })
    }
    else{
        Userdb.find()
            .then(user=>{
                res.send(user)
            })
            .catch(err=>{
                res.status(500).send({message:err.message||"Error occured while getting user data"})
            })
    }

    
}

//update user by ID
exports.update=(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data cant be empty"})
    }

    const id = req.params.id;

    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`cannot update user with ${id}, maybe user not found`})
            }
            else{
                res.send(data)  
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Update user information"})
        })

}


//DELETE A USER BY ID

exports.delete=(req,res)=>{
    const id= req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`cannot delete with id ${id}.maybe id is wrong`})
            }
            else{
                res.send({
                    message:"user deleted sucessfully"
                })
            }

        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete user with id"
            })
        })
}