import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { UpdateEvidenceDto } from './dto/update-evidence.dto';

@Injectable()
export class EvidenceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEvidenceDto: CreateEvidenceDto) {
    return this.prisma.evidence.create({
      data: {
        signalId: createEvidenceDto.signalId,
        source: createEvidenceDto.source,
        url: createEvidenceDto.url,
        headline: createEvidenceDto.headline,
        summary: createEvidenceDto.summary,
        publishedAt: createEvidenceDto.publishedAt,
        credibility: createEvidenceDto.credibility,
      },
    });
  }

  async findAll() {
    return this.prisma.evidence.findMany({
      include: {
        signal: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.evidence.findUnique({
      where: {
        id,
      },
      include: {
        signal: true,
      },
    });
  }

  async update(id: string, updateEvidenceDto: UpdateEvidenceDto) {
    return this.prisma.evidence.update({
      where: {
        id,
      },
      data: updateEvidenceDto,
    });
  }

  async remove(id: string) {
    return this.prisma.evidence.delete({
      where: {
        id,
      },
    });
  }
  async collectEvidence(signalId: string) {
  const signal = await this.prisma.signal.findUnique({
    where: {
      id: signalId,
    },
  });

  if (!signal) {
    throw new Error('Signal not found');
  }

  console.log(`🔎 Suche Evidence für: ${signal.title}`);

  // Platzhalter
  // Hier suchen wir später bei:
  // Reuters
  // Swissinfo
  // NZZ
  // Google News
  // Bing News
  // usw.

  return {
    signal,
    evidenceFound: 0,
    sources: [],
  };
}
}