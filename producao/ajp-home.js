(function() {

    try {

        let Home = {
            init: function() {
                Home.buildMainBanners();
                Home.buildMainBannersOld();
                Home.applySlickInShelfs();
                Home.throttleScroll();
                Home.loadImagesByScroll();
                Home.buildPosts();
            },
            buildMainBanners: () => {
                let conditionDesktop = $(window).width() > 991;
                let conditionMobilee = $(window).width() <= 991;
                let wrapperDesktop = $(".ajp-home__mainbanner--wrapper.desktop");
                let wrapperMobilee = $(".ajp-home__mainbanner--wrapper.mobile");
                
                if (conditionDesktop) {
                    let thisContent = wrapperDesktop.find("noscript").text();
                    wrapperDesktop.html(thisContent);

                    if (thisContent.match(/box-banner/g).length == 1) {
                        return;
                    }

                    wrapperDesktop.slick({
                        autoplay: true,
                        autoplaySpeed: 3000,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        dots: true,
                        arrows: false
                    });

                } 
                else if (conditionMobilee) {
                    let thisContent = wrapperMobilee.find("noscript").text();
                    wrapperMobilee.html(thisContent);

                    if (thisContent.match(/box-banner/g).length == 1) {
                        return;
                    }

                    wrapperMobilee.slick({
                        autoplay: true,
                        autoplaySpeed: 3000,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        dots: true,
                        arrows: false
                    });
                }
            },
            buildMainBannersOld: () => {
                let conditionDesktop = $(window).width() > 991;
                let conditionMobilee = $(window).width() <= 991;
                let wrapperDesktop = $(".home-mainbanner-desktop");
                let wrapperMobilee = $(".home-mainbanner-mobile");
                
                if (conditionDesktop) {
                    wrapperDesktop.find(".box-banner").each(function () {
                        let $t = $(this);
                        let thisSrc = $t.find("span[data-src-url]").attr("data-src-url");
                        let img = $(`<img src="${thisSrc}" />`)
                        $t.find("a").html(img);
                    });

                    wrapperDesktop.slick({
                        autoplay: true,
                        autoplaySpeed: 3000,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        dots: true,
                        arrows: false
                    });

                } 
                else if (conditionMobilee) {
                    wrapperMobilee.find(".box-banner").each(function () {
                        let $t = $(this);
                        let thisSrc = $t.find("span[data-src-url]").attr("data-src-url");
                        let img = $(`<img src="${thisSrc}" />`)
                        $t.find("a").html(img);
                    });

                    wrapperMobilee.slick({
                        autoplay: true,
                        autoplaySpeed: 3000,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        dots: true,
                        arrows: false
                    });

                }
            },
            applySlickInShelfs: () => {
                let wrapperShelfOne = $(".home-products.home-products-1");
                wrapperShelfOne.find("h2").prependTo(wrapperShelfOne.find(".main-shelf")); 
                let wrappersShelfs = $(".home-products-1 .main-shelf > ul, .home-products-3 .main-shelf > ul");

                // Vitrines normais 4 produtos
                wrappersShelfs.not(".slick-initialized").slick({
                    autoplay: true,
                    dots: true,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                dots: true
                            }
                        }
                    ]
                });

                // Vitrine de 3 colunas + Banner
                let wrapperShelfWithBanner = $(".home-products-2 .main-shelf > ul").not(".slick-initialized");
                wrapperShelfWithBanner.slick({
                    autoplay: true,
                    dots: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                dots: true
                            }
                        }
                    ]
                });
            },
            throttleScroll: () => {
                let scrolling;
                $(document).on("scroll",function(){
                    scrolling = true;
                });

                // Throttle Scroll
                setInterval(function(){
                    if(scrolling){
                        scrolling = false;

                        $(window).trigger("ajp.home-throttle-scroll");
                    }
                }, 100);
            },
            loadImagesByScroll: () => {
                $(window).on("ajp.home-throttle-scroll", function (e) {
                    e.stopPropagation();
                    if (window.scrollY >= 450) {
                        let wrapperMediumBanners = $(".home-medium-banners");
                        wrapperMediumBanners.find(".box-banner").each(function () {
                            let $t = $(this);
                            if ($t.find("span[data-src-url]").length == 0) {
                                return;
                            }
                            let thisSrc = $t.find("span[data-src-url]").attr("data-src-url");
                            let img = $(`<img src="${thisSrc}" />`);
                            $t.find("a").html(img);
                        });
                    }

                    // Banner no bloco SEO
                    if (window.scrollY >= 2900) {
                        $(".list-seo .loader").hide("fast");
                        $(".list-seo .banner").attr("src", "https://almeidajunior.vteximg.com.br/arquivos/banner-seo.png");
                        $(".list-seo .banner").removeClass("hide");
                    }

                    if ($(".home-medium-banners img").attr("src") != "") {
                        return;
                    }
                });
            },
            buildPosts: () => {
                // Fim Editorial
                const defaultPosts = [
                    {
                        acf: { imagem_mais_vistos: { url: "http://placehold.it/464x648" } },
                        excerpt: {
                        protected: false,
                        rendered:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."
                        },
                        link: "/"
                    },
                    {
                        acf: { imagem_mais_vistos: { url: "http://placehold.it/464x648" } },
                        excerpt: {
                        protected: false,
                        rendered:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."
                        },
                        link: "/"
                    },
                    {
                        acf: { imagem_mais_vistos: { url: "http://placehold.it/464x648" } },
                        excerpt: {
                        protected: false,
                        rendered:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."
                        },
                        link: "/"
                    },
                    {
                        acf: { imagem_mais_vistos: { url: "http://placehold.it/464x648" } },
                        excerpt: {
                        protected: false,
                        rendered:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."
                        },
                        link: "/"
                    },
                    {
                        acf: { imagem_mais_vistos: { url: "http://placehold.it/464x648" } },
                        excerpt: {
                        protected: false,
                        rendered:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."
                        },
                        link: "/"
                    }
                ]

                //Início vc no cj
                const getPosts = () => {
                    $.ajax({
                        type: 'GET',
                        url: 'https://blog.ajplace.com.br/wp-json/wp/v2/posts?disponibilizar_post_vtex=1&per_page=4',
                        responseType: 'application/json',
                        dataType:'json',
                        cache: false,
                        statusCode: {
                            404: function() {
                                mountHooks(defaultPosts)
                            }
                        },
                        success: function(data) {
                            mountHooks(data)
                        },
                        error: function(error) {
                            console.log('error', error)
                            mountHooks(defaultPosts)
                        }
                    });
                }

                const mountHooks = posts => {
                    const html = posts.map(({ acf, excerpt, title, content, link }) => {
                        //const image = (acf.imagem_media);
                        const image = (acf.imagem_vertical);
                        let text = "sem comentário";
                        let titulo = title.rendered;
                        let linkPost = link;
                        if (!excerpt.protected) {
                            text = excerpt.rendered
                        } else if (!content.protected) {
                            text = content.rendered
                        }

                        return `<div class="home-wordpress-item">
                        <div class="ajpost">
                        <a target="_blank" href="${link}"><div class="ajpost__image" style="background-image: url(${image})"></div></a>
                        <h5 class="ajpost__title">${titulo}</h5>
                        <a class="ajpost__details" target="_blank" href="${linkPost}">Ler +</a>
                        </div>
                        </div>`
                    })
                    $(".home-wordpress-content").append(html);
                    $('.home-wordpress-content').removeClass("loading-before")

                    $('.home-wordpress-content').not('.slick-initialized').slick({
                        autoplay: false,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        dots: true,
                        arrows: false,
                        mobileFirst: true,
                        responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                            slidesToScroll: 1,
                            slidesToShow: 4,
                            dots: true,
                            arrows: true
                            }
                        },
                        {
                            breakpoint: 640,
                            settings: {
                            slidesToScroll: 1,
                            slidesToShow: 2
                            }
                        }
                        ]
                    })
                }

                $(".home-wordpress-content").addClass("loading-before")
                let contentObserver = new IntersectionObserver(function (entries, scope) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) { 
                            getPosts()
                            scope.unobserve(entry.target);      
                        }    
                    })
                })

                contentObserver.observe(document.querySelector(".home-wordpress-content"), {rootMargin: '0px 0px 250px 0px',threshold: 0})
            }
        }

        // Instanciando a funcao
        $(document).ready(Home.init)
    
    } catch (e) {
        console.log('Erro na instancia [Home]: ', e);
    }

})();