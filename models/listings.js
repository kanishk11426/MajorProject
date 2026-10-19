const mongoose = require("mongoose");
const Review = require("./review.js");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    url: {
      type: String,
      filename: String,
    }
  },

  price: {
    type: Number,
    required: true,
    min: 1,
  },

  location: {
    type: String,
    required: true,
    trim: true,
  },

  country: {
    type: String,
    // required: true,
    trim: true,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
    },
  },

});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;