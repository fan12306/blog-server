import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Model, Sequelize } from 'sequelize';
import sequelize from '../lib/db';

class BlogComments extends Model {
  toJSON () {
    const origin = {
      commentId: this.id,
      blogId: this.blog_id,
      content: this.content,
      isTop: this.is_Top,
      likes: this.likes,
      otherComment: []
    };
    return origin;
  }
}

BlogComments.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    parent_id: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    blog_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING,
      defaultValue: '暂无评论'
    },
    is_top: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: '默认不置顶，0：不置顶，1：置顶'
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    other_comments: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      set (val) {
        return this.setDataValue('other_comments', val.join(','));
      },
      get () {
        return this.getDataValue('other_comments').split(',');
      },
      comment: '接下来评论的id列表'
    }
  },
  merge(
    {
      sequelize,
      tableName: 'blog-comment',
      modelName: 'blog-comment'
    },
    InfoCrudMixin.options
  )
);

export { BlogComments };
