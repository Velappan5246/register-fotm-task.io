$(document).ready(function() {

    var baseUrl = window.location.origin;
    var filestore = "";

    // ========== Login event ============
    // ===================================
    $('#login-btn').on('click',function(e){
        e.preventDefault();
        let error = 0;

        error += validation();
        
        if(error == 0) {
            
            let email = $('.email').val();
            let password = $('.password').val();
             
            let checkUser = localStorage.getItem('users');

            let isAuth = false;

            $.each(JSON.parse(checkUser),function(ind,val){
               if (val.email == email && val.password == password) {
                    isAuth = true;
                    return false;

               }
            })
            
            if(isAuth === true) {
                window.location.href = baseUrl + '/home.html'
            } else { toastr.error('Invalid Credential') }
        }

    })


    // ========== Register event ============
    // ======================================
    $('#register').on('click',function(e){
        e.preventDefault();
        let error = 0;

        error += validation();

        if (error == 0) {
            let form_data = {
                'user_name' : $('.user_name').val(),
                'email' : $('.email').val(),
                'contant_no' : $('.contant_no').val(),
                'dob' : $('.dob').val(),
                'password' : $('.password').val(),
                'profile_img' : filestore,
            }

            let emailSend = {
                'user_name' : $('.user_name').val(),
                'email' : $('.email').val(),
            }
            
            let users = localStorage.getItem("users");
            
            if (users === null) {
            
                localStorage.setItem("users", JSON.stringify([form_data]));
                sendEmail (emailSend) ;
                resetForm();
                $('.display-file').addClass('d-none');
              
            }else {
                let updateUser = JSON.parse(users);
                
                updateUser.push(form_data)
                localStorage.setItem("users", JSON.stringify(updateUser));
                sendEmail (emailSend) ;
                resetForm();
                $('.display-file').addClass('d-none');
            }
        }
    })


    $('.select-file').on('click',function(e){
        e.preventDefault();
        $('.template_image').trigger('click');
    })

    function readFile(file){
        let document = file.type
        var filename = file.name;
        let size = file.size / 1024;
        let sizeInKb = Math.round(size);

        if(document == 'image/jpeg' || document == 'image/png' || document == 'image/jpg'){
            const reader = new FileReader();
            reader.onload = function(){
                filestore = reader.result;
            };
            reader.readAsText(file);
            $('.file-details .file-name').html(filename);
            $('.file-details .file-size').html(sizeInKb+' KB');
            $('.display-file').removeClass('d-none')

        }else{
            console.log('invalid format');
            $('.file-details').addClass('d-none')
        }
    }

    $('body').on('change','.template_image',function(e){
        e.preventDefault();

        readFile(this.files[0]);
        return  false;
    })



    // send verify email to user 

    function sendEmail (form_data) {
        var data = {
            service_id: 'service_6j587jg',
            template_id: 'template_njyauki',
            user_id: '_4GVDUTSDXDlOnGQL',
            template_params: form_data
        };
         
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function() {
            toastr.success('Registered successfully.Verify message has been send to your mail!');
            setTimeout(() => {
                window.location.href = baseUrl +  '/index.html';
            }, 1500);
        }).fail(function(error) {
            console.log('Oops... ' + JSON.stringify(error));
        });
    }


    // ====== Password validation ===

    function passwordValidation(){
        let error = 0 ;
        let password_rejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    
        $('.passwordValidation').each(function(){
    
            let _self = $(this);
            let required_field = _self.attr('data-required-field');
         
            if(_self.val() == ''){
                _self.removeClass('is-valid').addClass('is-invalid');
                _self.parent().find('.err-mge').text(required_field+' field is required.');
                error = 1;
            } else if(!(password_rejex.test(_self.val()))){
                _self.removeClass('is-valid').addClass('is-invalid');
                _self.parent().find('.err-mge').text(required_field+' is invalid.');
                error = 1;
            }
            else{
                _self.removeClass('is-invalid').addClass('is-valid');
                _self.parent().find('.err-mge').text('');
                error = 0;
            }
        })
    
        return error;
    }

    // ====== Email validation ===

    function Emailvalidation(){
        let error = 0;

        let email_rejex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $('.emailvalidation').each(function(){
            let _self = $(this);
            let required_field = _self.attr('data-required-field');

            if(_self.val() == ''){
                _self.removeClass('is-valid').addClass('is-invalid');
                _self.parent().find('.err-mge').text(required_field+' field is required.');
                error = 1;
            } else if(!(email_rejex.test(_self.val()))){
                _self.removeClass('is-valid').addClass('is-invalid');
                _self.parent().find('.err-mge').text(required_field+' is invalid.');
                error = 1;
            }
            else{
                _self.removeClass('is-invalid').addClass('is-valid');
                _self.parent().find('.err-mge').text('');
                error = 0;
            }
        })

        return error;
    }

    // ====== validation ===


    function validation() {
        let error = 0;
        let email_rejex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let password_rejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        var phone_rejex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        
        $('.validation').each(function(){
            let _self = $(this);
            
            let required_field = _self.attr('data-required-field');

            let type = _self.attr('data-type');
            if(type == 'text') {
                if(_self.val() == ''){
                    _self.addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' field is required.');
                    error++;
                } else{
                    _self.removeClass('is-invalid').addClass('is-valid');
                    _self.parent().find('.err-mge').text('');
                }
            }
            else if(type == 'email') {
                if(_self.val() == ''){
                    _self.removeClass('is-valid').addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' field is required.');
                    error++;
                } else if(!(email_rejex.test(_self.val()))){
                    _self.removeClass('is-valid').addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' is invalid.');
                    error++;
                }
                else{
                    _self.removeClass('is-invalid').addClass('is-valid');
                    _self.parent().find('.err-mge').text('');
                }
            }
            else if(type == 'password') {
                if(_self.val() == ''){
                    _self.removeClass('is-valid').addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' field is required.');
                    error++;
                } else if(!(password_rejex.test(_self.val()))){
                    _self.removeClass('is-valid').addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' is invalid.');
                    error++;
                }
                else{
                    _self.removeClass('is-invalid').addClass('is-valid');
                    _self.parent().find('.err-mge').text('');
                }
            }
            else if (type == 'cpassword') {
                let password = $('.password').val();

                if(_self.val() == ''){
                    _self.removeClass('is-valid').addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' field is required.');
                    error =1;
                } else if(password != _self.val()){
                    _self.removeClass('is-valid').addClass('is-invalid');
                    _self.parent().find('.err-mge').text("The password confirmation does not match");
                    error =1;
                }
                else{
                    _self.removeClass('is-invalid').addClass('is-valid');
                    _self.parent().find('.err-mge').text('');
                }
            }
            else if(type == 'select'){
                if(_self.val() == ''){
                    _self.addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' field is required.');
                    error++;
                } else{
                    _self.removeClass('is-invalid').addClass('is-valid');
                    _self.parent().find('.err-mge').text('');
                }
            }
            else if(type == 'phone') {
                if(_self.val() == ''){
                    _self.removeClass('is-valid').addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' field is required.');
                    error++;
                } else if(!(phone_rejex.test(_self.val()))){
                    _self.removeClass('is-valid').addClass('is-invalid');
                    _self.parent().find('.err-mge').text(required_field+' is invalid.');
                    error++;
                }
                else{
                    _self.removeClass('is-invalid').addClass('is-valid');
                    _self.parent().find('.err-mge').text('');
                }
            }
        })
        return error;
    }

    function resetForm () {
        $('.validation').val('');
        $('.validation').removeClass('is-valid');
    }
})