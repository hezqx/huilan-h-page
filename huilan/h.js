/**
 * 中科汇联 首页交互脚本
 * 遵循规范：模块化开发、事件委托、优先使用jQuery
 */
$(document).ready(function() {
    // 定义页面核心模块
    const huilanApp = {
        // 初始化方法
        init: function() {
            this.bindEvents();
            this.initAnimations();
        },
        
        // 事件绑定：采用事件委托机制
        bindEvents: function() {
            const $servicesList = $('.services__list');
            
            // 业务卡片点击事件
            $servicesList.on('click', '.service-card', function() {
                const cardTitle = $(this).find('.service-card__title').text();
                console.log('用户查看了核心业务: ' + cardTitle);
                
                // 简单的点击反馈动画
                $(this).fadeOut(100).fadeIn(100);
            });
            
            // 导航栏交互
            const $nav = $('.header__nav');
            $nav.on('mouseenter', '.header__nav-item', function() {
                $(this).css('opacity', '0.8');
            }).on('mouseleave', '.header__nav-item', function() {
                $(this).css('opacity', '1');
            });
        },
        
        // 初始动画展示
        initAnimations: function() {
            // 页面加载时的渐显效果
            $('.banner__title, .banner__desc').hide().fadeIn(1500);
        },

        // 轮播图交互
        initCarousel: function() {
            let currentIndex = 0;
            const $items = $('.carousel__item');
            const $dots = $('.carousel__dot');
            const totalItems = $items.length;
            let carouselTimer;

            function goToSlide(index) {
                $items.removeClass('active').eq(index).addClass('active');
                $dots.removeClass('active').eq(index).addClass('active');
                currentIndex = index;
            }

            function nextSlide() {
                let nextIndex = (currentIndex + 1) % totalItems;
                goToSlide(nextIndex);
            }

            // 自动轮播
            function startCarousel() {
                carouselTimer = setInterval(nextSlide, 4000);
            }

            function stopCarousel() {
                clearInterval(carouselTimer);
            }

            // 绑定指示器点击事件
            $dots.on('click', function() {
                const index = $(this).index();
                goToSlide(index);
                stopCarousel();
                startCarousel();
            });

            // 鼠标悬停时暂停轮播
            $('.news__carousel').on('mouseenter', stopCarousel).on('mouseleave', startCarousel);

            // 启动轮播
            startCarousel();
        }
    };
    
    // 启动模块
    huilanApp.init();
    huilanApp.initCarousel();
});