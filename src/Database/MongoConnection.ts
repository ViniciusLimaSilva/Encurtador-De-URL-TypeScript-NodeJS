import { config } from '../config/Constants';
import mongoose from 'mongoose';
export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(config.MONGO_CONECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Banco Conectado');
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  }
}
