import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schemas/producto.schema';

@Injectable()
export class ProductosService {
  constructor(@InjectModel('Producto') private productoModel: Model<Producto>) {}

  async listarTodos(): Promise<Producto[]> {
    return this.productoModel.find().exec();
  }

  async buscarPorId(id: string): Promise<Producto | null> {
    return this.productoModel.findById(id).exec();
  }

  async crear(producto: Producto): Promise<Producto> {
    const nuevoProducto = new this.productoModel(producto);
    return nuevoProducto.save();
  }

  async editar(id: string, producto: Producto): Promise<Producto | null> {
    return this.productoModel.findByIdAndUpdate(id, producto, { new: true }).exec();
  }

  async eliminar(id: string): Promise<any> {
    return this.productoModel.findByIdAndDelete(id).exec();
  }
}