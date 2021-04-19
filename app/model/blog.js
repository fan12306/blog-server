import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Model, Sequelize } from 'sequelize';
import sequelize from '../lib/db';

class Blog extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      title: this.title,
      keyword: this.keyword,
      publishDate: this.create_time,
      author: this.author,
      image: this.image
    };
    return origin;
  }
}

Blog.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    keyword: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: '关键字'
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    author: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  merge(
    {
      sequelize,
      tableName: 'blog',
      modelName: 'blog'
    },
    InfoCrudMixin.options
  )
);

export { Blog };
