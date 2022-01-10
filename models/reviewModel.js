module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('review', {
    rating: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    },
  })

  return Product
}
