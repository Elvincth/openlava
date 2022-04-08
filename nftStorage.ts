import { NFTStorage, File } from "nft.storage";

//The apiKey shd be hidden and store in .env, but for ease of demo use only
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY1QzEyNjlhNzI1QjM3MTBGRjgxYjViNDQ2MkQyNEZENjIzNUFiRDIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTE0NzkzNzU5NywibmFtZSI6Im9wZW5sYXZhIn0.AhrUBxmVwAGcxQ2IDq3vZ6b9Ijy-Iv4Op43zga5yDYY";
const client = new NFTStorage({ token: apiKey as string });

export { client, File };
