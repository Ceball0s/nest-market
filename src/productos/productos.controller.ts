import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from './schemas/producto.schema';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async listarTodos(): Promise<Producto[]> {
    return this.productosService.listarTodos();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<Producto> {
    const producto = await this.productosService.buscarPorId(id);
    if (!producto) {
      throw new NotFoundException(`Producto with ID ${id} not found`);
    }
    return producto;
  }

  @Post()
  async crear(@Body() producto: Producto): Promise<Producto> {
    return this.productosService.crear(producto);
  }

  @Put(':id')
  async editar(@Param('id') id: string, @Body() producto: Producto): Promise<Producto> {
    const updatedProducto = await this.productosService.editar(id, producto);
    if (!updatedProducto) {
      throw new NotFoundException(`Producto with ID ${id} not found`);
    }
    return updatedProducto;
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string): Promise<any> {
    return this.productosService.eliminar(id);
  }
}