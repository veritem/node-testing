import { Request, Response } from "express"
import prisma from "../client"

export async function getPostsHandler(req: Request, res: Response) {
    const posts = await prisma.post.findMany();
  
    res.json(posts);
  }

export async function createPostHandler(req: Request, res: Response) {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).send({
      message: !title ? 'title is required':!content ? 'content is required' : "authorId is required",
    });
  }

  const author = await prisma.user.findFirst({
    where: { id: parseInt(authorId) },
  });

  if (!author) {
    return res.status(404).send({
      message: "Author not found",
    });
  }

  const post = await prisma.post.findFirst({
    where: {
      title,
      content
    },
  });

  if (post) {
    return res.status(400).send({
      message: "Post already exists",
    });
  }

  try {
    let post = await prisma.post.create({ data: { title, content, authorId } });
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
}