import List from "../models/list.model.js";

export const save = async (req, res) => {
    const { filter, images } = req.body;
    try {
      const list = new List({ filter, images, user: req.user.id });
      await list.save();
      res.status(201).json({ message: 'List saved', list });
    } catch (error) {
      res.status(500).json({ message: 'Error saving list' });
    }
}

export const getLists = async (req, res) => {
    try {
      const lists = await List.find({ user: req.user.id });
      res.json(lists);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching lists' });
    }
}