export class Entries {
  _id: number;
  name: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  constructor() {
    this.name = '';
    this.desc = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
