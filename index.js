const express = require('express'); 
const multer = require('multer');
const app = express(); 
const port = 4001; 

const morgan=require("morgan") 
app.use(morgan("combined")) 
const bodyParser=require("body-parser") 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
const cors=require("cors"); 
app.use(cors()) 
app.listen(port,()=>{ 
console.log(`My Server listening on port ${port}`) 
}) 
app.get("/",(req,res)=>{ 
res.send("This Web server is processed for MongoDB") 
}) 
const { MongoClient, ObjectId } = require('mongodb'); 

client = new MongoClient("mongodb://127.0.0.1:27017"); 
client.connect(); 
database = client.db("FashionData");       
fashionCollection = database.collection("Fashion");


    app.get("/fashions", cors(), async (req, res) => {    
        try {
            const result = await fashionCollection.find({}).toArray(); 
            res.setHeader("Content-Type", "application/json"); // ✅ Đảm bảo JSON
            res.json(result); // ✅ Đảm bảo trả về JSON
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error", error });
        }
    });
    app.get("/fashions/:id",cors(),async (req,res)=>{ 
        var o_id = new ObjectId(req.params["id"]); 
        const result = await fashionCollection.find({_id:o_id}).toArray();     
        res.send(result[0]) 
        } 
        )
        
        const storage = multer.memoryStorage(); // Lưu file vào bộ nhớ RAM
const upload = multer({ storage: storage });

app.post("/fashions", upload.single('fashion_image'), async (req, res) => {
    try {
        const { style, fashion_subject, fashion_detail } = req.body;
        
        // Kiểm tra nếu có file ảnh được upload
        const fashion_image = req.file 
            ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
            : null;

        const newFashion = { style, fashion_subject, fashion_detail, fashion_image };
        const result = await fashionCollection.insertOne(newFashion);

        res.status(201).json({ message: "Fashion added successfully", data: newFashion });
    } catch (error) {
        res.status(500).json({ message: "Error adding fashion", error });
    }
});

        
        
        

            app.put("/fashions/:id", upload.single('thumbnail'), async (req, res) => {
                const { style, fashion_subject, fashion_detail, existingImage } = req.body;
            
                const updateData = { style, fashion_subject, fashion_detail };
            
                if (req.file) {
                    updateData.fashion_image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
                } else if (existingImage) {
                    updateData.fashion_image = existingImage;  // Giữ ảnh cũ
                } else {
                    updateData.fashion_image = null;  // Không có ảnh
                }
            
                await fashionCollection.updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: updateData }
                );
            
                const updatedItem = await fashionCollection.findOne({ _id: new ObjectId(req.params.id) });
                res.send(updatedItem);
            });
            app.delete("/fashions/:id",cors(),async(req,res)=>{    
                //find detail Fashion with id 
                var o_id = new ObjectId(req.params["id"]); 
                const result = await fashionCollection.find({_id:o_id}).toArray();  
                //update json Fashion into database 
                await fashionCollection.deleteOne( 
                {_id:o_id} 
                ) 
                //send Fahsion after remove 
                res.send(result[0]) 
                }) 