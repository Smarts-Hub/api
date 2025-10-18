import { Schema, model, Document } from "mongoose";

export interface IPaste extends Document {
  title?: string;              // Optional title
  description?: string;        // Description
  content: string;             // Content
  language?: string;           // Syntax Higlight Language
  isPrivate: boolean;          // Private (requires password) or public
  password?: string;           // Password for private
  views: number;               // View counter
  createdAt: Date;             // Creation date
  expireAt?: Date;             // Expiration date
  slug: string;                // Paste slug
}

const PasteSchema = new Schema<IPaste>(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    content: { type: String, required: true },
    language: { type: String, default: "text" },
    isPrivate: { type: Boolean, default: false },
    password: { type: String },
    views: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true },
    expireAt: { 
      type: Date, 
      default: () => new Date(Date.now() + 30 * 60 * 1000) // 30 min
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

PasteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const Paste = model<IPaste>("Paste", PasteSchema);

