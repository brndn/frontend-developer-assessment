import express, { Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import { BaseTodoItem, TodoItem, TodoItems } from '../models/todoItems';

export const todoItemRouter = express.Router();

let todoItems: TodoItems = {};

const findAll = (): TodoItem[] => Object.values(todoItems);
const find = (id: string): TodoItem => todoItems[id];

const todoItemDescriptionExists = (
  description: string
): boolean => {
  return Object.values(todoItems).some(
    (todoItem) => todoItem.description === description
  );
};

const create = (newTodoItem: BaseTodoItem): TodoItem => {
  const uid = new ShortUniqueId({ length: 10 });
  const id: string = uid();
  todoItems[id] = {
    id,
    ...newTodoItem
  };

  return todoItems[id];
};
const update = (
  id: string,
  todoItemUpdate: BaseTodoItem
): TodoItem | null => {
  const existingtodoItem = find(id);

  if (!existingtodoItem) {
    return null;
  }

  todoItems[id] = { id, ...todoItemUpdate };

  return todoItems[id];
};
const remove = (id: string): null | void => {
  const existingtodoItem = find(id);

  if (!existingtodoItem) {
    return null;
  }

  delete todoItems[id];
};

// GET todoItems
todoItemRouter.get('/', (req: Request, res: Response) => {
  try {
    const items: TodoItem[] = findAll();
    return res.status(200).send(items);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET todoItem/:id
todoItemRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const item: TodoItem = find(req.params.id);

    if (item) {
      return res.status(200).send(item);
    }

    return res.status(404).send('TodoItem not found');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST todoItem
todoItemRouter.post('/', (req: Request, res: Response) => {
  try {
    const todoItem: BaseTodoItem = req.body;
    console.log({ todoItem, req, body: req.body });

    const description = todoItem?.description;
    if (!description) {
      return res.status(400).send('Description is required');
    }

    const hasDuplicateDescription = todoItemDescriptionExists(
      description
    );

    if (hasDuplicateDescription) {
      return res.status(400).send('Description already exists');
    }
    const newtodoItem = create(todoItem);
    return res.status(201).json(newtodoItem);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// PUT todoItems/:id
todoItemRouter.put('/:id',  (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todoItem: BaseTodoItem = req.body;

    const existingTodoItem: TodoItem =  find(id);
    if (existingTodoItem) {
      const updatedItem =  update(id, todoItem);
      return res.status(200).json(updatedItem);
    }

    return res.status(404).send('TodoItem not found');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE todoItems/:id
todoItemRouter.delete('/:id',  (req: Request, res: Response) => {
  try {
    const id = req.params.id;

     remove(id);

    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
