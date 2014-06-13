var crypto = require('crypto'),
    Post = require('../models/post.js'),
    fs = require('fs'),
	path = require('path');


var fstream = require('fstream'),
    tar = require('tar'),
    zlib = require('zlib');

module.exports = function(app) {

    var getClientIP = function(req){
        var ipAddress;
        var headers = req.headers;
        var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
        forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress;
        }
        return ipAddress;
    };

    app.all('*', function(req, res){
        var ip = getClientIP(req);
        if( ip != '60.247.90.102') {
            //res.render("404");
        }
    });




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

                res.end('<script>alert("发布失败!!!");history.go(-1);</script><a href="/">返回发布文章</a> ');
            }

            res.end('<script>alert("发布成功!!!"); location.assign("/list");</script><a href="/">返回发布文章</a><br /><a href="/create">生成文章</a> ');
        });
    });

    app.get('/upload', function (req, res) {
        res.render('upload', {
            title: '文件上传'
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
                //http://fjc1.pop.baofeng.net/popv5/static/hot_report2/img/

                res.render('show', {
                    title: '文件上传成功',
                    file : '/img/' + fileName,
                    filePath : '/img/' + fileName
                });

            }
        }

    });

    app.get('/img/:name', function (req, res) {
        var name = req.params.name;
        fs.readFile("img/" + name, "binary", function(error, file) {
            if(error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
            } else {
                res.writeHead(200, {"Content-Type": "image/png"});
                res.write(file, "binary");
                res.end();
            }
        });
    });


    app.get('/list', function (req, res) {
        //判断是否是第一页，并把请求的页数转换成 number 类型
        var page = req.query.p ? parseInt(req.query.p) : 1, cate = req.query.category, query = {};
        if( cate !== undefined ){
            query.category = cate;
        }
        //查询并返回第 page 页的 10 篇文章
        Post.getTen(query, page, function (err, posts, total) {
            if (err) {
                posts = [];
            }

            var listConf = {
                title: '火热战报文章列表页',
                posts: posts,
                page: page,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 10 + posts.length) == total
            };

            //if( cate ){
                listConf.cate = cate;
            //}

            res.render('list', listConf);
        });
    });

    app.get('/article', function (req, res) {
        Post.getArticle(req.param('time'), function (err, doc) {
            if (err) {
                return res.redirect('back');
            }

            res.render('article', {
                title: '火热战报文章详情页',
                doc: doc
            });
        });
    });


    app.get('/edit', function (req, res) {
        Post.getArticle(req.param('time'), function (err, doc) {
            if (err) {
                return res.redirect('back');
            }
            res.render('edit', {
               title: '火热战报文章编辑',
                doc: doc
            });
        });
    });

    app.post('/edit', function (req, res) {
        res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

        Post.update(req.body.time, req.body.category, req.body.type, req.body.title, req.body.src, req.body.ovideoSrc, req.body.imgSrc, req.body.info, req.body.content, function (err) {
            var url = '/edit?time=' + req.param('time');
            if (err) {
                return res.end('<script>alert("更新失败!!!");location.assign("' + url + '");</script><a href="/list">返回</a>');
            }

            return res.end('<script>alert("更新成功!!!");location.assign("/list");</script><a href="/list">返回</a> ');
        });
    });


    app.get('/remove', function (req, res) {

        res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

        Post.remove(req.param('time'), function (err) {
            if (err) {
			
                return res.end('<script>alert("删除失败!!!");location.assign("/list");</script><a href="/list">返回</a> ');
            }

            return res.end('<script>alert("删除成功!!!");location.assign("/list");</script><a href="/list">返回</a> ');
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
								rmdir(filename, f);
							}
						});
					});
				} else {
                    f(false);
                }

			});
		}

        rmdir('./data/', function(err){
            if( err ){
                return res.end('<script>alert("操作失败!!!"); history.go(-1);</script><a href="/create">返回</a> ');
            } else {
                return res.end('<script>alert("操作成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
            }

        });

        rmdir('./hot_report2/', function(err){
            if( err ){
                return res.end('<script>alert("操作失败!!!"); history.go(-1);</script><a href="/create">返回</a> ');
            } else {
                return res.end('<script>alert("操作成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
            }

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
                    return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                }
                return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
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
                    return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                }
                return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
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
                            obj.src = "article.html";
                        }

                        if( val.type == '1'){
                            obj.player = true;
                            obj.videoSrc = val.ovideoSrc;
                        }
                        focusConf.push(obj);
                    }

                });

            }

            fs.writeFile('./data/index/focus-conf.js', 'focusConfCallBack(' + JSON.stringify( focusConf.slice(0,6) ) + ')', function (err) {

                if (err) {
                    return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                }
                return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
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
                            obj1.videoSrc = val.ovideoSrc;
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
                            return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                        }
                        return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
                    });
                }else
                if( i % 6 == 0 ) {

                    fs.writeFile('./data/index/news-list-' + newsListPages + '.js', 'newsListCallBack(' + JSON.stringify( newslist.slice(i-6, i) ) + ')', function (err) {

                        if (err) {
                            return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                        }
                        return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');

                    });
                    newsListPages--;
                    if( i < len && i + 6 > len ){
                        fs.writeFile('./data/index/news-list-' + newsListPages + '.js', 'newsListCallBack(' + JSON.stringify( newslist.slice(i) ) + ')', function (err) {

                            if (err) {
                                return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                            }
                            return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
                        });
                        break;
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
                            return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                        }
                        return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
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
                                obj.videoSrc = val.ovideoSrc;
								obj.src = val.src;
                            }

                            newslist.push(obj);

                    });

                    var newsListPages = Math.ceil( newslist.length / 6 );

                    for(var i = 1, len = newslist.length; i <= len; i++){
                        if( len < 6 ) {
                            fs.writeFile('./data/list/' + newslistConf[index].type + '/news-list-' + newsListPages + '.js', 'newsListsCallBack(' + JSON.stringify(newslist) + ')', function (err) {


                                if (err) {
                                    return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                                }
                                return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
                            });
                        }else
                        if( i % 6 == 0 ) {
                            fs.writeFile('./data/list/' + newslistConf[index].type + '/news-list-' + newsListPages + '.js', 'newsListsCallBack(' + JSON.stringify( newslist.slice(i-6, i) ) + ')', function (err) {

                                if (err) {
                                    return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                                }
                                return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
                            });
                            newsListPages--;
                            if( i < len && i + 6 > len ){
                                fs.writeFile('./data/list/' + newslistConf[index].type + '/news-list-' + newsListPages + '.js', 'newsListsCallBack(' + JSON.stringify( newslist.slice(i) ) + ')', function (err) {

                                    if (err) {
                                        return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                                    }
                                    return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
                                });
                                break;
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
                if( +v.category > 0 && v.type == 0) {
                    var obj = {};
                    obj.title = v.title;
                    obj.content = v.content;

                    fs.writeFile('./data/article/' + v.time + '.js', 'articleCallBack(' + JSON.stringify( obj ) + ')', function (err) {

                        if (err) {
                            return res.end('<script>alert("生成失败!!!");history.go(-1);</script><a href="/create">返回</a> ');
                        }
                        return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
                    });
                }
            });
			return res.end('<script>alert("生成成功!!!");history.go(-1);</script><a href="/create">返回</a> ');
			
        });
    });

    app.get('/targz', function (req, res) {

        res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

        fstream
            .Reader("./data")
            .pipe(fstream.Writer("./hot_report2/data"));

        fstream
            .Reader("./img")
            .pipe(fstream.Writer("./hot_report2/img"));

        fstream.Reader({ 'path': './hot_report2', 'type': 'Directory' })
            .pipe(tar.Pack())
            .pipe(zlib.Gzip())
            .pipe(fstream.Writer({ 'path': 'data.tar.gz' }));

        return res.end('<script>alert("操作成功!!!");history.go(-1);</script><a href="/create">返回</a> ');

    });

    app.get('/download', function (req, res) {

        res.set({
            'Content-Type': 'text/html; charset=UTF-8'
        });

        res.download( './data.tar.gz', 'data.tar.gz', function(err){
            if( err ){
                return res.end('<script>alert("先打包数据，再进行下载数据!!");history.go(-1);</script><a href="/create">返回</a>')
            } else {
                fs.unlink('./data.tar.gz');
            }
        } );

    });

};



