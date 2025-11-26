const mode = import.meta.env.MODE === 'production' ? 'production' : 'development';

const config = {
  dalleUrl: import.meta.env.VITE_DALLE_URL,
  triposgBaseUrl: import.meta.env.VITE_TRIPOSG_BACKEND,
};

config.imageTo3dEndpoint = `${config.triposgBaseUrl.replace(/\/$/, '')}/image_upload`;
config.scribbleUploadEndpoint = `${config.triposgBaseUrl.replace(/\/$/, '')}/upload`;
config.bookingEndpoint =
  import.meta.env.VITE_BOOKING_API_URL ?? 
  (mode === "production" ? "/api/book-demo" : "http://localhost:4000/api/book-demo");

export default config;
