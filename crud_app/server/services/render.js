const axios = require('axios')

exports.homeRoutes = (req,res)=>{
    //making a GET request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index',{title:"ADMIN PAGE",users:response.data})
        })
        .catch(err=>{
            res.send(err)
        })

    
}

exports.add_user = (req,res)=>{
    res.render('add_user',{title:"ADMIN PAGE"})
}

exports.update_user = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params : {id:req.query.id}})
        .then(function(userdata){
            res.render('update_user',{title:"UPDATE PAGE",user:userdata.data})
        })
        .catch(err=>{
            res.send(err)
        })

}