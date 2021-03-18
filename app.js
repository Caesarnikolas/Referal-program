const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('hbs');
const sessions = require('express-session');
const MongoStore = require('connect-mongo')(sessions);
const { connect } = require('mongoose');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/user.router');
const adminRouter = require('./src/routes/admin.router')
const mainRouter = require('./src/routes/main.router');


const app = express();
const PORT = 3000;
// Для подписания сессий необходима секретная строка
// require('crypto').randomBytes(64).toString('hex')
const secretKey = '7c48aaa6d93b475ab617753471cfd864270c97d4e8e5a0c8035e6cb89bed134419d6d7db10d4ad1258da8eeba7ee23ea3247d866df52aadc79ab2a42bbd1aa63';
// dbConnect();

app.set('view engine', 'hbs');
app.use(express.static(path.join(process.env.PWD, 'src', 'public')));
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.set('cookieName', 'sid'); // Устанавливаем в настройках сервера специальную переменную,
// которая говорит, какое имя будут носить cookie
app.set('views', path.join(process.env.PWD, 'src', 'views'));

app.use(sessions({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false, // Не сохранять сессию, если мы ее не изменим
  saveUninitialized: false, // не сохранять пустую сессию
  store: new MongoStore({ // выбираем в качестве хранилища файловую систему
    mongooseConnection: mongoose.connection
  }),
  cookie: { // настройки, необходимые для корректного работы cookie
    // secure: true,
    httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
    maxAge: 86400 * 1e3, // устанавливаем время жизни cookie
  },
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  res.locals.user = req.session?.user;

  next();
});

app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log('Server started on port ', PORT);
  const connectionAddress = process.env.DATABASE_CONNECTION_ADDRESS ?? 'mongodb://localhost:27017/referral-program';

  connect(connectionAddress, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }, () => {
    console.log('Подлючение к базе данных успешно.');
  });
});
