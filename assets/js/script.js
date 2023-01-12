$(document).ready(function(){
    $('.menu-bar').on('click',function(){
        let menu_active = $(this).attr('data-active-menu');
        if(menu_active == 'close'){
            $('.sidebar-menu').addClass('active-sidebar-menu');
            $(this).attr('data-active-menu','open');
        } else {
            $('.sidebar-menu').removeClass('active-sidebar-menu');
            $(this).attr('data-active-menu','close');
        }
    })

    if(typeof activeTab != 'undefined') {
        
        $('.sidebar-nav li').removeClass('active');
        $('.'+activeTab + '-nav-link').parent().addClass('active')
    }
})