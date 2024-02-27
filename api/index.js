// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// const jwt = require('jsonwebtoken');

// mongoose
//   .connect('mongodb+srv://anshidkt:9526624193@cluster0.hytzs4h.mongodb.net/', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('connected to mongodb');
//   })
//   .catch(err => {
//     console.log('error connected to mongodb');
//   });

// app.listen(port, () => {
//   console.log('server is running on port 3000');
// });

// const User = require('./models/User');
// const CartProduct = require('./models/CartProduct');

// const sendVerificationEmail = async (email, verificationToken) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'anshidkt@gmail.com',
//       pass: '11111111',
//     },
//   });

//   const mailOptions = {
//     from: 'amazon.com',
//     to: email,
//     subject: 'Email Verification',
//     text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.log('error sending verification email', error);
//   }
// };

// // Register the name,email,password to database
// app.post('/register', async (req, res) => {
//   try {
//     const {name, email, password} = req.body;
//     const existingUser = await User.findOne({email});
//     if (existingUser) {
//       return res.status(400).json({message: 'Email already registered'});
//     }

//     const hashedPassword = await bcrypt.hash(password, 8);

//     const newUser = new User({name, email, password: hashedPassword});
//     newUser.verificationToken = crypto.randomBytes(20).toString('hex');
//     await newUser.save();
//     await sendVerificationEmail(newUser.email, newUser.verificationToken);
//     res.status(200).json({message: 'Registration successful'});
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(500).json({message: 'Registration failed'});
//   }
// });

// // get the name and email from database
// app.get('/api/userDetails/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     const userDetails = {
//       name: user.name,
//       email: user.email,
//     };

//     res.status(200).json(userDetails);
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({message: 'Failed to fetch user details'});
//   }
// });

// app.get('/verify/:token', async (req, res) => {
//   try {
//     const token = req.params.token;
//     const user = await User.findOne({verificationToken: token});

//     if (!user) {
//       return res.status(404).json({message: 'Invalid verification token '});
//     }

//     user.verified = true;
//     user.verificationToken = undefined;

//     await user.save();

//     res.status(200).json({message: 'email verified successfully'});
//   } catch (error) {
//     res.status(500).json({message: 'email verification failed'});
//   }
// });

// const generateSecretKey = () => {
//   const secretKey = crypto.randomBytes(32).toString('hex');
//   return secretKey;
// };

// const secretKey = generateSecretKey();

// app.post('/login', async (req, res) => {
//   try {
//     const {email, password} = req.body;
//     const user = await User.findOne({email});
//     if (!user) {
//       return res.status(404).json({message: 'Invalid email or password'});
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(404).json({message: 'Invalid password'});
//     }

//     const token = jwt.sign({id: user._id}, secretKey);
//     res.status(200).json({token});
//   } catch (error) {
//     res.status(500).json({message: 'Login failed'});
//   }
// });

// app.post('/addresses', async (req, res) => {
//   try {
//     const {userId, address} = req.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     user.addresses.push(address);
//     await user.save();

//     res.status(200).json({message: 'Address stored successfully'});
//   } catch (error) {
//     res.status(500).json({message: 'Failed to store address'});
//   }
// });

// app.put('/addresses/:id', async (req, res) => {
//   try {
//     console.log('Request received to update address:', req.params.id, req.body);
//     console.log('Address updated successfully');
//     res.status(200).json({message: 'Address updated successfully'});
//   } catch (error) {
//     console.error('Failed to update address:', error);
//     res.status(500).json({message: 'Failed to update address'});
//   }
// });

// app.delete('/addresses/:userId/:itemId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const itemId = req.params.itemId;
//     const user = await User.findById(userId);

//     user.addresses.pull(itemId);
//     await user.save();

//     res.status(200).json({message: 'Address removed successfully'});
//   } catch (error) {
//     console.error('Error removing address:', error.message);
//     res
//       .status(500)
//       .json({message: 'Failed to remove address', error: error.message});
//   }
// });

// app.get('/addresses/:userId', async (req, res) => {
//   try {
//     const {userId} = req.params;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     const addresses = user.addresses;
//     res.status(200).json(addresses);
//   } catch (error) {
//     console.error('Error fetching addresses:', error);
//     res.status(500).json({message: 'Failed to fetch addresses'});
//   }
// });

// //Cart items add in database

// app.post('/purchase', async (req, res) => {
//   try {
//     const {userId, productDetails} = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     user.productdetails.push({cartItems: productDetails});
//     await user.save();
//     res.status(200).json({message: 'cartItems stored successfully'});
//   } catch (error) {
//     res.status(500).json({message: 'Failed to store cartItems'});
//   }
// });

// //Cart items get from database

// app.get('/purchased/:userId', async (req, res) => {
//   try {
//     const {userId} = req.params;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     // Extract and return only the cartItems array
//     const cartItems = user.productdetails.map(item => item.cartItems).flat();
//     res.status(200).json(cartItems);
//   } catch (error) {
//     console.error('Error fetching purchased items:', error);
//     res.status(500).json({message: 'Failed to fetch purchased items'});
//   }
// });

