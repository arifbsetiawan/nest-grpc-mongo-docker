export default () => ({
  APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
  GRPC_URI: process.env.GRPC_URI,
  MONGO_URI: process.env.MONGO_URI
});