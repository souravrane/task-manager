require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("61fbbd9ca50e0d3d78e3d0cd", { age: 1 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 1 });
//     })
//     .then((count) => {
//         console.log("the count of users with age 1 is : ", count);
//     })
//     .catch((e) => {
//         console.log(e);
//     });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {
        age,
    });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount("61fbbd9ca50e0d3d78e3d0cd", 43)
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    });
