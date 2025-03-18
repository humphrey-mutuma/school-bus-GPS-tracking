import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// Define the allowed domains
const allowedDomains = ['http://localhost:3000', process.env.CLIENT_BASE_URL];

// Configure CORS options
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'development') {
      // Assuming Swagger is only accessible during development
      callback(null, true);
    } else if (allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      console.log('origin not allowed!', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable if you're using cookies or HTTP authentication
};
