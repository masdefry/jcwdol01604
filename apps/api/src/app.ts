// import express, {
//   json,
//   urlencoded,
//   Express,
//   Request,
//   Response,
//   NextFunction,
//   Router,
// } from 'express';
// import cors from 'cors';
// import { PORT } from './config';
// import { SampleRouter } from './routers/sample.router';

// export default class App {
//   private app: Express;

//   constructor() {
//     this.app = express();
//     this.configure();
//     this.routes();
//     this.handleError();
//   }

//   private configure(): void {
//     this.app.use(cors());
//     this.app.use(json());
//     this.app.use(urlencoded({ extended: true }));
//   }

//   private handleError(): void {
//     // not found
//     this.app.use((req: Request, res: Response, next: NextFunction) => {
//       if (req.path.includes('/api/')) {
//         res.status(404).send('Not found !');
//       } else {
//         next();
//       }
//     });

//     // error
//     this.app.use(
//       (err: Error, req: Request, res: Response, next: NextFunction) => {
//         if (req.path.includes('/api/')) {
//           console.error('Error : ', err.stack);
//           res.status(500).send('Error !');
//         } else {
//           next();
//         }
//       },
//     );
//   }

//   private routes(): void {
//     const sampleRouter = new SampleRouter();

//     this.app.get('/api', (req: Request, res: Response) => {
//       res.send(`Hello, Purwadhika Student API!`);
//     });

//     this.app.use('/api/samples', sampleRouter.getRouter());
//   }

//   public start(): void {
//     this.app.listen(PORT, () => {
//       console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
//     });
//   }
// }

import express, { Request, Response, Application } from 'express';
import authRoutes from './routers/auth.routes';
import ErrorMiddleware from "./middlewares/error.middleware";
import { PORT as port, BASE_WEB_URL } from "./config";
import cors from "cors";

import propertyRoutes from '@/routers/property.routes'
import filterRoutes from "@/routers/search.routes";
import bookRoutes from '@/routers/book.routes';


const PORT = Number(port) || 8000;

const app: Application = express();

app.use(
  cors({
    origin: BASE_WEB_URL || "http://localhost:3000",
    credentials: true,
  })
);


// app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);  
app.use('/property', propertyRoutes);
app.use('/api', filterRoutes);
app.use('/booking', bookRoutes);

app.use(ErrorMiddleware);


app.listen(PORT, () => {
  console.log(`Server jalan di ${PORT}`)
});

export default app;
