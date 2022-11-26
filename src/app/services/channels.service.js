import models from '../models/index.js';

class ChannelsService {
    constructor(db) {
        this.Model = db.model('channels', models.ChannelsModel);
    }
    async get(id) {
        const obtained = await this.Model.findOne({ _id: id })
        .populate(['users']);

        return obtained;
    }

    async getByUser(id) {
        let obtained = await this.Model.find({ users : id})
        .populate(['users']);

        if(obtained.length > 0){
            obtained.map((channel) => {
                if(channel.users.length > 0){
                    const users = channel.users.filter(({_id}) => _id.toString() !== id);
                    channel.users = users;
                }
            })
        }
        
        return obtained;
    }

    async add(data) {
        const object = await this.Model.create(data);

        return object;
    }

    async delete(nodeData) {
        let deleted = false;

        const result = await this.Model.deleteMany({ _id: nodeData }).lean();
        deleted = { ids: nodeData, deleted: result.n > 0 };

        return deleted;
    }
}

export default ChannelsService;