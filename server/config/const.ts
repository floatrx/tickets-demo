import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const IS_PROD = process.env.NODE_ENV === 'production';
