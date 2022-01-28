import faker from "@faker-js/faker"
import prisma from "../src/client"

 const users = [
   {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
   },
   {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
   },
   {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
   },
   {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
   }
 ]

 const posts = [
   {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      published: faker.datatype.boolean(),
      authorId: 1,
   },
   {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      published: faker.datatype.boolean(),
      authorId: 2,
   },
   {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      published: faker.datatype.boolean(),
      authorId: 3,
   },
   {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      published: faker.datatype.boolean(),
      authorId: 4,
   },
   {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      published: faker.datatype.boolean(),
      authorId: 5,
   }
 ]

async function main() {

 for (const user of users) {
   await  prisma.user.create({data: user})
 }

 for (const post of posts) {
    await prisma.post.create({data: post})
 }

}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1)
  }).finally(() => {
    prisma.$disconnect()
  })
