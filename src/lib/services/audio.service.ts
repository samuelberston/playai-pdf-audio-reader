'use server';

import prisma from '@/prisma/index';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { AudioRecord, AudioPlayerObject } from '@/types';

// Generate audio from a PDF page
export async function generateAudio() {}

// Upload audio to the server
export async function uploadAudio() {}

// Get audio from the server
export async function getAudio() {}
