// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   verified: {
//     type: Boolean,
//     default: false,
//   },
//   verificationToken: String,

//   addresses: [
//     {
//       name: String,
//       mobileNo: String,
//       houseNo: String,
//       street: String,
//       landmark: String,
//       city: String,
//       country: String,
//       postalCode: String,
//     },
//   ],

//   productdetails: [
//     {
//       cartItems: [
//         {
//           productId: String,
//           quantity: Number,
//           size: String,
//           title: String,
//           image: String,
//           price: String,
//         },
//       ],
//     },
//   ],

//   favourites: [
//     {
//       productId: String,
//       title: String,
//       image: String,
//       price: String,
//     },
//   ],

//   orderDetails: [
//     {
//       address: [
//         {
//           name: String,
//           mobileNo: String,
//           houseNo: String,
//           street: String,
//           landmark: String,
//           city: String,
//           country: String,
//           postalCode: String,
//         },
//       ],
//       cartItems: [
//         {
//           productId: String,
//           quantity: Number,
//           size: String,
//           title: String,
//           image: String,
//           price: String,
//         },
//       ],
//       paymentMethod: Number,
//     },
//   ],

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
