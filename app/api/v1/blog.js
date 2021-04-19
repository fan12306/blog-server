import { disableLoading, LinRouter } from 'lin-mizar';
import { loginRequired } from '../../middleware/jwt';
// import {
//   BookSearchValidator,
//   CreateOrUpdateBookValidator
// } from '../../validator/book';
// import { PositiveIdValidator } from '../../validator/common';
//
// import { getSafeParamId } from '../../lib/util';
// import { BookNotFound } from '../../lib/exception';
import { BlogDao } from '../../dao/blog';
import {
  CreateOrUpdateBlogCommentValidator,
  CreateOrUpdateBlogValidator,
  DeleteBlogCommentValidator,
  GetBlogByIdValidator,
  UpdateBlogValidator
} from '../../validator/blog';

const blogApi = new LinRouter({
  prefix: '/v1/blog',
  module: '博客'
});

// book 的dao 数据库访问层实例
const blogDto = new BlogDao();

// 更新博客
blogApi.linPost(
  'updateBlog',
  '/update',
  blogApi.permission(['更新博客']),
  loginRequired,
  async ctx => {
    const v = await new UpdateBlogValidator().validate(ctx);
    await blogDto.updateBlog(v, ctx);
    ctx.success({
      code: 17
    });
  });

// 删除博客
blogApi.linPost(
  'delete',
  '/delete',
  blogApi.permission(['删除博客']),
  loginRequired,
  async ctx => {
    const v = await new GetBlogByIdValidator().validate(ctx);
    console.log('current', ctx.currentUser);
    // logger(ctx.currentUser'管理员新建了一个用户')
    await blogDto.deleteBlog(v, ctx);
    ctx.success({
      code: 18
    });
  });

// 获取所有博客
blogApi.get('/', async ctx => {
  const blogs = await blogDto.getBlogs();
  ctx.json(blogs);
});

// 创建博客
blogApi.linPost(
  'createBlog',
  '/',
  blogApi.permission(['创建博客']),
  loginRequired,
  async ctx => {
    const v = await new CreateOrUpdateBlogValidator().validate(ctx);
    await blogDto.createBlog(v, ctx);
    ctx.success({
      code: 16
    });
  });

// 根据id获取博客
blogApi.get('/:id', async ctx => {
  const v = await new GetBlogByIdValidator().validate(ctx);
  const blog = await blogDto.getBlogById(v);
  ctx.json(blog);
});

// 创建评论
blogApi.linPost(
  'createComment',
  '/comment/add',
  blogApi.permission(['创建评论']),
  loginRequired,
  async ctx => {
    const v = await new CreateOrUpdateBlogCommentValidator().validate(ctx);
    await blogDto.createBlogComment(v, ctx);
    ctx.success({
      code: 19
    });
  });

// 删除评论
blogApi.linPost(
  'createComment',
  '/comment/delete',
  blogApi.permission(['删除评论']),
  loginRequired,
  async ctx => {
    const v = await new DeleteBlogCommentValidator().validate(ctx);
    await blogDto.deleteBlogComment(v, ctx);
    ctx.success({
      code: 19
    });
  });

module.exports = { blogApi, [disableLoading]: false };
