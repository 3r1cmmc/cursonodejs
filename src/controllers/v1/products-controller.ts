import { Request, Response } from 'express';
import Products  from '../../mongo/models/products';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { title, desc, price, images, userId } = req.body;

  try {
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });
    res.send({ status: 'OK', data: product });
  } catch (e) {
    console.log('create Product error: ', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};


const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Products.find({
      price: { $gt:11}
    })
      .populate('user', 'username email data role')
      .select('title desc price');
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('create Product error: ', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

const getProductsByUser = async (req: Request, res: Response):Promise<void> => {
  try {
    const products = await Products.find({
      user: req.params.userId
    });      
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('create Product error: ', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

export default {
  createProduct,
  getProducts,
  getProductsByUser,
};
