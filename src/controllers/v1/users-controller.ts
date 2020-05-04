import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../../mongo/models/users';
import Products from '../../mongo/models/products';

const expiresIn = 60 * 10;

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT!,
          { expiresIn: expiresIn }
        );
        res.send({
          status: 'OK',
          data: {
            token,
            expiresIn: expiresIn,
          },
        });
      } else {
        res.status(403).send({ status: 'INVALID_PASSWORD', message: '' });
      }
    } else {
      res.status(401).send({ status: 'USER_NOT_FOUND', message: '' });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Req Body: ', req.body);

    const { username, email, password, data } = req.body;

    const hash = await bcrypt.hash(password, 15);

    // await Users.create({
    //   username,
    //   email,
    //   data,
    //   password: hash
    // });

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;

    await user.save();

    console.log('pas: ', hash);
    console.log('fin');
    res.send({ status: 'Ok', message: 'user created' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    if(!userId){
      throw new Error('missing param userId');
    }

    await Users.findByIdAndDelete(userId);
    console.log('userId: ',userId);
    await Products.deleteMany({ user: userId});
    res.send({ status: 'Ok', message: 'user deleted' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
try {
  const users = await Users.find().select({ password:0, __v:0, role:0});
  res.send({ status: 'Ok', data: users });
} catch (e) {
  res.status(500).send({ status: 'ERROR', message: e.message });
}

  
};

const updateUser = async (req: Request, res: Response) => {
  try {
    console.log('idSession: ', req.sessionData.userId); // muestra informacion insertada en el request
    const { username, email, data, userId } = req.body;
    await Users.findByIdAndUpdate(userId, {
      username,
      email,
      data,
    });
    res.send({ status: 'Ok', message: 'user updated' });
  } catch (e) {
    console.log(e);
    if (e.code && e.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: e.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: 'user not updated' });
  }
};

export default{
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  login,
};
