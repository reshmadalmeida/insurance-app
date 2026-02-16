// models/audit-log.model.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ENTITY_TYPES = ["POLICY", "CLAIM", "TREATY", "USER"];
const ACTIONS = ["CREATE", "UPDATE", "DELETE", "APPROVE"];

const AuditLogSchema = new Schema({
    _id: ObjectId,
    entityType: {
      type: String,
      enum: ENTITY_TYPES,
      required: true,
      index: true
    },

    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },

    action: {
      type: String,
      enum: ACTIONS,
      required: true,
      index: true
    },

    oldValue: {
      type: Schema.Types.Mixed // store previous snapshot (or key diffs)
    },

    newValue: {
      type: Schema.Types.Mixed // store new snapshot (or key diffs)
    },

    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    performedAt: {
      type: Date,
      default: Date.now,
      index: true
    },

    ipAddress: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Query accelerators for auditing
AuditLogSchema.index({ entityType: 1, entityId: 1, performedAt: -1 });

module.exports = model('AuditLog', AuditLogSchema);