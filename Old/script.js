const url = "waifu-tags-cn.json";
const loadnums = 2500;
const pageNumber = 0;
let queue;

//默认加载
load(url, loadnums, pageNumber)

//页面改变
function changePage(page) {
    const pageNumber = page.innerText - 1;
    load(url, loadnums, pageNumber)
}

//搜索事件
function search() {
    clearTimeout(queue);
    queue = setTimeout(function () { load(url, loadnums, pageNumber) }, 1000);
}

// 主函数
function load(url, loadnums, pageNumber) {
    readText(url).then((tagsJson) => {
        tagsJson = filter(tagsJson);
        insertPages(tagsJson, loadnums, pageNumber);
        insertTag(tagsJson, loadnums, pageNumber);
        //加载完毕后隐藏加载动画
        document.getElementById("loading").style.display = "none";
    });
}

// 读取json
async function readText(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return (data);
    } catch (error) {
        console.error(error);
    }

}

//搜索过滤
function filter(tagsJson) {
    const keyWords = document.getElementById('search').value.toLowerCase();
    if (keyWords === '') return tagsJson;
    else {
        return tagsJson.filter(tags => tags.cn.toLowerCase().indexOf(keyWords) !== -1 || tags.en.toLowerCase().indexOf(keyWords) !== -1);
    }

}

//插入页码
function insertPages(tagsJson, loadnums, pageNumber) {
    //页码数量
    let pagenums = Math.ceil(tagsJson.length / loadnums);

    const pages = document.getElementsByClassName("pages")[0];
    const temp = document.querySelector("#template-pages")
    const page = temp.content.querySelector(".page");
    const pageactived = temp.content.querySelector(".page-actived");

    //清除页码
    if (pages != "") { pages.innerHTML = ""; }

    //插入页码
    for (let i = 0; i < pagenums; i++) {
        let p = document.importNode(page, true);
        let pa = document.importNode(pageactived, true);
        let num = (i + 1);
        if (num < 10) num = "0" + (i + 1)

        if (pageNumber == i) {
            //插入当前页面按钮
            pa.textContent = num;
            pages.appendChild(pa);
        } else {
            //插入其它页面按钮
            p.textContent = num;
            pages.appendChild(p)
        }

    }

}

//向页面插入tag
function insertTag(tagsJson, loadnums, pageNumber) {
    try {

        const tags = document.getElementsByClassName("tags")[0]
        const tag = document.getElementsByClassName("tag");

        const t = document.querySelector("#template-tags");

        const t_tag = t.content.querySelector(".tag");
        const t_cntag = t.content.querySelector(".cntag");
        const t_entag = t.content.querySelector(".entag");

        //本页第一个tag的编号
        const first = loadnums * pageNumber;
        //本页最后一个tag的编号
        const last = first + loadnums;

        //清除tags
        if (tags != "") { tags.innerHTML = ""; }

        for (let i = first; i < last; i++) {

            //最后一个tag被加载后退出循环
            if (i == tagsJson.length) break;

            let t = document.importNode(t_tag, true);
            let c = document.importNode(t_cntag, true);
            let e = document.importNode(t_entag, true);
            //插入tag按钮
            tags.appendChild(t);
            //插入中文文本
            c.textContent = tagsJson[i].cn;
            tag[i - first].appendChild(c);
            //插入英文文本
            e.textContent = tagsJson[i].en;
            tag[i - first].appendChild(e);
        }

    } catch (err) {
        console.log(err);
    }

}

//复制tag到剪贴板
async function copyTag(tag) {
    const entag = tag.querySelector(".entag").innerText + ", ";
    try {
        await navigator.clipboard.writeText(entag);
        console.log(tag.innerText);
    } catch (err) {
        console.error(err);
    }
}