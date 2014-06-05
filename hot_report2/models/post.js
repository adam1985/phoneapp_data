var mongodb = require('./db');

function Post(category, type, title, src, ovideoSrc, imgSrc, info, content) {
    this.category = category;
    this.type = type;
    this.title = title;
    this.src = src;
    this.ovideoSrc = ovideoSrc;
    this.imgSrc = imgSrc;
    this.info = info;
    this.content = content;
}

module.exports = Post;

//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展

    //要存入数据库的文档
    var post = {
        category: this.category,
        type: this.type,
        title:this.title,
        src: this.src,
        ovideoSrc: this.ovideoSrc,
        imgSrc: this.imgSrc,
        info: this.info,
        content: this.content,
        time: date.getTime().toString()
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //将文档插入 posts 集合
            collection.insert(post, {
                safe: true
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);//返回 err 为 null
            });
        });
    });
};

//读取文章及其相关信息
Post.getAll = function(key, val, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (val) {
                query[key] = val;
            }
            //根据 query 对象查询文章
            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//失败！返回 err
                    }

                    var fullPath = /http:\/\/[\w\W]+\.\w{3,4}/img;
                    var relativePath = /\/img\/[\w\W]+\.\w{3,4}/img;
                    var rexImg = /(<img[\W\w]+>)/img;
                    var imgPath = 'http://fjc1.pop.baofeng.net/popv5/static/hot_report2';

                    docs.forEach(function(v){
                        if( !fullPath.test(v.imgSrc)) {
                            v.imgSrc = imgPath + v.imgSrc;
                        }

                        v.content = v.content.replace(rexImg, function($){

                            if( !fullPath.test($)) {
                                return $.replace(relativePath, function(s){
                                    return imgPath + s;
                                });
                            }
                        });

                    });

                    callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};

//一次获取十篇文章
Post.getTen = function(query, page, callback) {
    mongodb.close();
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
           query = query || {};

            //使用 count 返回特定查询的文档数 total
            collection.count(query, function (err, total) {
                //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
                collection.find(query, {
                    skip: (page - 1)*10,
                    limit: 10
                }).sort({
                        time: -1
                    }).toArray(function (err, docs) {
                        mongodb.close();
                        if (err) {
                            return callback(err);
                        }
                        callback(null, docs, total);
                    });
            });
        });
    });
};

//获取一篇文章

Post.getArticle = function(time, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                "time": time
            }, function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, doc);
            });
        });
    });
};

//更新一篇文章及其相关信息
Post.update = function(time, category, type, title, src, ovideoSrc, imgSrc, info, content, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //更新文章内容
            collection.update({
                "time": time
            }, {
                $set: {
                    category: category,
                    type: type,
                    title : title,
                    src : src,
                    ovideoSrc : ovideoSrc,
                    imgSrc : imgSrc,
                    info : info,
                    content : content
                }
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//删除一篇文章
Post.remove = function(time, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.remove({
                "time": time
            }, {
                w: 1
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Post.createIndex = function(){

};

Post.createIndex = function(){

};

Post.createIndex = function(){

};

