import { request, response } from 'express';
import User from '../models/userModel.js';


// Create a new user

export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const saveData = await newUser.save();
        // res.status(201).json(saveData);
        res.status(200).json({
            message: 'User created successfully'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            return response.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message || 'Unknown error'
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        // res.status(200).json(updatedData);
        res.status(200).json({
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating user',
            error: error.message || 'Unknown error'
        });
    }
}


export const deleteUser = async (req, res) => {

    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(id);   
        res.status(200).json({message : 'user deleted successfully'});

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message || 'Unknown error'
        });
    }

}

