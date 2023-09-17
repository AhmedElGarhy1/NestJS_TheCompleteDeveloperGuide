module.exports = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: process.env.NODE_ENV === 'test' ? ['**/*.entity.ts'] : ['**/*.entity.js'],
  synchronize: false,
};