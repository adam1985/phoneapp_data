var crypto = require('crypto'),
    Post = require('../models/post.js'),
    fs = require('fs'),
	rd = require('rd'),
	path = require('path');
module.exports = function(app) {

    app.get('/', function (req, res) {
        res.render('index', { title: '火热战报文章发布系统' });
    });

    app.post('/', function (req, res) {

        post = new Post(req.body.category, req.body.type, req.body.title, req.body.src, req.body.ovideoSrc, req.body.imgSrc, req.body.info, req.body.content);
        post.save(function (err) {
            res.set({
                'Content-Type': 'text/html; charset=UTF-8'
            });
            if (err) {

                res.end('<script>alert("发布失败!!!");</script><a href="/">返回发布文章</a> ');
            }

            res.end('<script>alert("发布成功!!!");</script><a href="/">返回发布文章</a><br /><a href="/create">生成文章</a> ');
        });
    });

    app.get('/upload', function (req, res) {
        res.render('upload', {
            title: '文件上传',
            uploadFile : ''
        });
    });

    app.post('/upload', function (req, res) {
        for (var i in req.files) {
            if (req.files[i].size == 0){
                // 使用同步方式删除一个文件
                fs.unlinkSync(req.files[i].path);
                res.redirect('/upload');
            } else {
                var fileName =  (+new Date) + req.files[i].name, target_path = './img/' + fileName;
                // 使用同步方式重命名一个文件
                fs.renameSync(req.files[i].path, target_path);
                res.render('upload', {
                    title: '文件上传',
                    uploadFile : 'http://fjc1.pop.baofeng.net/popv5/static/hot_report2/img/'+ fileName
                });

            }
        }



    });


    app.get('/list', function (req, res) {
        //判断是否是第一页，并把请求的页数转换成 number 类型
        var page = req.query.p ? parseInt(req.query.p) : 1;
        //查询并返回第 page 页的 10 篇文章
        Post.getTen(null, page, function (err, posts, total) {
            if (err) {
                posts = [];
            }

            res.render('list', {
                title: '主页',
                posts: posts,
                page: page,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 10 + posts.length) == total
            });
        });
    });

    app.get('/remove', function (req, res) {

        res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

        Post.remove(req.param('time'), function (err) {
            if (err) {
			
                return res.end('<script>alert("删除失败!!!");</script><a href="/list">返回</a> ');
            }

            return res.end('<script>alert("删除成功!!!");</script><a href="/list">返回</a> ');
        });
    });

    app.get('/create', function (req, res) {
        res.render('create', { title: '文章生成' });
    });
	
	app.get('/removefile', function (req, res) {
	
		res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

		function rmdir (dirname, f) {
			var count = 0;
			fs.readdir(dirname, function(err, basenames) {
				count = basenames.length;
				if (count > 0) {
					basenames.forEach(function (basename) {  
						var filename = path.join(dirname, basename);
						fs.stat(filename, function (err, stats) {
							if (err) { throw err; }

							if (stats.isFile()) {
								fs.unlink(filename, f);
							} else if (stats.isDirectory()) {
								rmdir(filename);
							}
						});
					});
				} else {
					return res.end('<script>alert("操作失败!!!");</script><a href="/create">返回</a> ');
				}
			});
		}
		

		
		
		// 异步遍历目录下的所有文件
		rd.each('./data', function (f, s, next) {
		  // 每找到一个文件都会调用一次此函数
		  // 参数s是通过 fs.stat() 获取到的文件属性值
		  console.log('file: %s', f);
		  // 必须调用next()才能继续
		  next();
		  
		  fs.unlink(f, function(err){
			if(err){
				return res.end('<script>alert("操作失败!!!");</script><a href="/create">返回</a> ');
			}else {
				return res.end('<script>alert("操作成功!!!");</script><a href="/create">返回</a> ');
			}
			
		  });
		}, function (err) {
		  if (err) throw err;
		  // 完成
		});
		
	

	});

    app.get('/createIndex', function (req, res) {

        res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

        Post.getAll(null, null, function(err, doc ){
            var indexConf = {
                "title": "火热战报",
                "bannerSource": "banner-conf.js",
                "focusSource": "focus-conf.js",
                "newsSource": "news-list-",
                "latestPage": 4
            },
            bannerConf = [],
            focusConf = [],
            newslist = [],

            totals = doc.filter(function(val){
                return +val.category > 1
            }).length,

            listSize = 6,
            pages = Math.ceil(totals / 6);
            indexConf.latestPage = pages;

            fs.writeFile('./data/index/index-conf.js', 'indexConfCallBack(' + JSON.stringify( indexConf ) + ')', function (err) {

                if (err) {
                    return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                }
                return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
            });

            if( doc ){
                doc.forEach(function(val ,index){
                    if( val.category == '0'){
                        bannerConf.push({
                            title : val.title,
                            src : val.src
                        });
                    }

                });

            }

            fs.writeFile('./data/index/banner-conf.js', 'bannerConfCallBack(' + JSON.stringify( bannerConf.slice(0, 5) ) + ')', function (err) {

                if (err) {
                    return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                }
                return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
            });


            if( doc ){
                doc.forEach(function(val ,index){
                    if( val.category == '1'){
                        var obj = {
                            title : val.title,
                            src : val.src,
                            imgSrc : val.imgSrc
                        };

                        if( val.type == '0'){
                            obj.aid = val.time;
                        }

                        if( val.type == '1'){
                            obj.player = true;
                            obj.videoSrc = val.videoSrc;
                        }
                        focusConf.push(obj);
                    }

                });

            }

            fs.writeFile('./data/index/focus-conf.js', 'focusConfCallBack(' + JSON.stringify( focusConf.slice(0,6) ) + ')', function (err) {

                if (err) {
                    return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                }
                return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
            });


            var newslistConf = [
                    {
                        "title": "最新赛况",
                        "type": "latest-news"
                    },
                    {
                        "title": "精彩进球",
                        "type": "wonderful-goal"
                    },
                    {
                        "title": "足球花边",
                        "type": "lace-news"
                    }
                ];

            if( doc ){
			
                
                doc.forEach(function(val ,index){
                    var category = Number( val.category );
                    if( category > 1 ){
					
						var lists = [];

                        var obj = {
							title : newslistConf[category - 2].title,
							type : newslistConf[category - 2].type
						};
                        obj.src = "list.html";


                        var obj1 = {
                            title : val.title,
                            imgSrc : val.imgSrc,
                            info : val.info
                        };

                        if( val.type == '0'){
                            obj1.aid = val.time;
							obj1.src = "article.html";
                        }

                        if( val.type == '1'){
                            obj1.player = true;
                            obj1.videoSrc = val.videoSrc;
							obj1.src = val.src;
                        }


                        lists.push( obj1 );

                        obj.list = lists;


                        newslist.push(obj);
                    }

                });

            }

            var newsListPages = Math.ceil( newslist.length / 6 );

            for(var i = 1, len = newslist.length; i <= len; i++){
                if( len < 6 ) {
                    fs.writeFile('./data/index/news-list-' + newsListPages + '.js', 'newsListCallBack(' + JSON.stringify(newslist) + ')', function (err) {


                        if (err) {
                            return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                        }
                        return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
                    });
                }else
                if( i % 6 == 0 ) {
                    fs.writeFile('./data/index/news-list-' + newsListPages + '.js', 'newsListCallBack(' + JSON.stringify( newslist.slice(i-6, 6) ) + ')', function (err) {

                        if (err) {
                            return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                        }
                        return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
                    });
                    newsListPages--;
                    if( i + 6 > len ){
                        fs.writeFile('./data/index/news-list-' + newsListPages + '.js', 'newsListCallBack(' + JSON.stringify( newslist.slice(i) ) + ')', function (err) {

                            if (err) {
                                return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                            }
                            return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
                        });
                    }

                }
            }

        });


    });

    app.get('/createList', function (req, res) {
        res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

        Post.getAll(null, null, function(err, doc ){
            var newslistConf = [
                {
                    "title": "最新赛况",
                    "type": "latest-news"
                },
                {
                    "title": "精彩进球",
                    "type": "wonderful-goal"
                },
                {
                    "title": "足球花边",
                    "type": "lace-news"
                }
            ];

            if( doc ) {

                var list1 = doc.filter(function(v){
                    return v.category == 2
                });


                var list2 = doc.filter(function(v){
                    return v.category == 3
                });

                var list3= doc.filter(function(v){
                    return v.category == 4
                });

                var createListPage = function(arr, index){
                        var list1Conf = {
                            "title": newslistConf[index].title,
                            "newsSource": "news-list-"
                        },
                        totals = arr.length,
                        listSize = 6,
                        pages = Math.ceil(totals / 6);
                        list1Conf.latestPage = pages;

                    fs.writeFile('./data/list/' + newslistConf[index].type + '/list-conf.js', 'listConfCallBack(' + JSON.stringify( list1Conf ) + ')', function (err) {

                        if (err) {
                            return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                        }
                        return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
                    });

                    var newslist = [];


                    arr.forEach(function(val ,index){

                            var obj = {
                                title : val.title,
                                imgSrc : val.imgSrc,
                                info : val.info
                            };

                            if( val.type == '0'){
                                obj.aid = val.time;
								obj.src = "article.html";
                            }

                            if( val.type == '1'){
                                obj.player = true;
                                obj.videoSrc = val.videoSrc;
								obj.src = val.src;
                            }

                            newslist.push(obj);

                    });

                    var newsListPages = Math.ceil( newslist.length / 6 );

                    for(var i = 1, len = newslist.length; i <= len; i++){
                        if( len < 6 ) {
                            fs.writeFile('./data/list/' + newslistConf[index].type + '/news-list-' + newsListPages + '.js', 'newsListsCallBack(' + JSON.stringify(newslist) + ')', function (err) {


                                if (err) {
                                    return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                                }
                                return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
                            });
                        }else
                        if( i % 6 == 0 ) {
                            fs.writeFile('./data/list/' + newslistConf[index].type + '/news-list-' + newsListPages + '.js', 'newsListsCallBack(' + JSON.stringify( newslist.slice(i-6, 6) ) + ')', function (err) {

                                if (err) {
                                    return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                                }
                                return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
                            });
                            newsListPages--;
                            if( i + 6 > len ){
                                fs.writeFile('./data/list/' + newslistConf[index].type + '/news-list-' + newsListPages + '.js', 'newsListsCallBack(' + JSON.stringify( newslist.slice(i) ) + ')', function (err) {

                                    if (err) {
                                        return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                                    }
                                    return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
                                });
                            }

                        }
                    }

                };

                createListPage(list1, 0);
                createListPage(list2, 1);
                createListPage(list3, 2);

            }
        });

    });

    app.get('/createArticle', function (req, res) {
        res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

        Post.getAll(null, null, function(err, doc ){
            doc.forEach(function(v){
                if( +v.category > 0 ) {
                    var obj = {};
                    obj.title = v.title;
                    obj.content = v.content;

                    fs.writeFile('./data/article/' + v.time + '.js', 'articleCallBack(' + JSON.stringify( obj ) + ')', function (err) {

                        if (err) {
                            return res.end('<script>alert("生成失败!!!");</script><a href="/create">返回</a> ');
                        }
                        return res.end('<script>alert("生成成功!!!");</script><a href="/create">返回</a> ');
                    });
                }
            });
			return res.end('<script>alert("没有文章生成!!!");</script><a href="/create">返回</a> ');
			
        });
    });

};