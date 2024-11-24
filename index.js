import { articles } from "./data.js";
// console.log(articles[0])

let alreadyRendered = 1; //判断加载了几篇文章

const mainEl = document.querySelector('main');
const postFeedEl = document.querySelector('.post-feed');
const hamburgerEl = document.querySelector('.hamburger-menu');

//以下两种方式获取元素都可以，但是要注意’‘内一个有#，一个没有
const viewMoreBtn = document.querySelector('#view-more-btn');
// const viewMoreBtn = document.getElementById('view-more-btn');




//以下我的文章结构template string，问了ChatGPT是合理的，用<a>包裹整个article，这样点击整个article都可以被点击；
//加载文章，点击view more按钮，再加载3篇文章，直到所有文章加载完毕，view more按钮消失
function renderPost(range = 3) {
    const regularPostHtmlStr = articles.slice(alreadyRendered, alreadyRendered + range).map(article =>
        `
                <a href="${article.link}" target="_blank">
                    <article class="regular-post">
                        <div class="post-image-container">
                            <img src="${article.image}">
                        </div>
                        <div class="article-heading-area">
                            <p class="text-small">${article.date}</p>
                            <h4>${article.title}</h4>
                            <p class="secondary-color">
                            ${article.summary}
                            </p>
                        </div>
                    </article>
                </a>
                `
    ).join('')
    alreadyRendered += range;

    render(postFeedEl, regularPostHtmlStr)
}

function renderHeroPost() {
    const heroPostHtml =
        `
         <a href="article.html" target="_blank">
            <article class="hero-post">
                <div class="article-heading-area text-on-reverse">
                    <p class="text-small">${articles[0].date}</p>
                    <h3>${articles[0].title}</h3>
                    <p>${articles[0].summary}</p>
                </div>
            </article>
        </a>
    `
    render(mainEl, heroPostHtml, 'afterbegin')
    const heroPostEl = document.querySelector('.hero-post');
    heroPostEl.style.backgroundImage = `url(${articles[0].image})`
}


function render(htmlEl, htmlStr, position = 'beforeend') {
    htmlEl.insertAdjacentHTML(position, htmlStr);
}




// mainEl.insertAdjacentHTML('afterbegin', heroPostHtml)

renderHeroPost() //加载头部文章
renderPost(6) //初始加载6篇文章

//点击view more按钮，再加载3篇文章
viewMoreBtn.addEventListener('click', function () {
    renderPost()
    if (alreadyRendered >= articles.length) {
        viewMoreBtn.style.display = 'none';
        render(mainEl, `<p class="align-center secondary-color">All articles have been loaded</p>`)
    }
})


//点击hamburger menu，显示nav links. hamburger会消失，不会再显示，这里没有进一步优化了。
hamburgerEl.addEventListener('click', function () {
    const navlinksEl = document.querySelector('.nav-links');
    hamburgerEl.style.display = 'none'


    navlinksEl.classList.toggle('hidden')
    //下面这两行写法也可以
    // navlinksEl.style.display = 'flex'
    // navlinksEl.style.display = navlinksEl.style.display == 'flex' ? 'none' : 'flex';
})
