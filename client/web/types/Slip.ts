export interface Slip {
  items: any;
  uuid: string;
  laundry: { name: string; slug: string };
  status: number;
  total_items: number;
  date: Date;
}

// .d.ts files are for putting things in the global scope
