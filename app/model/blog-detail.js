import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Model, Sequelize } from 'sequelize';
import sequelize from '../lib/db';

class BlogDetail extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      blogId: this.blog_id,
      content: this.content,
      tags: this.tags,
      categories: this.categories,
      publishStatus: this.publish_status,
      pageStatus: this.page_status
    };
    return origin;
  }
}

BlogDetail.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    blog_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING(10000),
      defaultValue: '暂无内容'
    },
    tags: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      set (val) {
        return this.setDataValue('tags', val.join(','));
      },
      get () {
        return this.getDataValue('tags').split(',');
      }
    },
    categories: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      set (val) {
        return this.setDataValue('categories', val.join(','));
      },
      get () {
        return this.getDataValue('categories').split(',');
      }
    },
    publish_status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: '发布：0，草稿：1'
    },
    page_status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: '原创：0，转载：1'
    }
  },
  merge(
    {
      sequelize,
      tableName: 'blog-detail',
      modelName: 'blog-detail'
    },
    InfoCrudMixin.options
  )
);

export { BlogDetail };
