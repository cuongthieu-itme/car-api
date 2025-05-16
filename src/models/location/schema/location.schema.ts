import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  address: string;

  @Prop({ type: String, trim: true })
  city: string;
}
export const LocationSchema = SchemaFactory.createForClass(Location);
