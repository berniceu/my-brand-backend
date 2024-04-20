import mongoose from "mongoose"; 
import bcrypt from 'bcrypt';

interface UserModel{
    fullName: string,
    email: string,
    hash_password: string,
    
}

const UserSchema = new mongoose.Schema<UserModel>({
    fullName: {type:String, required: true},
    email:{type: String, required: true},
    hash_password: {type: String, required:true}
})

UserSchema.methods.comparePassword = function (password: string) : boolean {
    return bcrypt.compareSync(password, this.hash_password)

}

const userModel = mongoose.model<UserModel>('User', UserSchema);
export default userModel