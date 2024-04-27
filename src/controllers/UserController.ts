import { Request, Response } from 'express';
import User from '../models/User';

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne(({ _id: req.userId }));

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).send(user)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user" });
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).send(newUser);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, address, city, country } = req.body;
    const user = await User.findOne(({ _id: req.userId }));

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.name = name
    user.address = address
    user.city = city
    user.country = country
    await user.save()

    res.status(200).send(user)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
}

export default {
  getUser,
  createUser,
  updateUser,
}