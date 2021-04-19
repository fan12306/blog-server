import { Blog } from '../model/blog';
import { BlogDetail } from '../model/blog-detail';
import { BlogComments } from '../model/blog-comments';
import { Forbidden, NotFound } from 'lin-mizar';

class BlogDao {
  async getBlogs () {
    const blogs = await Blog.findAll();
    return blogs;
  }

  async getBlogById (v) {
    const blog = await Blog.findOne({
      where: {
        id: v.get('path.id')
      }
    });
    if (!blog) {
      throw new NotFound();
    }
    return blog;
  }

  async createBlog (v, ctx) {
    const blog = new Blog();
    blog.title = v.get('body.title');
    blog.image = v.get('body.image');
    blog.author = ctx.currentUser.id;
    await blog.save();
    await this._createOrUpdateBlogDetail(v, blog, ctx);
  }

  async updateBlog (v, ctx) {
    const blogId = v.get('body.blogId');
    let currentBlog = await Blog.findOne({
      where: {
        id: blogId
      }
    });
    if (!currentBlog) {
      throw new NotFound();
    }
    if (currentBlog.author !== ctx.currentUser.id) {
      throw new Forbidden();
    }
    currentBlog.title = v.get('body.title');
    currentBlog.image = v.get('body.image');
    await currentBlog.save();
    await this._createOrUpdateBlogDetail(v, currentBlog);
  }

  async deleteBlog (v, ctx) {
    const blogId = v.get('body.blogId');
    let currentBlog = await Blog.findOne({
      where: {
        id: blogId
      }
    });
    if (!currentBlog) {
      throw new NotFound();
    }
    if (currentBlog.author !== ctx.currentUser.id) {
      throw new Forbidden();
    }
    await currentBlog.destroy();
    await this._deleteBlogDetail(blogId)
  }

  async _createOrUpdateBlogDetail (v, blog) {
    let currentBlog = await BlogDetail.findOne({
      where: {
        blog_id: blog.id
      }
    });
    if (!currentBlog) {
      currentBlog = new BlogDetail();
      currentBlog.blog_id = blog.id;
    }
    currentBlog.content = v.get('body.content');
    currentBlog.tags = v.get('body.tags');
    currentBlog.categories = v.get('body.categories');
    currentBlog.publish_status = v.get('body.pageStatus');
    currentBlog.page_status = v.get('body.pageStatus');
    await currentBlog.save();
  }

  async _deleteBlogDetail (blogId) {
    let currentBlog = await BlogDetail.findOne({
      where: {
        blog_id: blogId
      }
    });
    if (!currentBlog) {
      throw new NotFound();
    }
    await currentBlog.destroy();
  }

  async createBlogComment (v, ctx) {
    const blogId = v.get('body.blogId');
    let currentBlog = await Blog.findOne({
      where: {
        id: blogId
      }
    });
    if (!currentBlog) {
      throw new NotFound();
    }
    const comment = new BlogComments();
    comment.user_id = ctx.currentUser.id;
    comment.parent_id = v.get('body.parentId');
    comment.content = v.get('body.content');
    comment.blog_id = v.get('body.blogId');
    comment.is_top = v.get('body.isTop');
    comment.likes = 0;
    await comment.save();
  }

  // TODO 评论功能尚未实现；
  async deleteBlogComment (v, ctx) {
    const comment = await BlogComments.findByPk(v.get('body.id'));
    if (!comment) {
      throw new NotFound();
    }
    await comment.destory();
  }
}

export { BlogDao };