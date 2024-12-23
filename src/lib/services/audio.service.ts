'use server';

import prisma from '@/prisma/index';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { AudioRecord, AudioPlayerObject } from '@/types';