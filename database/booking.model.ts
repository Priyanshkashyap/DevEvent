import { Schema, model, models, Document, Types, CallbackError } from 'mongoose';
import Event from './event.model';

/**
 * TypeScript interface for Booking document
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true, // Index for faster queries
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          // RFC 5322 compliant email regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to validate that the referenced event exists
 * Prevents orphaned bookings by checking event existence before saving
 */
BookingSchema.pre('save', async function () {
  // Only validate eventId if it's new or modified
  if (this.isNew || this.isModified('eventId')) {
    const eventExists = await Event.exists({ _id: this.eventId });
    
    if (!eventExists) {
      throw new Error(`Event with ID ${this.eventId} does not exist`);
    }
  }
});

/**
 * Use existing model if already compiled (prevents Next.js hot reload issues)
 * Otherwise create new model
 */
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
