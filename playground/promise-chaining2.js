require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndRemove("61fbc25088a5b94d30283ab5")
//     .then((result) => {
//         console.log(result);
//         return Task.countDocuments({ completed: false });
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((e) => {
//         console.log(e);
//     });

const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndRemove(id);
    const count = await Task.countDocuments({ completed });
    return { count, task };
};

deleteTaskAndCount("61fb9a9e416a812dd400fe00", false)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log("something went wrong...");
    });
