const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, Collection, CURSOR_FLAGS } = require('mongodb');
const levelTerm = require('./dummy.json');
const teacher = require('./teacher.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://admin-1:admin12345@cluster0.ac4rtpa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
    try {
        const database = client.db('sample');
        const exam_reg = database.collection('exam reg');
        const routine = database.collection('routine');
        const room_info = database.collection('room_info');
        const courses = database.collection('courses');

        // create exam
        app.post('/', async (req, res) => {
            const exam = req.body;
            const result = await exam_reg.insertOne(exam);
        });

        // create routine
        app.post('/routine', async (req, res) => {
            const routine_data = req.body;
            const result = await routine.insertOne(routine_data);
        });

        // add courses to the database:
        app.post('/add_courses', async(req, res) => {
            const course = req.body;
            const result = await courses.insertOne(course);
        })

        // to get all the courses according to level and terms
        app.get('/get_courses/:lvt', async (req, res) => {
            const levelTerm = req.params.lvt;
            const cursor = courses.find({level_term: levelTerm});
            const result = await cursor.toArray();
            res.send(result)
        } )
        
        // to display all the routine
        app.get('/', async (req, res) => {
            const cursor = routine.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        // room reg
        app.post('/room', async (req, res) => {
            const room = req.body;
            const result = await room_info.insertOne(room);
        });

        // for getting all the registered courses
        app.get('/courses', async (req, res) => {
            const cursor = exam_reg.find({});
            const courses = await cursor.toArray();
            res.send(courses);
        });

        // getting courses according to date, exam type and slot
        app.get('/exams/:date/:type/:slot', async (req, res) => {
            const date = req.params.date;
            const type  = req.params.type;
            const slot = req.params.slot;
            const query = { 
                date: date,
                exam_type: type,
                slot: slot
             };
            const cursor = routine.find(query);
            const data = await cursor.toArray();
            res.send(data);
        })

        // for getting number of students on a specific date for a specific course
        app.get('/students/:course', async (req, res) => {
            const course_code = req.params.course;
            const query = {course: course_code };
            const cursor = exam_reg.find(query);
            const data = await cursor.toArray();
            res.send(data)
            
        })

        // get all the rooms
        app.get('/rooms', async (req, res) => {
            const cursor = room_info.find({});
            const result = await cursor.toArray()
            res.send(result);
        })
    }
    finally {

    }

}

run().catch(console.dir);

app.get('/levelterm', (req, res) => {
    res.send(levelTerm);
})

app.get('/teacher', (req, res) => {
    res.send(teacher);
})

app.listen(port);