// // Express route for deleting an item from the cart
// app.delete('/removeFromCart/:userId/:itemId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const itemId = req.params.itemId;
//     const user = await User.findById(userId);

//     // Find the productdetails item containing the cartItems array
//     const productDetailsItem = user.productdetails.find(item =>
//       item.cartItems.some(cartItem => cartItem._id.toString() === itemId),
//     );

//     // If the productDetailsItem is found, remove the cart item by its _id
//     if (productDetailsItem) {
//       productDetailsItem.cartItems = productDetailsItem.cartItems.filter(
//         cartItem => cartItem._id.toString() !== itemId,
//       );
//       await user.save();
//       res
//         .status(200)
//         .json({message: 'Item removed from the cart successfully'});
//     } else {
//       res.status(404).json({message: 'Item not found in the cart'});
//     }
//   } catch (error) {
//     console.error('Error removing item from the cart:', error);
//     res.status(500).json({message: 'Internal Server Error'});
//   }
// });

// // //Add to BuyNow

// //  app.post('/buyNow', async (req, res) => {
// //    try {
// //      console.log('Buy Now request received:', req.body);
// //      const userId = req.body.userId;
// //      const productDetails = req.body.productDetails;

// //     //  Ensure the provided user ID matches the user's ID from the server
// //      const user = await User.findById(userId);
// //      if (!user) {
// //        return res.status(404).json({message: 'User not found'});
// //      }

// //     //  Add the item to the "buyNow" array
// //      user.productdetails.push({buyNow: productDetails});
// //      await user.save();

// //      // Sending a response
// //      console.log('Buy Now request processed successfully');
// //      res.status(200).json({message: 'Item added to Buy Now'});
// //    } catch (error) {
// //      console.error('Error adding item to Buy Now:', error);
// //      res
// //        .status(500)
// //        .json({message: 'Internal Server Error', error: error.message});
// //    }
// //  });

// // // BuyNow GET

// // app.get('/getBuyNowItems/:userId', async (req, res) => {
// //   try {
// //     const userId = req.params.userId;

// //     // Ensure the provided user ID exists
// //     const user = await User.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     // Retrieve the "buyNow" array from the user's document
// //     const buyNowItems = user.productdetails.filter(item => item.buyNow);

// //     // Sending the "buyNow" items as the response
// //     res.status(200).json({ buyNowItems });
// //   } catch (error) {
// //     console.error('Error retrieving Buy Now items:', error);
// //     res.status(500).json({ message: 'Internal Server Error', error: error.message });
// //   }
// // });

// app.post('/addFavorite/:userId', async (req, res) => {
//   try {
//     const {userId} = req.params;
//     const {productId, title, image, price} = req.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }
//     const isProductInFavorites = user.favourites.some(
//       fav => fav.productId === productId,
//     );
//     if (isProductInFavorites) {
//       return res.status(400).json({message: 'Product already in favorites'});
//     }
//     user.favourites.push({productId, title, image, price});
//     await user.save();
//     res.status(200).json({message: 'Product added to favorites'});
//   } catch (error) {
//     console.error('Error adding to favorites:', error);
//     res.status(500).json({message: 'Failed to add to favorites'});
//   }
// });

// app.get('/getFavorites/:userId', async (req, res) => {
//   console.log('GET /getFavorites/:userId', req.params.userId);
//   try {
//     const {userId} = req.params;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     const favorites = user.favourites;
//     console.log('Favorites:', favorites);
//     res.status(200).json(favorites);
//   } catch (error) {
//     console.error('Error fetching favorites:', error);
//     res
//       .status(500)
//       .json({message: 'Failed to fetch favorites', error: error.message});
//   }
// });

// // Remove a product from favorites
// app.delete('/removeFavorite/:userId/:productId', async (req, res) => {
//   try {
//     const {userId, productId} = req.params;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }
//     user.favourites = user.favourites.filter(
//       fav => fav.productId !== productId,
//     );
//     await user.save();
//     res.status(200).json({message: 'Product removed from favorites'});
//   } catch (error) {
//     console.error('Error removing from favorites:', error);
//     res.status(500).json({message: 'Failed to remove from favorites'});
//   }
// });

// //Order All Datas

// app.post('/confirmOrder', async (req, res) => {
//   try {
//     const {userId, address, cartItems, paymentMethod} = req.body;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     const newOrder = {
//       address,
//       cartItems,
//       paymentMethod,
//     };

//     user.orderDetails = user.orderDetails || [];
//     user.orderDetails.push(newOrder);

//     await user.save();

//     res
//       .status(200)
//       .json({message: 'Order confirmed and stored in the database'});
//   } catch (error) {
//     console.error('Error confirming order:', error);
//     res.status(500).json({message: 'Failed to confirm the order'});
//   }
// });

// app.get('/orderDetails/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId);

//     if (!user) {
//       return;
//       res.status(404).json({message: 'User not found'});
//     }
//     const orderDetails = user.orderDetails || [];

//     res.status(200).json(orderDetails);
//   } catch (error) {
//     console.error('Error fetching order details:', error);
//     res.status(500).json({message: 'Failed to fetch order details'});
//   }
// });
