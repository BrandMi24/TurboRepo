/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',  // Agrega esto para tu caso
        port: '',  // Opcional, deja vacío si no usas puerto específico
        pathname: '/images/**',  // Opcional, para restringir solo a /images/
      },
    ],
  },
};

module.exports = nextConfig;