const data = [
        {
            "source_id": 582,
            "title": "开篇词+学习路线+架构图",
            "article_count": 3,
            "id": "571"
        },
        {
            "source_id": 583,
            "title": "模块一：JavaScript",
            "article_count": 15,
            "id": "572"
        },
        {
            "source_id": 584,
            "title": "模块二：HTML和CSS",
            "article_count": 16,
            "id": "573"
        },
        {
            "source_id": 585,
            "title": "模块三：浏览器实现原理与API",
            "article_count": 9,
            "id": "574"
        },
        {
            "source_id": 586,
            "title": "模块四：前端综合应用",
            "article_count": 5,
            "id": "575"
        },
        {
            "source_id": 587,
            "title": "特别加餐",
            "article_count": 8,
            "id": "576"
        },
        {
            "source_id": 588,
            "title": "尾声",
            "article_count": 1,
            "id": "577"
        }
    ]

    const result = {}

    data.forEach(item => {
        result[item.source_id] = item.title
    })
    console.log(JSON.stringfy(result))
