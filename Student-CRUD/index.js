import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());

const dbPath = path.resolve("db.json");

const readData = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.get("/students", (req, res) => {
  const data = readData();
  res.status(200).json(data.students);
});

app.post("/students", (req, res) => {
  const { name, course, year } = req.body || {};

  if (!name || !course || !year) {
    return res.status(400).json({
      message: "All fields (name, course, year) are required"
    });
  }

  const data = readData();

  const newStudent = {
    id: data.students.length > 0
      ? data.students[data.students.length - 1].id + 1
      : 1,
    name,
    course,
    year
  };

  data.students.push(newStudent);
  writeData(data);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

app.put("/students", (req, res) => {
  const { id, name, course, year } = req.body || {};

  const data = readData();
  const student = data.students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  if (name) student.name = name;
  if (course) student.course = course;
  if (year) student.year = year;

  writeData(data);

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const data = readData();
  const index = data.students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = data.students.splice(index, 1);
  writeData(data);

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
