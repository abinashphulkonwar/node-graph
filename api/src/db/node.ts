import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

interface data {
  time: number;
  blocks: { id: string; type: string; data: object }[];
  version: string;
}

export interface Attrs {
  id?: string;
  _id?: string;
  userId: string;
  title: string;
  description: string;
  data: data;
  connected__to: string[];
  connected__from: string[];
  group: string;
  type: string;
  version: Attrs[];
  position: {
    x: number;
    y: number;
  };
}

interface UserModule extends mongoose.Model<Nodeinterface> {
  build(attrs: Attrs): Nodeinterface;
}

export interface nodeInterface extends mongoose.Document {
  id: string;
  _id?: string;
  userId: string;
  title: string;
  description: string;
  data: data;
  connected_to: string[];
  connected_from: string[];
  group: string[];
  type: string;

  position: {
    x: number;
    y: number;
  };
}

export interface Nodeinterface extends nodeInterface {
  change_tree: {
    createdAt: Date;
    data: Nodeinterface;
  }[];
}

const Scheam = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      index: 1,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["node", "group", "unit", "collection"],
    },
    data: {
      time: {
        type: Number,
        default: new Date().getTime(),
      },
      blocks: [],
      version: {
        type: String,
        default: "1.0.0",
      },
    },
    connected_to: [
      {
        type: Types.ObjectId,
        ref: "node",
      },
    ],
    connected_from: [
      {
        type: Types.ObjectId,
        ref: "node",
      },
    ],
    group: [
      {
        type: Types.ObjectId,
        ref: "node-group",
      },
    ],
    position: {
      x: {
        type: Number,
        default: 0,
      },
      y: {
        type: Number,
        default: 0,
      },
    },

    change_tree: [
      {
        createdAt: {
          type: Date,
          default: new Date(),
        },
        data: {},
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

Scheam.statics.build = (attrs: Attrs) => {
  return new Nodedb(attrs);
};

const Nodedb = mongoose.model<Nodeinterface, UserModule>("node", Scheam);

export { Nodedb };
