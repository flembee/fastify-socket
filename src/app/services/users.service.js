import models from '../models/index.js';
import config from '../../../config/index.js';
import utils from '../utils/index.js';

const { search } = config;
const { objectToDotNotation } = utils;

class UsersService {
    constructor(db) {
        this.Model = db.model('users', models.UsersModel);
    }

    async search({
        select,
        populate,
        page,
        limit,
        sortField,
        sortDirection,
        querySearch,
        queryParams,
        logger,
    }) {
        const options = {
            select: select || '-password',
            populate: populate || ['userRole'],
            page: page || search.pageOptions.page,
            limit: limit || search.pageOptions.limit,
            sort: sortField
                ? { [sortField]: sortDirection || search.pageOptions.sort.key }
                : search.pageOptions.sort,
        };

        return this.Model.paginate(
            { ...querySearch, ...queryParams, _id: { $ne: logger } },
            options
        );

    }

    async get(id) {
        const obtained = await this.Model.findOne({ _id: id })
            .populate(['userRole']);
        return obtained;
    }

    async getByEmail(email) {
        const obtained = await this.Model.findOne({ email })
            .populate(['userRole']);
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
            .populate(['userRole'])
            .catch((e) => {
                throw e;
            });

        return updated;
    }
}

export default UsersService;
