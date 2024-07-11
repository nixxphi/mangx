import User from '../models/user.model.js';
import GenericService from './generic.service.js';

const UserService = GenericService(User);

export default UserService;
