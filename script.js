const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(function (eachLink) {
    eachLink.addEventListener('click', smoothScroll);
});

function smoothScroll(event) {
    event.preventDefault();
    const targetID = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetID);
    const originalTop = targetSection.getBoundingClientRect().top.toFixed() - 200;
    console.log(originalTop);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
}

window.addEventListener('load', function () {
    const posts = document.querySelectorAll('section');
    let postTops = [];
    let pageTop;
    let counter = 1;
    let preCounter = 1;
    let doneResizing;

    resetPagePosition();
    //console.log(postTops);

    window.addEventListener('scroll', function () {
        pageTop = window.pageYOffset + 250;
        //console.log(pageTop);
        if (pageTop > postTops[counter]) {
            counter++;
            //console.log(`scroll down ${counter}`);
        } else if (counter > 1 && pageTop < postTops[counter - 1]) {
            counter--;
           // console.log(`scroll up ${counter}`);
        }

        if (counter != preCounter) {
            navLinks.forEach(function (eachlink) {
                eachlink.removeAttribute('class');
            });

            const thislink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
            thislink.className = 'selected';
            preCounter = counter;
        }

        window.addEventListener('resize', function () {
            clearTimeout(doneResizing);
            doneResizing = setTimeout(function () {
                resetPagePosition();
            }, 500);
        });
    });

    function resetPagePosition() {
        postTops = [];

        posts.forEach(function (eachLink) {
            postTops.push(Math.floor(eachLink.getBoundingClientRect().top + window.pageYOffset));
        });

        const pagePosition = window.pageYOffset + 250;
        counter = 0;

        postTops.forEach(function (post) {
            if (pagePosition > post) {
                counter++;
            }
        });

        navLinks.forEach(function (eachlink) {
            eachlink.removeAttribute('class');
        });

        const thislink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
        thislink.className = 'selected';
    }
});
