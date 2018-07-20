// routes
import user from './user/user';

export default (app) => {
    app.use('/api/user', user);
}