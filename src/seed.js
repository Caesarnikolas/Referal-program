const UserModel = require('./models/user.model');
const ApplicantModel = require('./models/applicant.model');
const { dbConnect, disconnect } = require('./db/connect');

async function start() {
  try {
    dbConnect();

    const userOne = new UserModel({
      name: 'Petr',
      password: '123456',
      email: 'petr@mail.ru',
      phone: '9991235678',
      role: 'user',
    });

    const userTwo = new UserModel({
      name: 'Semen',
      password: '654321',
      email: 'semen@mail.ru',
      phone: '9851235678',
      role: 'admin',

    });

    const applicantOne = new ApplicantModel({
      name: 'Andrey',
      email: 'andrey@mail.ru',
      phone: '91212345678',
      status: 'заявка подана',
      startDate: '15 апреля',
    });

    const applicantTwo = new ApplicantModel({
      name: 'Anton',
      email: 'anton@mail.ru',
      phone: '92612345678',
      status: 'заявка подана',
      startDate: '18 мая',
    });

    const applicantThree = new ApplicantModel({
      name: 'Ivan',
      email: 'ivan@mail.ru',
      phone: '93512345678',
      status: 'заявка подана',
      startDate: '15 апреля',
    });

    userOne.applicants.push(applicantOne, applicantThree);
    userTwo.applicants.push(applicantTwo);

    await applicantOne.save();
    await applicantTwo.save();
    await applicantThree.save();
    await userOne.save();
    await userTwo.save();

  } catch (error) {
    console.log(error)
  }

  disconnect();
}

start();
