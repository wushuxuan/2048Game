'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for task object.
 */
let TaskSchema = new Schema({
    score: {
      type: Number,
    },
    createdDate: {
      type: Date,
      default: Date.now
    },
    creator: {
      type: String,
      required: 'creator is missing'
    },
    creatorUser: {
      type: String,
      required: 'creatorUser is missing'
    },
},
{
    versionKey: false,
    timestamps: { createdAt: 'createdDate',}
});
// Duplicate the id field as mongoose returns _id field instead of id.
TaskSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TaskSchema.set('toJSON', {
    virtuals: true,
    transform: function (_, ret) {
      delete ret._id;
  }
});

module.exports = mongoose.model('task', TaskSchema);