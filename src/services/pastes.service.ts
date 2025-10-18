import { Paste, IPaste } from "../models/pastes.model.js";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

export const createPaste = async (data: Partial<IPaste>) => {
  const slug = nanoid(8);


  let expireAt = data.expireAt;
  if (!expireAt) {
    expireAt = new Date(Date.now() + 30 * 60 * 1000); // 30 min
  }

  let passwordHash: string | undefined;
  if (data.password) {
    passwordHash = await bcrypt.hash(data.password, 10);
  }

  const paste = new Paste({
    ...data,
    slug,
    expireAt,
    password: passwordHash,
    views: 0
  });

  return await paste.save();
};

export const getPasteBySlug = async (slug: string) => {
  const paste = await Paste.findOne({ slug });
  if (!paste) throw new Error("Paste not found");
  return paste;
};

export const incrementViews = async (slug: string) => {
  return await Paste.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } },
    { new: true }
  );
};

export const deletePasteBySlug = async (slug: string) => {
  return await Paste.findOneAndDelete({ slug });
};

export const getPasteSummaryBySlug = async (slug: string) => {
  return await Paste.findOne(
    { slug },
    {
      content: 0,   
      language: 0   
    }
  );
};

export const countPastes = async () => {
  return await Paste.countDocuments();
}
