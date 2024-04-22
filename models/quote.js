const mongoose = require("mongoose");

// Define the Schema
const QuoteSchema = new mongoose.Schema(
    {
        FirstName: {
            type:String,
            required:true
        },
        LastName:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true
        },
        Phone: {
            type:Number,
            required: true 
        },
        WhatServiceDoYouRequire: {
            type: String,
            required: true
        },
        Descriptionofcargo: {
            type: String,
            required:true
        }
    }
)

// Create a model from the schema
const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;