const defaults = {
  development: {
    dalleUrl: 'http://localhost:8080/api/v1/dalle',
    triposgBaseUrl: 'https://e8f3505040ef.ngrok-free.app/',
  },
  production: {
    dalleUrl: 'https://devswag.onrender.com/api/v1/dalle',
    triposgBaseUrl: 'https://e8f3505040ef.ngrok-free.app/',
  },
};

const mode = import.meta.env.MODE === 'production' ? 'production' : 'development';

const config = {
  dalleUrl: import.meta.env.VITE_DALLE_URL ?? defaults[mode].dalleUrl,
  triposgBaseUrl: import.meta.env.VITE_TRIPOSG_BACKEND ?? defaults[mode].triposgBaseUrl,
};

config.imageTo3dEndpoint = `${config.triposgBaseUrl.replace(/\/$/, '')}/image_upload`;
config.scribbleUploadEndpoint = `${config.triposgBaseUrl.replace(/\/$/, '')}/upload`;
config.bookingEndpoint =
  import.meta.env.VITE_BOOKING_API_URL ?? "http://localhost:4000/api/book-demo";

export default config;
