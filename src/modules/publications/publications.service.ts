import { Inject, Injectable } from '@nestjs/common';
import { Publication } from './entities/publication.entity';

@Injectable()
export class PublicationsService {
  constructor(
    @Inject('PUBLICATIONS_REPOSITORY')
    private publicationsRepository: typeof Publication
  ) {}

  async findAll(): Promise<Publication[]> {
    return this.publicationsRepository.findAll();
  }

  async findAllByUserId(creatorId: string): Promise<Publication[]> {
    return this.publicationsRepository.findAll({ where: { creatorId } });
  }

  async findById(id: number): Promise<Publication | null> {
    return this.publicationsRepository.findByPk(id);
  }

  async create(description: string, images: string[], creatorId: string): Promise<Publication> {
    return this.publicationsRepository.create({ description, images, creatorId });
  }

  async delete(id: number, creatorId: string): Promise<void> {
    await this.publicationsRepository.destroy({ where: { id, creatorId } });
  }
}
