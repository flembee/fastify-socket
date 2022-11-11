import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: ObjectId,
        required: true,
        ref: 'roles',
    },
    phoneNumber: {
        type: Number,
        default: 0
    },
    userImage: {
        type: String,
        default: 'user.png'
    },
    verified: {
        type: String,
        default: false
    },
}, { 
    versionKey: false,
        minimize: false,
        strict: true,
        timestamps: true })

UserSchema.index({ email: 1 });
UserSchema.plugin(mongoosePaginate);

export default UserSchema;