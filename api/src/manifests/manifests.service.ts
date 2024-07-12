import { Injectable } from '@nestjs/common';
import { CreateManifestsDto } from './dto/create-manifests.dto';
import { UpdateManifestsDto } from './dto/update-manifests.dto';
import { PrismaService } from '../prisma.service';
import { ImagesService } from 'src/images/images.service';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class ManifestsService {
  constructor(private prisma: PrismaService) {}

  async create(createManifestsDto: CreateManifestsDto) {
    return new Promise(async (resolve, reject) => {
      const check_duplicate = await this.prisma.manifests.findMany({ where: { title: createManifestsDto.title } });
      if (check_duplicate.length > 0) {
        reject({ response: { data: { message: 'duplicate manifest name' } } });
      }
      resolve(this.prisma.manifests.create({ data: createManifestsDto }));
    });
  }

  async findAll() {
    return this.prisma.manifests.findMany();
  }

  async findOne(id: string) {
    return this.prisma.manifests.findUnique({ where: { id: id } });
  }

  async findOneByName(name: string) {
    return new Promise(async (resolve, reject) => {
      const check_duplicate = await this.prisma.manifests.findMany({ where: { title: name } });
      if (check_duplicate.length !== 1) {
        reject({ response: { data: { message: 'invalid manifest name' } } });
      }
      resolve({
        status: 200,
        message: '',
        results: check_duplicate[0],
      });
    });
  }

  async findTags(name: string) {
    return new Promise(async (resolve, reject) => {
      const manifest = await this.prisma.manifests.findMany({ where: { title: name } });
      if (manifest.length !== 1) {
        reject({ response: { data: { message: 'invalid manifest name' } } }); return false;
      }
      const image = JSON.parse(manifest[0].structure).image;

      const HelperServ = new HelperService();
      const ImagesServ = new ImagesService(HelperServ);
      const allImages: any = await ImagesServ.findAll();
      const currentImage = allImages.filter(x=> x.Name === image)
      if (currentImage.length !== 1) {
        reject({ response: { data: { message: 'invalid manifest tags' } } }); return false;
      }
      const result = currentImage[0].Versions.map(x => x.Version)
      resolve({status: 200, message: '', results: result});
    });
  }

  async update(id: string, updateManifestsDto: UpdateManifestsDto) {
    return this.prisma.manifests.update({ where: { id: id }, data: updateManifestsDto });
  }

  async remove(id: string) {
    return this.prisma.manifests.delete({ where: { id: id } });
  }
}
