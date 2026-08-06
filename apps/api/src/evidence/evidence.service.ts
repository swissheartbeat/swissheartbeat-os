import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { UpdateEvidenceDto } from './dto/update-evidence.dto';

import { ProviderManager } from './providers/provider.manager';
import { EvidenceResult } from './providers/provider.interface';

@Injectable()
export class EvidenceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly providerManager: ProviderManager,
  ) {}

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

    console.log('===================================');
    console.log(`🔎 Suche Evidence für: ${signal.title}`);

    const providers = this.providerManager.getProviders();

    const allEvidence: EvidenceResult[] = [];

    for (const provider of providers) {
      console.log(`🔎 Durchsuche ${provider.name}...`);

      const results = await provider.search(signal.title);

      console.log(`✅ ${provider.name}: ${results.length} Treffer`);

      for (const item of results) {
        const existing = await this.prisma.evidence.findFirst({
          where: {
            signalId,
            url: item.url,
          },
        });

        if (!existing) {
          await this.prisma.evidence.create({
            data: {
              signalId,
              source: item.source,
              url: item.url,
              headline: item.headline,
              summary: item.summary,
              publishedAt: item.publishedAt ?? null,
              credibility: item.credibility ?? 50,
            },
          });

          console.log(`💾 Evidence gespeichert: ${item.source}`);
        } else {
          console.log(`⏭️ Evidence bereits vorhanden: ${item.source}`);
        }

        allEvidence.push(item);
      }
    }

    console.log(`📚 Insgesamt ${allEvidence.length} Evidence gefunden.`);

    return {
      signal,
      evidenceFound: allEvidence.length,
      sources: providers.map((provider) => provider.name),
      evidence: allEvidence,
    };
  }
}