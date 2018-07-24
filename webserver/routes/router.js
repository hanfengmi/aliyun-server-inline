// routes
import user from './user/user';
import img from './img/img';

export default (app) => {
    app.use('/api/user', user);
    app.use('/api/img', img);
}