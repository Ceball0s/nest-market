import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}

  async crear(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = new this.usuarioModel(createUsuarioDto);
    return nuevoUsuario.save();
  }

  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async obtenerPorId(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async eliminar(id: string): Promise<void> {
    const usuario = await this.usuarioModel.findByIdAndDelete(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
  }
}
