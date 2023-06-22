const room = {
  room: {
    _id: "641ec0dbbe0292036b525f53",
    room_no: "221",
    no__of_coloum: "5",
    total: 0,
    coloum_1: "8",
    coloum_2: "8",
    coloum_3: "7",
    coloum_4: "9",
    coloum_5: "8",
  },
  course: ["cse-210", "cse-310"],
  student: [27, 13]
};

const seperate_coloums = (room) => {
  const room_coloums = [];
  const room_coloums_keys = [];

  for (let i in room.room) {
    if (i.includes("coloum_")) {
      const coloumNumber = i.replace("coloum_", ""); // extract the column number
      room_coloums_keys.push(i);
      const obj = {}; // create an empty object to store the column value
      obj[i] = parseInt(room.room[i]); // set the key-value pair in the object
      room_coloums[coloumNumber - 1] = obj; // add the object to the appropriate index in the array
    }
  }

  return [room_coloums, room_coloums_keys];
};

const seat_distribution = (room, room_coloums, room_coloums_keys) => {
  const seat_plan = [];

  for (i in room_coloums) {
    let coloum_total = room_coloums[i][room_coloums_keys[i]];
    const plan = {
      coloum: parseInt(i) + 1,
      course: [],
      student: [],
    };

    if (i % 2 == 0) {
      const course = room.course[0];
      let student_total = room.student[0];
      if (student_total > 0) {
        if (student_total > coloum_total) {
          student_total -= coloum_total;
          room_coloums[i][room_coloums_keys[i]] = 0
          room.student[0] = student_total;
          plan.student.push(coloum_total);
          plan.course.push(course);
        } else {
          coloum_total -= student_total;
          room_coloums[i][room_coloums_keys[i]] = coloum_total
          plan.student.push(student_total);
          room.student[0] = 0;
        }
        seat_plan.push(plan);
      }
    } else {
      const course = room.course[1];
      let student_total = room.student[1];
      if (student_total > 0) {
        if (student_total > coloum_total) {
          student_total -= coloum_total;
          room_coloums[i][room_coloums_keys[i]] = 0
          room.student[1] = student_total;
          plan.student.push(coloum_total);
          plan.course.push(course);
        } else {
          coloum_total -= student_total;
          room_coloums[i][room_coloums_keys[i]] = coloum_total
          plan.student.push(student_total);
          plan.course.push(course);
          room.student[1] = 0;
        }
      }

      

      seat_plan.push(plan);
    }
  }

  for(i in room.student){
    if(room.student[i] > 0){
      for(j in room_coloums){
        if(room_coloums[j][room_coloums_keys[j]] > 0){
          seat_plan[j].course.push(room.course[i]);
          seat_plan[j].student.push(room_coloums[j][room_coloums_keys[j]]);
          room_coloums[j][room_coloums_keys[j]] -= room.student[i];
          room.student[i] = 0
        }
      }
    }
  }

  // console.log(room_coloums)

  return seat_plan;
};

const [coloum, keys] = seperate_coloums(room);
const plan = seat_distribution(room, coloum, keys);

console.log(plan)

