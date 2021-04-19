import { LinValidator, Rule } from 'lin-mizar';

class BlogSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateBlogValidator extends LinValidator {
  constructor () {
    super();
    this.title = new Rule('isNotEmpty', '必须传入博客名称');
    this.image = new Rule('isLength', '图书插图的url长度必须在0~100之间', {
      min: 0,
      max: 100
    });
    // this.tags = new Rule('isLength', '博客标签必须传入数组');
    // this.categories = new Rule('isLength', '博客种类必须传入数组');
    this.publishStatus = new Rule('isInt', '文章状态错误，选择0或1', {
      min: 0,
      max: 1
    });
    this.pageStatus = new Rule('isInt', '文章状态错误，选择0或1', {
      min: 0,
      max: 1
    });
  }
}

class UpdateBlogValidator extends CreateOrUpdateBlogValidator {
  constructor (props) {
    super(props);
    this.blogId = new Rule('isNotEmpty', '必须传入博客id')
  }

}

class CreateOrUpdateBlogCommentValidator extends LinValidator {
  constructor () {
    super();
    this.blogId = new Rule('isNotEmpty', '必须传入博客id');
    this.content = new Rule('isLength', '评论必须在1~100之间', {
      min: 1,
      max: 100
    });
    this.parentId = new Rule('isOptional');
    this.isTop = new Rule('isOptional');
  }
}

class DeleteBlogCommentValidator extends LinValidator {
  constructor () {
    super();
    this.id = new Rule('isNotEmpty', '必须传入评论id');
  }
}

class GetBlogByIdValidator extends LinValidator {
  constructor () {
    super();
    this.blogId = new Rule('isNotEmpty', '必须传入博客id');
  }
}

export { CreateOrUpdateBlogValidator, BlogSearchValidator, CreateOrUpdateBlogCommentValidator, DeleteBlogCommentValidator, GetBlogByIdValidator , UpdateBlogValidator};
