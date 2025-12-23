import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // ignore if it already exists or cannot be created
  }
}

type JsonValue = any;

async function readJsonFile<T extends JsonValue>(fileName: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T extends JsonValue>(fileName: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export type DiscountConfig = {
  percentage: number;
  days: number;
  hours: number;
  minutes: number;
};

export async function getDiscountConfig(): Promise<DiscountConfig> {
  return readJsonFile<DiscountConfig>('discount.json', {
    percentage: 50,
    days: 2,
    hours: 14,
    minutes: 32,
  });
}

export async function saveDiscountConfig(config: DiscountConfig): Promise<void> {
  await writeJsonFile('discount.json', config);
}

export type GalleryImage = {
  id: string;
  url: string;
  alt?: string;
};

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return readJsonFile<GalleryImage[]>('gallery.json', []);
}

export async function saveGalleryImages(images: GalleryImage[]): Promise<void> {
  await writeJsonFile('gallery.json', images);
}

export type Trainer = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
};

export async function getTrainers(): Promise<Trainer[]> {
  return readJsonFile<Trainer[]>('trainers.json', []);
}

export async function saveTrainers(trainers: Trainer[]): Promise<void> {
  await writeJsonFile('trainers.json', trainers);
}

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'joined';
};

export async function getLeads(): Promise<Lead[]> {
  return readJsonFile<Lead[]>('leads.json', []);
}

export async function saveLeads(leads: Lead[]): Promise<void> {
  await writeJsonFile('leads.json', leads);
}

export type Package = {
  id: string;
  name: string;
  price: string;
  type: 'membership' | 'personal-training';
  description?: string;
  note?: string;
  order: number;
};

export async function getPackages(): Promise<Package[]> {
  return readJsonFile<Package[]>('packages.json', [
    {
      id: '1',
      name: 'Monthly',
      price: '₹1,500',
      type: 'membership',
      order: 1,
      description: '',
      note: '',
    },
    {
      id: '2',
      name: '3 Months',
      price: '₹3,500',
      type: 'membership',
      order: 2,
      description: '',
      note: '',
    },
    {
      id: '3',
      name: '6 Months',
      price: '₹6,999',
      type: 'membership',
      order: 3,
      description: '',
      note: '',
    },
    {
      id: '4',
      name: '12 Months',
      price: '₹13,999',
      type: 'membership',
      order: 4,
      description: '',
      note: '',
    },
    {
      id: '5',
      name: 'One-on-One Coaching',
      price: 'Customized programs for faster, focused results',
      type: 'personal-training',
      note: 'Pricing on consultation',
      order: 5,
    },
  ]);
}

export async function savePackages(packages: Package[]): Promise<void> {
  await writeJsonFile('packages.json', packages);
}


