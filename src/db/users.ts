import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    authentication:{
        password:{type:String,required:true,select:false},
        salt:{type: String,select:false},
        sessionToken:{type:String,select:false},

    },
})

export const UserModal = mongoose.model('user',UserSchema);

export const getusers = () => UserModal.find()
export const getuserByEmail = (email:String) => UserModal.findOne({email})
export const getuserBySessionToken = (sessionToken:string) => UserModal.findOne({
    'authentication.sessionToken':sessionToken
})

export const getUserById = (id:String) => UserModal.findById(id)
export const createUser = (values: Record<string,any>) =>  new UserModal(values).save().then((user)=>user.toObject())
export const deleteUserById = (id:String) => UserModal.findOneAndDelete({_id:id})
export const updateUserById = (id:String,values:Record<string,any>) => UserModal.findByIdAndUpdate(id,values)