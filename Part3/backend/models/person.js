const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personShema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    requred: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Regular expression to validate the phone number format
        return /^\d{2,3}-\d{5,}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});
personShema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Person", personShema);
