/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // other configurations...
    async redirects() {
        return [
          {
            source: "/",
            destination: "/signin",
            permanent: true,
          },
        ];
      },

};

export default nextConfig;
