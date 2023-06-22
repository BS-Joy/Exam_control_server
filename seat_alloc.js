const room = {
    room: {
      _id: "641ec0dbbe0292036b525f53",
      room_no: "221",
      no__of_column: "5",
      total: 0,
      column_1: "8",
      column_2: "8",
      column_3: "7",
      column_4: "9",
      column_5: "8"
    },
    course: ["cse-210", "cse-310"],
    student: [27, 13]
  };
  
  const seperate_columns = (room) => {
    const room_columns = [];
    const room_columns_keys = [];
  
    for (let i in room.room) {
      if (i.includes("column_")) {
        const columnNumber = i.replace("column_", "");
        room_columns_keys.push(i);
        const obj = {};
        obj[i] = parseInt(room.room[i]);
        room_columns[columnNumber - 1] = obj;
      }
    }
  
    return [room_columns, room_columns_keys];
  };
  
  const [columns, keys] = seperate_columns(room);
  
  
  const seat_distribution = (room, columns, keys) => {
    const seat_plan = [];
    for (let i in room.student) {
      if (room.student[i] > 0) {
        const column_info = {
          course: room.course[i],
          column: [],
          students: [],
        };
  
        for (let j = parseInt(i); j < columns.length; j += 2) {
          if (columns[j][keys[j]] > 0) {
            if (room.student[i] > columns[j][keys[j]]) {
              room.student[i] -= columns[j][keys[j]];
              column_info.students.push(columns[j][keys[j]]);
              column_info.column.push(keys[j]);
              columns[j][keys[j]] = 0;
            } else {
              columns[j][keys[j]] -= room.student[i];
              column_info.column.push(keys[j]);
              column_info.students.push(room.student[i]);
              room.student[i] = 0;
            }
          }
        }
        seat_plan.push(column_info);
      }
    }
  
    for (let i in room.student) {
      if (room.student[i] > 0) {
        for (let j in columns) {
          if (columns[j][keys[j]] > 0) {
            if (columns[j][keys[j]] > room.student[i]) {
              seat_plan[i].column.push(keys[j]);
              seat_plan[i].students.push(room.student[i]);
              columns[j][keys[j]] -= room.student[i];
              room.student[i] = 0;
            } else {
              seat_plan[i].column.push(keys[j]);
              seat_plan[i].students.push(columns[j][keys[j]]);
              room.student[i] -= columns[j][keys[j]];
              columns[j][keys[j]] = 0
            }
          }
        }
      }
    }
  
    for(let i in seat_plan){
      const students_length = seat_plan[i].students.length;
      if(seat_plan[i].students[students_length - 1] === 0){
        seat_plan[i].column.pop();
        seat_plan[i].students.pop()
      }
    }
  
    return seat_plan;
  };
  
  
  const seat_plan = (columns, keys, plans) => {
    const final_seat_plan = []
    for(let i in columns){
      const plan = {
        column:parseInt(i)+1,
        courses: [],
        students: []
      }
      for(let j in plans){
        for(let c in plans[j].column){
          if(plans[j].column[c] === keys[i]){
            plan.courses.push(plans[j].course);
            plan.students.push(plans[j].students[c])
          }
        }
      }
      final_seat_plan.push(plan);
    }
    return final_seat_plan;
  }
  
  const plan = seat_distribution(room, columns, keys);
  const final_seat_plan = seat_plan(columns, keys, plan);
  
  console.log(final_seat_plan);