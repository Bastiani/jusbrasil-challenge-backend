'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUsers = exports.clearCache = exports.load = exports.getLoader = undefined;

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _graphqlMongooseLoader = require('@entria/graphql-mongoose-loader');

var _UserModel = require('./UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User {

  constructor(data) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.active = data.active;
    this.isAdmin = data.isAdmin;
  }
}

exports.default = User;
const getLoader = exports.getLoader = () => new _dataloader2.default(ids => (0, _graphqlMongooseLoader.mongooseLoader)(_UserModel2.default, ids));

const viewerCanSee = (context, data) => true;

const load = exports.load = async (context, id) => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.UserLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new User(data) : null;
};

const clearCache = exports.clearCache = ({ dataloaders }, id) => dataloaders.UserLoader.clear(id.toString());

const loadUsers = exports.loadUsers = async (context, args) => {
  const { user } = context;
  if (!user) throw new Error('Unauthorized user');
  const { search } = args;
  const conditions = {
    ...(search != null ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {})
  };

  const users = _UserModel2.default.find(conditions).sort({ createdAt: -1 });

  return (0, _graphqlMongooseLoader.connectionFromMongoCursor)({
    cursor: users,
    context,
    args,
    loader: load
  });
};
//# sourceMappingURL=UserLoader.js.map