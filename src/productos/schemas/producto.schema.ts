import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ default: true })
  disponible: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
