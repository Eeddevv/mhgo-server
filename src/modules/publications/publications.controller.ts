import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { Publication } from './entities/publication.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get('all')
  findAll(): Promise<Publication[]> {
    return this.publicationsService.findAll();
  }

  @Get(':creatorId')
  findAllByUserId(@Param('creatorId') creatorId: string): Promise<Publication[]> {
    return this.publicationsService.findAllByUserId(creatorId);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Publication | null> {
    return this.publicationsService.findById(id);
  }
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() publicationData: { description: string; images: string[] }, @Req() req: any): Promise<Publication> {
    const { description, images } = publicationData;
    const creatorId = req.user.userId;
    return this.publicationsService.create(description, images, creatorId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @Req() req: any): Promise<void> {
    const creatorId = req.user.userId;
    return this.publicationsService.delete(id, creatorId);
  }
}
