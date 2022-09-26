const Post = require('../models/Post')
const User = require('../models/User')
const { post } = require('../routes/postRoutes')

module.exports = class PostController{
    static async showPost(req,res){
        const postsData = await Post.findAll({
            include: User,
        })

        const posts= postsData.map((result) => result.get({plain:true}))

        res.render('post/forum', {posts})
    }
    
    static async forum(req,res){
        const userId = req.session.userid
        
        const user = await User.findOne({
            where:{
                id:userId,
            },
            include: Post,
            plain: true,
        })
        
        //ver se o usuario existe
        if(!user){
            res.redirect('/login')
        }

        const posts= user.posts.map((result) => result.dataValues)
        console.log(posts)

        res.render('post/forum',{ posts })

    }

    static createPost(req, res){
        res.render('post/create')
    }

    static async createPostSave(req,res){

        const posts = {
            conteudo: req.body.conteudo,
            userId: req.session.userid
        }

        

        
        
        try{
            await Post.create(posts)

            req.flash('message','Post realizado com sucesso!')

            req.session.save(()=>{
                res.redirect('/post/forum')
            })
        }catch(error){
            console.log(error)
        }
    }

    static async removePost(req,res){
        const id = req.body.id

        const UserId =  req.session.userid

        try{
            await Post.destroy({where:{id: id, UserId: UserId}})
            req.flash('message','Post removido com sucesso!')

            req.session.save(()=>{
                res.redirect('/post/forum')
            })
        }catch(error){
            console.log(error)
        }
    }

}
