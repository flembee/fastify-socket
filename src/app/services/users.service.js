import models from '../models/index.js';
import utils from '../utils/index.js';

const { objectToDotNotation } = utils;

class UsersService {
    constructor(db) {
        this.Model = db.model('users', models.UsersModel);
    }

    async get(id) {
        const obtained = await this.Model.findOne({ _id: id });

        return obtained;
    }

    async getContacts(id) {
        const obtained = await this.Model.findOne({ _id: id }).populate(['contacts']);
        
        let contacts = [];

        if(obtained.contacts.length > 0){
            const selectFewerProps = (show) => {
                const {id, name, email, userImage} = show;
                return {id, name, email, userImage};
            }
            contacts = obtained.contacts.map(selectFewerProps);
        }

        return contacts;
    }

    async getByEmail(email) {
        const obtained = await this.Model.findOne({ email });

        return obtained;
    }
    
    async add(data) {
        const created = await this.Model.create(data);
        if(!created) return ""
        
        return this.get(created._id)
    }

    async delete(nodeData) {
        let deleted = false;

        const result = await this.Model.deleteMany({ _id: nodeData }).lean();
        deleted = { ids: nodeData, deleted: result.n > 0 };

        return deleted;
    }

    async update(id, data) {
        const updated = await this.Model.findOneAndUpdate(
            { _id: id },
            { $set: objectToDotNotation({ updatedAt: Date.now(), ...data }) },
            { new: true }
        )
            .catch((e) => {
                throw e;
            });

        return updated;
    }
}

export default UsersService;
