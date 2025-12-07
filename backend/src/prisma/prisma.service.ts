import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit {
  [key: string]: any;

  // declare model delegates so TypeScript code referencing them compiles
  author: any;
  book: any;
  user: any;
  borrowRecord: any;

  private _client: any;

  async onModuleInit() {
    // create runtime Prisma client from the generated JS inside node_modules
    // prefer the compiled JS at node_modules/@prisma/client/.prisma/client/js_out/client.js
    // fall back to the package entry if needed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    let PrismaClientRuntime: any;
    try {
      const runtimePath = path.join(process.cwd(), 'node_modules', '@prisma', 'client', '.prisma', 'client', 'js_out', 'client.js');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const runtimeModule = require(runtimePath);
      PrismaClientRuntime = runtimeModule.PrismaClient ?? runtimeModule.default ?? runtimeModule;
    } catch (e) {
      // fallback to require('@prisma/client') entry
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pkg = require('@prisma/client');
      PrismaClientRuntime = pkg.PrismaClient ?? pkg.default ?? pkg;
    }
    this._client = new PrismaClientRuntime({});
    await this._client.$connect();
    // copy runtime properties (models and methods) onto this service instance
    Object.assign(this, this._client);
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
