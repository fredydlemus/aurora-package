import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

jest.mock('dotenv');
jest.mock('fs');

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should read the correct env file based on the NODE_ENV', () => {
    const envFilePath = '.env.test';
    process.env.NODE_ENV = 'test';
    (fs.readFileSync as jest.Mock).mockReturnValue('KEY=VALUE');
    (dotenv.parse as jest.Mock).mockReturnValue({ KEY: 'VALUE' });

    service = new ConfigService();

    expect(fs.readFileSync).toHaveBeenCalledWith(envFilePath);
    expect(service.get('KEY')).toBe('VALUE');
  });

  it('should return the correct value for a given key', () => {
    const envConfig = { KEY: 'VALUE' };
    (fs.readFileSync as jest.Mock).mockReturnValue('KEY=VALUE');
    (dotenv.parse as jest.Mock).mockReturnValue(envConfig);

    service = new ConfigService();

    expect(service.get('KEY')).toBe('VALUE');
  });

  it('should return undefined for a non-existing key', () => {
    const envConfig = { KEY: 'VALUE' };
    (fs.readFileSync as jest.Mock).mockReturnValue('KEY=VALUE');
    (dotenv.parse as jest.Mock).mockReturnValue(envConfig);

    service = new ConfigService();

    expect(service.get('NON_EXISTING')).toBeUndefined();
  });
});
