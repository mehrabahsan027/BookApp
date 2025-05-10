const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3001


app.use(cors( {
  origin: [ "http://localhost:3000","https://book-app-01.netlify.app"]
}));
app.use(express.json());


// connect to database


const uri = process.env.MONGODB_URL;






// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create database and collection
    const database = client.db("book-management");
    const booksCollection = database.collection("books");

    //add data to the collection

    //add books (POST)
    app.post('/add-book', async (req, res) => {
      const bookData = req.body;

      try {
        const { title, author } = bookData;

        // Check if book already exists
        const existingBook = await booksCollection.findOne({
          title: title,
          author: author
        });

        if (existingBook) {
          return res.status(400).json({
            error: "Book already exists (same title and author)"
          });
        }

        // If no duplicate, insert the new book
        const result = await booksCollection.insertOne(bookData);
        res.status(201).json({
          message: "Book added successfully",
          result
        });


      } catch (error) {
        res.status(500).json({ error: error.message });

      }





    })


    //get all books (GET)

    app.get('/books', async (req, res) => {
      const {
        page,
        limit,
        genre,
        minYear,
        maxYear,
        author,
        minPrice,
        maxPrice,
        sortBy,
        order,
        search,
      } = req.query;
      try {

        // Pagination
        const currentPage = parseInt(page) || 1;
        const perBooks = parseInt(limit) || 6;
        const skip = (currentPage - 1) * perBooks;


        //filtering
        const filter = {};

        // searching using title,author and genre
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
            { genre: { $regex: search, $options: 'i' } },
          ]
        }

        //filtering using genre
        if (genre) filter.genre = genre


        //filtering using price
        if (minPrice || maxPrice) {
          filter.price = {};
          if (minPrice) filter.price.$gte = parseFloat(minPrice);
          if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

      

        // Sort options
        const sortOptions = { [sortBy || 'title']: order === 'desc' ? -1 : 1 };

      // Execute queries in parallel for better performance
      const [books, totalBooks] = await Promise.all([
        booksCollection
          .find(filter)
          .sort(sortOptions)
          .skip(skip)
          .limit(perBooks)
          .toArray(),
        booksCollection.countDocuments(filter)
      ])


      res.json({
        books,
        totalBooks,
        currentPage,
        totalPages: Math.ceil(totalBooks / perBooks),
      });

      } catch (error) {
        res.status(500).json({ error: error.message });

      }
    })

//get a single book (GET)

app.get('/books/:id', async (req, res) => {
  const { id } = req.params

 
  try {
    const book = await booksCollection.findOne({ _id: new ObjectId(id) });

    // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid book ID format' });
  }
   
    
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({status: true, book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


})

//update a book (PUT)

app.put('/books/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updateBook = await booksCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body })
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})


  // 📌 Delete Book (DELETE)
  app.delete("/books/:id", async (req, res) => {
    try {
      await booksCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.json({ message: "Book deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }); 








    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})